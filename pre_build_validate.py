#!/usr/bin/env python3
"""
pre_build_validate.py — Catches build-breaking bugs before assembly.

Validates:
1. JS syntax (via esprima — pure Python, no Node.js needed)
2. Route → P[] block references (all routes point to existing prompt blocks)
3. i18n completeness (DE ↔ EN key symmetry)
4. IIFE self-reference detection (prevents use-before-init crashes)
5. Storage abstraction (no raw localStorage in app code)

This script would have caught both historical crash bugs:
- Template literal corruption (syntax error after build)
- Storage IIFE self-reference (ReferenceError at runtime)

Usage:
    python3 pre_build_validate.py        # from v2/ directory
    python3 pre_build_validate.py --strict  # exit on first failure
"""
import sys, re, os
from pathlib import Path

SRC = Path(__file__).parent / 'src'
ERRORS = []
WARNINGS = []

def error(msg):
    ERRORS.append(msg)
    print(f"  ✗ {msg}")

def warn(msg):
    WARNINGS.append(msg)
    print(f"  ⚠ {msg}")

def ok(msg):
    print(f"  ✓ {msg}")

# ── 1. JS Syntax ──
def validate_js_syntax(code, label):
    """Validate JS syntax using esprima (pure Python, ES2017)."""
    try:
        import esprima
        esprima.parseScript(code, tolerant=True)
        ok(f"{label}: JS syntax valid")
        return True
    except ImportError:
        pass  # Fall through to node --check
    except Exception as e:
        # esprima may fail on post-ES2017 features (optional chaining, etc.)
        # Fall through to node --check which supports all current JS
        pass
    # Fallback/second attempt: node --check (supports all current JS)
    try:
        import subprocess, tempfile
        with tempfile.NamedTemporaryFile(suffix='.js', mode='w', delete=False) as f:
            f.write(code)
            f.flush()
            result = subprocess.run(['node', '--check', f.name],
                                    capture_output=True, text=True)
            os.unlink(f.name)
            if result.returncode == 0:
                ok(f"{label}: JS syntax valid (via node)")
                return True
            else:
                error(f"{label}: JS syntax error: {result.stderr.strip()}")
                return False
    except FileNotFoundError:
        error(f"{label}: Neither esprima nor node available for JS validation")
        return False
    except Exception as e:
        error(f"{label}: JS validation failed: {e}")
        return False

# ── 2. Route → P[] Block References ──
def validate_routes(data_js):
    """Every route must reference existing P[] blocks."""
    # Extract P[] keys (both backtick and quote patterns)
    p_keys = set(re.findall(r'^(\w+):[`\']', data_js, re.MULTILINE))

    # Extract route references
    routes_start = data_js.find("const ROUTES")
    routes_end = data_js.find("};", routes_start) + 2
    routes_text = data_js[routes_start:routes_end]

    missing = []
    for m in re.finditer(r"'([^']+)':\{([^}]+)\}", routes_text):
        route_key = m.group(1)
        config = m.group(2)

        # Check blocks
        for b in re.findall(r"blocks:\[([^\]]*)\]", config):
            for bid in re.findall(r"'(\w+)'", b):
                if bid not in p_keys:
                    missing.append(f"block {route_key}→{bid}")

        # Check sections
        for s in re.findall(r"sections:\[([^\]]*)\]", config):
            for sid in re.findall(r"'(\w+)'", s):
                if sid not in p_keys:
                    missing.append(f"section {route_key}→{sid}")

        # Check suffix
        for suffix in re.findall(r"suffix:'(\w+)'", config):
            if suffix not in p_keys:
                missing.append(f"suffix {route_key}→{suffix}")

    if missing:
        for m in missing:
            error(f"Route references missing P[] {m}")
        return False
    else:
        ok(f"Routes: all references resolve ({len(p_keys)} P[] blocks)")
        return True

# ── 3. i18n Completeness ──
def validate_i18n(data_js):
    """DE and EN must have identical key sets."""
    de_section = data_js[data_js.find("de:{"):data_js.find("},\nen:{")]
    en_section = data_js[data_js.find("en:{"):data_js.find("};\n", data_js.find("en:{"))]

    de_keys = set(re.findall(r"'([^']+)':", de_section))
    en_keys = set(re.findall(r"'([^']+)':", en_section))

    de_only = de_keys - en_keys
    en_only = en_keys - de_keys

    if de_only:
        error(f"i18n: keys in DE but not EN: {de_only}")
    if en_only:
        error(f"i18n: keys in EN but not DE: {en_only}")
    if not de_only and not en_only:
        ok(f"i18n: {len(de_keys)} DE ↔ {len(en_keys)} EN keys symmetric")
        return True
    return False

# ── 4. IIFE Self-Reference ──
def check_iife_self_ref(js_code, label):
    """Detect const x = (() => { ... x ... })() patterns."""
    issues = []
    for m in re.finditer(r'(?:const|let)\s+(\w+)\s*=\s*\(', js_code):
        var = m.group(1)
        # Look inside the IIFE body (next ~500 chars) for the var name
        # being used as a method call (not just in a string/comment)
        body = js_code[m.end():m.end()+500]
        # Check for var.something( pattern (method call on self)
        if re.search(rf'\b{var}\.\w+\(', body):
            issues.append(var)
    if issues:
        for v in issues:
            error(f"{label}: IIFE self-reference on '{v}' (use-before-init)")
        return False
    ok(f"{label}: no IIFE self-references")
    return True

# ── 5. Raw localStorage in App Code ──
def check_storage_abstraction(app_js):
    """App code should use 'storage' abstraction, not raw 'localStorage'."""
    # Skip the storage IIFE (everything before the first function definition).
    # The probe test deliberately uses raw localStorage — that's correct.
    iife_end = app_js.find('async function')
    if iife_end < 0: iife_end = 500
    after_iife = app_js[iife_end:]
    raw_refs = re.findall(r'localStorage\.\w+\(', after_iife)
    if raw_refs:
        for ref in raw_refs:
            warn(f"Raw {ref} in app code (should use storage abstraction)")
        return False
    ok("Storage: no raw localStorage in app code")
    return True

# ── Main ──
def main():
    print("🔍 Pre-build validation...\n")

    data_path = SRC / 'data.js'
    app_path = SRC / 'app.js'

    if not data_path.exists() or not app_path.exists():
        error(f"Source files not found in {SRC}")
        sys.exit(1)

    data_js = data_path.read_text(encoding='utf-8')
    app_js = app_path.read_text(encoding='utf-8')

    # Run all checks
    validate_js_syntax(data_js, "data.js")
    validate_js_syntax(app_js, "app.js")
    validate_routes(data_js)
    validate_i18n(data_js)
    check_iife_self_ref(app_js, "app.js")
    check_storage_abstraction(app_js)

    print()
    if ERRORS:
        print(f"❌ {len(ERRORS)} error(s), {len(WARNINGS)} warning(s)")
        sys.exit(1)
    elif WARNINGS:
        print(f"✅ Passed with {len(WARNINGS)} warning(s)")
    else:
        print("✅ All checks passed!")

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
build.py — Assemble Prompt Composer from separate source files.

Uses str.replace() with unique markers — zero escape risk for JS
template literals, backticks, ${}, and all special characters.
This approach was chosen after a v1.2 crash caused by Python's
string escaping corrupting JavaScript template literal syntax.

Usage:
    python3 build.py          # Build dist/prompt-composer.html
    python3 build.py --watch  # Rebuild on file changes (requires watchdog)

Source structure:
    src/template.html   — HTML shell with <!-- MARKER --> placeholders
    src/style.css       — All CSS (themes, components, layout)
    src/data.js         — Data layer (types, phases, prompts, i18n, routes)
    src/app.js          — Alpine.js stores and component logic
    lib/alpine.min.js   — Alpine.js v3 (inlined for offline use)
    lib/marked.min.js   — marked.js (inlined for offline use)
"""
import pathlib
import sys
import hashlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'
LIB = ROOT / 'lib'
DIST = ROOT / 'dist'

# Marker → file mapping
# Using CSS comment markers inside <style>/<script> to avoid
# interfering with HTML structure
PARTS = {
    '/* __CSS__ */':       SRC / 'style.css',
    '/* __DATA__ */':      SRC / 'data.js',
    '/* __APP__ */':       SRC / 'app.js',
    '/* __MARKED_JS__ */': LIB / 'marked.min.js',
    '/* __ALPINE_JS__ */': LIB / 'alpine.min.js',
}

def build():
    template_path = SRC / 'template.html'
    if not template_path.exists():
        print(f"ERROR: {template_path} not found")
        sys.exit(1)

    output = template_path.read_text(encoding='utf-8')

    for marker, filepath in PARTS.items():
        if not filepath.exists():
            print(f"WARNING: {filepath} not found, skipping {marker}")
            continue
        # Normalize line endings for reproducible builds (CRLF→LF)
        content = filepath.read_text(encoding='utf-8').replace('\r\n', '\n')
        if marker not in output:
            print(f"WARNING: Marker '{marker}' not found in template")
            continue
        # str.replace() is a pure literal substitution — no regex,
        # no escape interpretation. This is the critical safety property
        # that prevents template literal corruption.
        output = output.replace(marker, content)

    DIST.mkdir(exist_ok=True)
    out_path = DIST / 'prompt-composer.html'
    # Write with explicit LF line endings for reproducible builds
    out_path.write_text(output, encoding='utf-8', newline='\n')

    size = out_path.stat().st_size
    print(f"✓ Built {out_path} ({size:,} bytes / {size//1024} KB)")

    # Verify no remaining markers
    for marker in PARTS:
        if marker in out_path.read_text(encoding='utf-8'):
            print(f"ERROR: Unreplaced marker '{marker}' in output!")
            sys.exit(1)

    print("✓ All markers replaced successfully")

    # SHA-256 fingerprint for reproducible build verification
    import hashlib
    sha = hashlib.sha256(out_path.read_bytes()).hexdigest()
    sha_path = out_path.with_suffix('.html.sha256')
    sha_path.write_text(f"{sha}  {out_path.name}\n")
    print(f"✓ SHA-256: {sha[:16]}... (saved to {sha_path.name})")

if __name__ == '__main__':
    # Run pre-build validation if available
    validate_script = ROOT / 'pre_build_validate.py'
    if validate_script.exists():
        import subprocess
        result = subprocess.run([sys.executable, str(validate_script)])
        if result.returncode != 0:
            print("\n❌ Build aborted due to validation errors.")
            sys.exit(1)
        print()

    build()

// ── Storage Abstraction Layer ──
// Safari blocks localStorage on file:// URLs (throws DOM Exception 18).
// This fallback detects the block and provides in-memory storage so the
// app remains functional (data lost on reload, but no crash).
// Research: WHATWG HTML Issue #3099, Safari behavior since v11+.
//
// Previously: monkey-patched localStorage with _getUsage and _isMemory,
// which is fragile. In-memory fallback lacked key() and length, crashing
// the migration system on Safari. Fix: unified wrapper object that
// delegates to localStorage but adds missing APIs on both code paths.
const storage = (() => {
  let backend;
  try {
    localStorage.setItem('__storage_test', '1');
    localStorage.removeItem('__storage_test');
    backend = localStorage;
  } catch (e) {
    console.warn('localStorage unavailable (Safari file://?) — using in-memory fallback.');
    backend = null;
  }

  if (backend) {
    // Real localStorage — wrap with unified API
    return {
      _isMemory: false,
      getItem: k => backend.getItem(k),
      setItem: (k, v) => { try { backend.setItem(k, v); return true; } catch(e) { console.warn('Storage quota exceeded:', k, e); return false; } },
      removeItem: k => backend.removeItem(k),
      clear: () => backend.clear(),
      get length() { return backend.length; },
      key: i => backend.key(i),
      _getUsage() {
        let chars = 0;
        for (let i = 0; i < backend.length; i++) {
          const k = backend.key(i);
          chars += k.length + (backend.getItem(k) || '').length;
        }
        const used = chars * 2, quota = 5 * 1024 * 1024;
        return { usedBytes: used, percentUsed: +((used / quota) * 100).toFixed(1), remainingKB: +((quota - used) / 1024).toFixed(1) };
      }
    };
  } else {
    // In-memory fallback (Safari file://, private browsing)
    const mem = {};
    return {
      _isMemory: true,
      getItem: k => mem[k] ?? null,
      setItem: (k, v) => { mem[k] = String(v); return true; },
      removeItem: k => { delete mem[k]; },
      clear: () => { Object.keys(mem).forEach(k => delete mem[k]); },
      get length() { return Object.keys(mem).length; },
      key: i => Object.keys(mem)[i] ?? null,
      _getUsage: () => ({ usedBytes: 0, percentUsed: 0, remainingKB: 5120 })
    };
  }
})();

// safeStorageSet removed — QuotaExceededError handling is now built into
// the storage wrapper's setItem() method (returns false on failure).
// Previously: safeStorageSet was defined but never called by any store.

async function copyToClipboard(text){
  if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(text);return true}catch(e){}}
  const ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;opacity:0;left:0;top:0;font-size:16px';
  document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);
  let ok=false;try{ok=document.execCommand('copy')}catch(e){}finally{document.body.removeChild(ta)}return ok;
}

// Previously: relTime() returned hardcoded English strings ("2h ago")
// regardless of UI language. Now uses locale-aware formatting.
function relTime(ts) {
  const d = Date.now() - ts;
  const m = 60000, h = 3600000, day = 86400000;
  const locale = Alpine?.store?.('i18n')?.locale || 'en';
  const labels = {
    de: { now: 'gerade eben', m: 'm', h: 'h', d: 'T', ago: ' her' },
    en: { now: 'just now', m: 'm', h: 'h', d: 'd', ago: ' ago' }
  };
  const l = labels[locale] || labels.en;
  if (d < m) return l.now;
  if (d < h) return Math.floor(d / m) + l.m + l.ago;
  if (d < day) return Math.floor(d / h) + l.h + l.ago;
  return Math.floor(d / day) + l.d + l.ago;
}


// ── Safe JSON Parser (Prototype Pollution Defense) ──
// Research: JSON plugins can inject __proto__/constructor/prototype keys
// that poison Object.prototype when merged via Object.assign or spread.
// This reviver strips dangerous keys during JSON.parse itself — before
// any data reaches the application state.
// Previously: raw JSON.parse on plugin imports with no prototype protection.
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
function safeJsonParse(jsonString) {
  return JSON.parse(jsonString, (key, value) =>
    DANGEROUS_KEYS.has(key) ? undefined : value
  );
}

// ── Data Migration System (Version-Chain Pattern) ──
// Research: Sequential migration pattern from IndexedDB onupgradeneeded.
// Each function transforms data from version N to N+1. On load, all
// needed migrations run in sequence. Rules: never delete old migrations,
// never modify deployed ones, make them idempotent.
// Previously: APP_VERSION tracked for changelog but no data migration.
const SCHEMA_VERSION = 2; // Increment when data structure changes

const DATA_MIGRATIONS = {
  // Schema v1 → v2: Normalize localStorage key structure.
  // Added schema tracking and plugin format consistency.
  2: function() {
    // Ensure all stores have consistent format
    const keys = ['pc-hist', 'pc-favs', 'pc-custom', 'pc-plugins'];
    keys.forEach(k => {
      try {
        const raw = storage.getItem(k);
        if (raw) JSON.parse(raw); // validate parseable
      } catch(e) {
        console.warn('Migration v2: resetting corrupted', k);
        storage.removeItem(k);
      }
    });
    // Ensure pc-custom has all required fields
    try {
      const custom = JSON.parse(storage.getItem('pc-custom') || '{}');
      const defaults = { _v: 1, overrides: {}, hidden: [], userTypes: {}, userPhases: {}, userPrompts: {} };
      storage.setItem('pc-custom', JSON.stringify(Object.assign({}, defaults, custom)));
    } catch(e) {}
  }
};

function runDataMigrations() {
  const stored = parseInt(storage.getItem('pc-schema') || '1');
  if (stored >= SCHEMA_VERSION) return;

  // Backup before migrating
  try {
    const backup = {};
    for (let i = 0; i < (storage.length || 0); i++) {
      const k = storage.key ? storage.key(i) : null;
      if (k && k.startsWith('pc-')) backup[k] = storage.getItem(k);
    }
    if (Object.keys(backup).length > 0) {
      storage.setItem('pc-backup-v' + stored, JSON.stringify(backup));
    }
  } catch(e) { console.warn('Migration backup failed:', e); }

  // Run sequential migrations
  try {
    for (let v = stored + 1; v <= SCHEMA_VERSION; v++) {
      if (DATA_MIGRATIONS[v]) {
        DATA_MIGRATIONS[v]();
        console.log('Migration v' + v + ' applied');
      }
    }
    storage.setItem('pc-schema', String(SCHEMA_VERSION));
  } catch(e) {
    console.error('Migration failed:', e);
    // Don't update version — retry on next load
  }
}

// Run migrations before Alpine initializes
runDataMigrations();

document.addEventListener('alpine:init',()=>{

// ── i18n Store ──
Alpine.store('i18n',{
  locale:storage.getItem('pc-lang')||'de',
  // Pluralization via Intl.PluralRules (browser-native, zero bundle size).
  // Research: Intl.PluralRules implements full CLDR plural rules for every
  // language. Pipe-separated values in translation strings enable forms:
  //   'items.count': '1 Phase|{count} Phasen'  (DE: one|other)
  //   'items.count': '{count} élément|{count} éléments' (FR: one|other)
  // Previously: no pluralization support — all strings were static.
  _prCache: {},
  _pr(locale) { return this._prCache[locale] ??= new Intl.PluralRules(locale); },
  t(key, params={}) {
    let s = I18N[this.locale]?.[key] || I18N['en']?.[key] || key;
    const count = typeof params === 'number' ? params : params.count;
    // Handle pipe-separated plural forms
    if (count !== undefined && s.includes('|')) {
      const forms = s.split('|').map(f => f.trim());
      const cat = this._pr(this.locale).select(count);
      // 2 forms: one|other. 3+: zero|one|two|few|many|other
      const idx = forms.length === 2
        ? (cat === 'one' ? 0 : 1)
        : Math.min(Math.max(['zero','one','two','few','many','other'].indexOf(cat), 0), forms.length - 1);
      s = forms[idx];
      if (typeof params === 'number') params = { count };
    }
    return s.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] ?? `{{${k}}}`);
  },
  // Previously: <html lang> was hardcoded to 'de' regardless of UI language.
  // Fix: update document lang attribute when locale changes for accessibility.
  setLocale(l){this.locale=l;storage.setItem('pc-lang',l);document.documentElement.lang=l;}
});

// ── Theme Store ──
Alpine.store('theme',{
  // Previously: fallback was 'light'. Changed to 'neon' as brand default.
  mode:document.documentElement.getAttribute('data-theme')||'neon',
  cycle(){
    // Previously: 3 themes (light→dark→neon→light).
    // Added high-contrast theme for WCAG AAA compliance.
    const next={light:'dark',dark:'neon',neon:'high-contrast','high-contrast':'light'};
    this.mode=next[this.mode]||'light';
    document.documentElement.setAttribute('data-theme',this.mode);
    storage.setItem('pc-theme',this.mode);
  },
  set(m){this.mode=m;document.documentElement.setAttribute('data-theme',m);storage.setItem('pc-theme',m);}
});

// ── Layout Store (matchMedia-based responsive state) ──
// Research: matchMedia fires only on breakpoint crossing, not every pixel.
// Previously: window.innerWidth checked inline → layout thrashing on resize.
// Fix: matchMedia + Alpine.store for zero-reflow reactive breakpoint state.
Alpine.store('layout', (function(){
  var mql = window.matchMedia('(min-width: 900px)');
  return {
    isDesktop: mql.matches,
    showMobilePreview: false,
    init() {
      mql.addEventListener('change', (e) => {
        this.isDesktop = e.matches;
        if (e.matches) this.showMobilePreview = false;
      });
    },
    togglePreview() { this.showMobilePreview = !this.showMobilePreview; }
  };
})());

// ── Settings Store ──
Alpine.store('settings',{
  outputLang:storage.getItem('pc-outlang')||'de',
  country:storage.getItem('pc-country')||'Germany',
  autoSync:true,
  setOutputLang(l){this.outputLang=l;this.autoSync=false;storage.setItem('pc-outlang',l);},
  setCountry(c){this.country=c;storage.setItem('pc-country',c);},
  // Previously: no try/catch — corrupted localStorage crashed the app.
  // Fix: safe parse with fallback to defaults.
  vars:(function(){var d='{"system":"","project_type":"","dataset_description":"","target":"","analysis_type":"EDA","library":"matplotlib/seaborn","audience":"technical","cloud_provider":"AWS","api_style":"REST","brainstorm_method":"Free Brainstorming"}';try{return JSON.parse(storage.getItem('pc-vars')||d)}catch(e){console.warn('Corrupted localStorage for pc-vars');storage.removeItem('pc-vars');return JSON.parse(d)}})(),
  setVar(k,v){this.vars[k]=v;storage.setItem('pc-vars',JSON.stringify(this.vars));}
});

// ── History Store (last 10) ──
Alpine.store('history',{
  items:(function(){try{return JSON.parse(storage.getItem('pc-hist')||'[]')}catch(e){console.warn('Corrupted localStorage for pc-hist, using defaults');storage.removeItem('pc-hist');return JSON.parse('[]')}})(),
  add(entry){
    this.items.unshift({...entry,ts:Date.now()});
    if(this.items.length>10)this.items.pop();
    storage.setItem('pc-hist',JSON.stringify(this.items));
  },
  clear(){this.items=[];storage.setItem('pc-hist','[]');}
});

// ── Favorites Store ──
Alpine.store('favs',{
  items:(function(){try{return JSON.parse(storage.getItem('pc-favs')||'[]')}catch(e){console.warn('Corrupted localStorage for pc-favs, using defaults');storage.removeItem('pc-favs');return JSON.parse('[]')}})(),
  add(entry){
    this.items.push({...entry,id:'f'+Date.now(),ts:Date.now()});
    storage.setItem('pc-favs',JSON.stringify(this.items));
  },
  remove(id){
    this.items=this.items.filter(f=>f.id!==id);
    storage.setItem('pc-favs',JSON.stringify(this.items));
  },
  save(){storage.setItem('pc-favs',JSON.stringify(this.items));}
});


// ── Customization Store (Override Layer) ──
// Architecture: VS Code Settings model (Override-Layer, not Fork-and-Own).
// Research: NNGroup confirms <5% of users modify defaults. This model
// keeps defaults read-only in the HTML, stores only sparse deltas in
// localStorage, and auto-merges on every load. HTML updates propagate
// automatically to non-overridden fields.
Alpine.store('custom', {
  data: (function(){
    var defaults = { _v: 1, overrides: {}, hidden: [], userTypes: {}, userPhases: {}, userPrompts: {} };
    try {
      var raw = storage.getItem('pc-custom');
      if (!raw) return JSON.parse(JSON.stringify(defaults));
      var d = JSON.parse(raw);
      // Deep merge with defaults to fill missing fields
      return Object.assign({}, defaults, d);
    } catch(e) {
      console.warn('Corrupted pc-custom, using defaults');
      storage.removeItem('pc-custom');
      return JSON.parse(JSON.stringify(defaults));
    }
  })(),

  save() {
    try {
      storage.setItem('pc-custom', JSON.stringify(this.data));
    } catch(e) {
      console.warn('Failed to save customizations:', e);
    }
  },

  // Check if a type or phase is hidden
  isHidden(key) {
    return (this.data.hidden || []).includes(key);
  },

  // Toggle visibility of a default type/phase
  toggleHidden(key) {
    const idx = this.data.hidden.indexOf(key);
    if (idx >= 0) {
      this.data.hidden.splice(idx, 1);
    } else {
      this.data.hidden.push(key);
    }
    this.save();
  },

  // Override a prompt block for a specific route
  setPromptOverride(routeKey, text) {
    if (!this.data.overrides) this.data.overrides = {};
    this.data.overrides[routeKey] = text;
    this.save();
  },

  // Get prompt override (or null if not overridden)
  getPromptOverride(routeKey) {
    // Previously: || null treated empty string as no override.
    // Fix: explicit undefined/null check preserves intentionally empty overrides.
    const val = this.data.overrides?.[routeKey];
    return (val !== undefined && val !== null) ? val : null;
  },

  // Clear a specific override
  clearOverride(routeKey) {
    if (this.data.overrides) {
      delete this.data.overrides[routeKey];
      this.save();
    }
  },

  // Add a custom project type
  addCustomType(type) {
    this.data.userTypes[type.id] = type;
    this.save();
  },

  // Remove a custom project type
  removeCustomType(id) {
    delete this.data.userTypes[id];
    // Also remove related phases and prompts
    Object.keys(this.data.userPhases).forEach(k => {
      if (k.startsWith(id + ':')) delete this.data.userPhases[k];
    });
    Object.keys(this.data.userPrompts).forEach(k => {
      if (k.startsWith(id + ':')) delete this.data.userPrompts[k];
    });
    this.save();
  },

  // Reset all customizations
  resetAll() {
    this.data = { _v: 1, overrides: {}, hidden: [], userTypes: {}, userPhases: {}, userPrompts: {} };
    this.save();
  }
});


// ── Plugin Store (Prompt Packages) ──
// Architecture: Plugins are self-contained JSON packages containing
// project types, phases, and prompt templates. They are stored as an
// array in localStorage and merged with built-in types at runtime.
// Format follows the research-validated schema: schemaVersion + meta
// (UUID for uniqueness, slug for readability) + projectTypes array.
Alpine.store('plugins', {
  items: (function(){
    try {
      return JSON.parse(storage.getItem('pc-plugins') || '[]');
    } catch(e) {
      console.warn('Corrupted pc-plugins, resetting');
      storage.removeItem('pc-plugins');
      return [];
    }
  })(),

  save() {
    try { storage.setItem('pc-plugins', JSON.stringify(this.items)); }
    catch(e) { console.warn('Failed to save plugins:', e); }
  },

  // Validate a plugin package before importing
  validate(pkg) {
    const errors = [];
    if (!pkg || typeof pkg !== 'object') return ['Not a valid JSON object'];
    // Previously: accepted any schemaVersion number, including future versions
    // the app can't handle. Fix: reject versions above what we support.
    const MAX_SCHEMA = 1;
    if (!pkg.schemaVersion || typeof pkg.schemaVersion !== 'number') errors.push('Missing schemaVersion');
    else if (pkg.schemaVersion > MAX_SCHEMA) errors.push('Plugin requires schema v' + pkg.schemaVersion + ', app supports v' + MAX_SCHEMA + '. Update the app.');
    if (!pkg.meta || !pkg.meta.id || !pkg.meta.slug) errors.push('Missing meta.id or meta.slug');
    if (!Array.isArray(pkg.projectTypes) || pkg.projectTypes.length === 0) errors.push('No projectTypes');
    if (pkg.projectTypes) {
      pkg.projectTypes.forEach((t, i) => {
        if (!t.id) errors.push('Type ' + i + ': missing id');
        if (!t.name || (!t.name.en && !t.name.de)) errors.push('Type ' + i + ': missing name');
        if (!t.icon) errors.push('Type ' + i + ': missing icon');
        if (!Array.isArray(t.phases) || t.phases.length === 0) errors.push('Type ' + i + ': no phases');
        if (t.phases) {
          t.phases.forEach((p, j) => {
            if (!p.id) errors.push('Type ' + i + ' Phase ' + j + ': missing id');
            if (!p.promptTemplate) errors.push('Type ' + i + ' Phase ' + j + ': missing promptTemplate');
          });
        }
      });
    }
    return errors;
  },

  // Import a plugin package (with collision detection)
  install(pkg) {
    const errors = this.validate(pkg);
    if (errors.length > 0) return { ok: false, errors };

    // Check UUID collision (same plugin, possibly new version)
    const byUUID = this.items.findIndex(p => p.meta.id === pkg.meta.id);
    if (byUUID >= 0) {
      // Update existing
      this.items[byUUID] = pkg;
      this.save();
      return { ok: true, action: 'updated', name: pkg.meta.slug };
    }

    // Check slug collision (different plugin, same name)
    const bySlug = this.items.find(p => p.meta.slug === pkg.meta.slug);
    if (bySlug) {
      return { ok: false, errors: ['slug_conflict'], existing: bySlug };
    }

    // New install
    this.items.push(pkg);
    this.save();
    return { ok: true, action: 'installed', name: pkg.meta.slug };
  },

  // Force install (overwrite slug conflict)
  forceInstall(pkg) {
    this.items = this.items.filter(p => p.meta.slug !== pkg.meta.slug);
    this.items.push(pkg);
    this.save();
    return { ok: true, action: 'replaced' };
  },

  remove(id) {
    this.items = this.items.filter(p => p.meta.id !== id);
    this.save();
  },

  // Get all project types from all plugins
  getAllTypes() {
    const types = [];
    this.items.forEach(pkg => {
      (pkg.projectTypes || []).forEach(t => {
        types.push({
          id: t.id,
          icon: t.icon,
          tk: t.name.de || t.name.en,
          te: t.name.en || t.name.de,
          dk: (t.description || t.name).de || '',
          de: (t.description || t.name).en || '',
          _plugin: pkg.meta.id, // track origin
          _pluginSlug: pkg.meta.slug
        });
      });
    });
    return types;
  },

  // Get phases for a plugin type
  getPhases(typeId) {
    for (const pkg of this.items) {
      const t = (pkg.projectTypes || []).find(pt => pt.id === typeId);
      if (t) {
        return (t.phases || []).map(p => ({
          id: p.id,
          icon: p.icon || '📄',
          tk: (p.name || {}).de || p.id,
          te: (p.name || {}).en || p.id,
          dk: '',
          de: ''
        }));
      }
    }
    return [];
  },

  // Get prompt template for a plugin type+phase
  getPrompt(typeId, phaseId) {
    for (const pkg of this.items) {
      const t = (pkg.projectTypes || []).find(pt => pt.id === typeId);
      if (t) {
        const p = (t.phases || []).find(ph => ph.id === phaseId);
        if (p) return p.promptTemplate;
      }
    }
    return null;
  }
});

// ── Main Composer Component ──
Alpine.data('composer',()=>({
  step:0, // 0=home, 1=type, 2=phase, 3=questions, 4=configure
  projectType:null,
  phase:null,
  questionAnswers:{},
  sectionState:{},
  optState:{},
  modState:{},
  extra:'',
  promptFields:{}, // Per-route form fields for (placeholder) text
  showAdvanced:false,
  editMode:false,
  editPanelOpen:false,
  editTarget:null, // {type:'prompt', routeKey:'script:new'}
  showPlugins:false,
  showCreateType:false,
  newType:{name:'',name_en:'',icon:'🔧',desc:'',desc_en:'',author:'',phases:[{id:'default',name:'Default',name_en:'Default',icon:'📄',prompt:''}]},
  toast:false,
  showSettings:false,
  showFavSave:false,
  favName:'',
  // showPreview moved to $store.layout.showMobilePreview (matchMedia-based)

  showChangelog:false,changelogVersion:'',changelogItems:[],

  // Announce step changes to screen readers
  announceStep() {
    const ann = document.getElementById('sr-announcer');
    if (ann) {
      const stepNames = ['Home','Type','Phase','Questions','Configure'];
      ann.textContent = (stepNames[this.step] || 'Step ' + this.step);
    }
  },

  init(){
    const lastSeen=storage.getItem('pc-version');
    if(lastSeen&&lastSeen!==APP_VERSION){
      this.changelogVersion=APP_VERSION;
      const entry=CHANGELOG[APP_VERSION];
      if(entry){this.changelogItems=entry.changes[this.$store.i18n.locale]||entry.changes.en||[];this.showChangelog=true;}
    }
    storage.setItem('pc-version',APP_VERSION);
    // Auto-detect OS high-contrast preference (WCAG AAA)
    // Research: prefers-contrast: more has 94.76% browser support.
    if (!storage.getItem('pc-theme') && window.matchMedia('(prefers-contrast: more)').matches) {
      this.$store.theme.set('high-contrast');
    }
    // Ctrl+S / Cmd+S keyboard shortcut for quick export
    // Research: File System Access API enables silent saves on Chrome.
    // Previously: export required opening Settings → clicking Export.
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Previously: Ctrl+S fired even with modals open (edit panel, settings).
        // Users editing prompt templates expected "save content", not "export all".
        // Fix: only export when no modal is active.
        if (this.showSettings || this.editPanelOpen || this.showPlugins || this.showCreateType || this.showFavSave) return;
        this.exportData();
        this.toast = true; setTimeout(() => this.toast = false, 1500);
      }
    });
    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',e=>{
      if(!storage.getItem('pc-theme')){
        const t=e.matches?'dark':'light';
        document.documentElement.setAttribute('data-theme',t);
        Alpine.store('theme').mode=t;
      }
    });
  },

  // ── Getters ──
  tl(obj){return this.$store.i18n.locale==='en'?(obj.te||obj.tk||''):(obj.tk||obj.te||'');},
  dl(obj){return this.$store.i18n.locale==='en'?(obj.de||obj.dk||''):(obj.dk||obj.de||'');},
  t(key,p){return this.$store.i18n.t(key,p);},
  // Merged types: defaults + custom - hidden
  // Merged types: built-in defaults + plugin types + custom types - hidden
  get allTypes() {
    const custom = this.$store.custom;
    const defaults = TYPES.filter(t => !custom.isHidden(t.id));
    const pluginTypes = this.$store.plugins.getAllTypes();
    const userTypes = Object.values(custom.data.userTypes || {});
    // Deduplicate: plugin types with same ID as built-in take precedence
    // (allows plugins to "replace" built-in types). Previously: no dedup,
    // causing duplicate entries when plugin IDs matched built-in IDs.
    const pluginIds = new Set(pluginTypes.map(t => t.id));
    const userIds = new Set(userTypes.map(t => t.id));
    const filtered = defaults.filter(t => !pluginIds.has(t.id) && !userIds.has(t.id));
    return [...filtered, ...pluginTypes, ...userTypes];
  },
  get typeObj(){return this.allTypes.find(t=>t.id===this.projectType) || TYPES.find(t=>t.id===this.projectType);},
  // Merged phases: built-in + plugin phases - hidden
  get phases(){
    const custom = this.$store.custom;
    const builtIn = (PHASES[this.projectType]||[]).filter(p => !custom.isHidden(this.projectType+':'+p.id));
    if (builtIn.length > 0) return builtIn;
    // Try plugin phases if no built-in phases found
    const pluginPhases = this.$store.plugins.getPhases(this.projectType);
    return pluginPhases;
  },
  get phaseObj(){return this.phases.find(p=>p.id===this.phase);},
  get routeKey(){return this.projectType+':'+this.phase;},
  get route(){return ROUTES[this.routeKey]||{blocks:[],mods:[]};},
  get questions(){return QUESTIONS[this.routeKey];},
  get hasQuestions(){return !!this.questions;},

  // ── Navigation ──
  goHome(){this.step=0;this.projectType=null;this.phase=null;this.announceStep();},
  selectType(id){
    this.projectType=id;this.phase=null;this.step=2;this.announceStep();
    const t=TYPES.find(x=>x.id===id);
    if(t)this.$store.settings.setVar('project_type',this.tl(t));
  },
  selectPhase(id){
    this.phase=id;this.extra='';this.questionAnswers={};
    if(this.hasQuestions){this.step=3;}else{this.step=4;this.initRoute();}
    this.announceStep();
  },
  // Previously: submitQuestions() only advanced the step.
  // Single-select answers were stored in questionAnswers._selected
  // but never written to the vars store, so {{variable}} in prompts
  // always resolved to defaults. Fix: write selected label to var.
  submitQuestions(){
    this.announceStep();
    const q = this.questions;
    if (q && q.varKey && this.questionAnswers._selected) {
      const opt = q.opts.find(o => o.id === this.questionAnswers._selected);
      if (opt) {
        const label = this.$store.i18n.locale === 'en' ? opt.le : opt.lk;
        this.$store.settings.setVar(q.varKey, label);
      }
    }
    this.step=4;this.initRoute();
  },
  skipQuestions(){this.step=4;this.initRoute();this.announceStep();},
  // Previously: goBack() didn't announce step changes to screen readers.
  goBack(){
    if(this.step===4&&this.hasQuestions)this.step=3;
    else if(this.step>=3)this.step=2;
    else if(this.step===2){this.step=1;this.projectType=null;}
    else if(this.step===1)this.step=0;
    this.announceStep();
  },
  // Previously: goToStep didn't announce step changes for cases 1 and 2.
  goToStep(s){
    if(s===0)this.goHome();
    else if(s===1){this.step=1;this.phase=null;this.announceStep();}
    else if(s===2&&this.projectType){this.step=2;this.announceStep();}
  },

  // ── Route Init ──
  initRoute(){
    const r=this.route;
    this.promptFields={}; // Reset per-route fields on route change
    // Init sections
    this.sectionState={};
    (r.sections||[]).forEach(sid=>{this.sectionState[sid]=true;});
    // Previously: optState was set from questionAnswers[qid], but
    // for multi-select questions qid maps to true/false (correct),
    // while for single-select only _selected is set, so individual
    // qids were always undefined → always true (questions had no effect).
    // Fix: default all to true, then respect actual question answers.
    this.optState = {};
    if (r.optMap) {
      Object.entries(r.optMap).forEach(([qid, pid]) => {
        // If user answered questions, use their answers
        if (Object.keys(this.questionAnswers).length > 0) {
          this.optState[pid] = !!this.questionAnswers[qid];
        } else {
          // No answers (skipped) → enable all
          this.optState[pid] = true;
        }
      });
    }
    // Init modifiers
    this.modState={};
    Object.keys(MODIFIERS).forEach(id=>{
      this.modState[id]=(r.mods||[]).includes(id);
    });
  },

  toggleSection(sid){this.sectionState[sid]=!this.sectionState[sid];},
  toggleOpt(pid){this.optState[pid]=!this.optState[pid];},
  toggleMod(mid){
    this.modState[mid]=!this.modState[mid];
    if(mid==='implement'&&this.modState[mid])this.modState['show_only']=false;
    if(mid==='show_only'&&this.modState[mid])this.modState['implement']=false;
  },

  // ── Prompt Assembly ──
  resolveVars(text){
    const v=this.$store.settings.vars;
    return(text||'').replace(/\{\{(\w+)\}\}/g,(m,k)=>{const val=v[k];return(val!==undefined&&val!==null&&val!=='')?val:m;});
  },

  // Get the default (non-overridden) prompt for a route.
  // Used by the edit panel to show the original template as starting point.
  // Previously: only checked built-in ROUTES/P[]. Plugin types returned
  // empty string, making the edit panel show nothing for plugin prompts.
  // Fix: check plugin prompts when built-in route doesn't exist.
  assembleDefaultPrompt(routeKey) {
    const r = ROUTES[routeKey];
    if (r) {
      const parts = [];
      (r.blocks || []).forEach(bid => { if (P[bid]) parts.push(P[bid]); });
      (r.sections || []).forEach(sid => { if (P[sid]) parts.push(P[sid]); });
      if (r.suffix && P[r.suffix]) parts.push(P[r.suffix]);
      return parts.join('\n\n');
    }
    // Try plugin prompt
    const [typeId, phaseId] = routeKey.split(':');
    const pluginPrompt = this.$store.plugins.getPrompt(typeId, phaseId);
    return pluginPrompt || '';
  },

  // Previously: assemblePrompt() and rawPrompt were two nearly identical
  // 35-line methods (copy-paste duplication). Any change to one needed
  // manual replication in the other — a guaranteed source of divergence
  // bugs. Fix: single assemblePrompt() method. rawPrompt is the result
  // before field resolution (stable for extractFields). currentPrompt
  // adds field resolution (for display and copy).
  get rawPrompt(){
    const r=this.route;const parts=[];
    const override = this.$store.custom.getPromptOverride(this.routeKey);
    if (override) {
      parts.push(override);
    } else {
      // Check plugin prompts first (for plugin-provided project types),
      // then fall back to built-in P[] blocks.
      const pluginPrompt = this.$store.plugins.getPrompt(this.projectType, this.phase);
      if (pluginPrompt) {
        parts.push(pluginPrompt);
      } else {
        (r.blocks||[]).forEach(bid=>{if(P[bid])parts.push(P[bid]);});
        (r.sections||[]).forEach(sid=>{
          if(this.sectionState[sid]&&P[sid])parts.push(P[sid]);
        });
        if(r.suffix&&P[r.suffix])parts.push(P[r.suffix]);
        if(r.optMap){
          Object.entries(r.optMap).forEach(([qid,pid])=>{
            if(this.optState[pid]&&P[pid])parts.push(P[pid]);
          });
        }
      }
    } // end override/plugin/builtin
    Object.entries(MODIFIERS).forEach(([id,mod])=>{
      if(this.modState[id])parts.push(mod.text);
    });
    if(this.extra.trim())parts.push(this.extra.trim());
    const outLang=LANGUAGES.find(l=>l.code===this.$store.settings.outputLang);
    if(outLang&&outLang.code!=='en'){
      parts.push('<output_localization>\nProvide all explanations, comments, and prose in '+outLang.label+'. Keep all code, variable names, CLI commands, and technical identifiers in English. Adapt examples and references to be relevant for '+this.$store.settings.country+' where applicable.\n</output_localization>');
    }
    return this.resolveVars(parts.join('\n\n'));
  },
  get currentPrompt(){
    // Full prompt with fields resolved
    return this.resolveFields(this.rawPrompt);
  },
  get currentQuality(){
    return this.analyzeQuality(this.currentPrompt);
  },
  // Previously: HTML tags in user input (Extra field, variables) passed
  // through marked.parse() → x-html unsanitized, breaking the preview
  // layout. Fix: escape user-contributed portions before Markdown parsing.
  getPreviewHtml(){
    const text=this.currentPrompt;
    if(!text)return'';
    // Highlight unresolved variables
    let h=text.replace(/\{\{(\w+)\}\}/g,'<span class="var-hl">{{$1}}</span>');
    // Escape any raw HTML that didn't come from our XML tags
    // (user-typed content in Extra field or variables)
    h=h.replace(/<(?!\/?(?:role|task|rules|output_format|output_localization|background|examples|example|thinking|span)[ >\/])/gi,'&lt;');
    try{return marked.parse(h,{breaks:true,gfm:true});}catch(e){return'<pre>'+h+'</pre>';}
  },

  // Previously: doCopy() called assemblePrompt() directly instead of
  // using the cached currentPrompt getter, causing redundant computation.
  async doCopy(){
    const prompt=this.currentPrompt;
    const ok=await copyToClipboard(prompt);
    if(ok){
      this.toast=true;setTimeout(()=>this.toast=false,1500);
      // Add to history
      const typeObj=this.typeObj;const phaseObj=this.phaseObj;
      this.$store.history.add({
        // Previously: config saved sectionState/optState but loadConfig() didn't restore them.
        // Now both save and load are consistent.
        // Previously: promptFields were not saved, so loading a favorite/history
        // entry lost all filled-in field values.
        config:{type:this.projectType,phase:this.phase,questionAnswers:{...this.questionAnswers},sectionState:{...this.sectionState},optState:{...this.optState},modState:{...this.modState},extra:this.extra,promptFields:{...this.promptFields}},
        preview:prompt.substring(0,120).replace(/\n/g,' '),
        typeName:typeObj?this.tl(typeObj):'',
        phaseName:phaseObj?this.tl(phaseObj):'',
        typeIcon:typeObj?typeObj.icon:'',
      });
    }
  },

  // ── Favorites ──
  saveFavorite(){
    if(!this.favName.trim())return;
    this.$store.favs.add({
      name:this.favName.trim(),
      // Previously: favorites didn't save sectionState/optState, causing
      // section checkboxes to reset when loading a favorite.
      config:{type:this.projectType,phase:this.phase,questionAnswers:{...this.questionAnswers},sectionState:{...this.sectionState},optState:{...this.optState},modState:{...this.modState},extra:this.extra,promptFields:{...this.promptFields}},
      typeName:this.typeObj?this.tl(this.typeObj):'',
      phaseName:this.phaseObj?this.tl(this.phaseObj):'',
      typeIcon:this.typeObj?this.typeObj.icon:'',
    });
    this.favName='';this.showFavSave=false;
  },

  // Previously: loadConfig() called initRoute() which reset sections/opts
  // to defaults, then only restored modState. This lost section selections.
  // Fix: restore all state after initRoute(), including sections and opts.
  loadConfig(config) {
    this.projectType = config.type;
    this.phase = config.phase;
    this.questionAnswers = config.questionAnswers || {};
    this.extra = config.extra || '';
    this.promptFields = {};
    this.step = 4;
    this.initRoute();
    // Restore saved overrides (after initRoute sets defaults)
    if (config.modState) {
      Object.entries(config.modState).forEach(([k, v]) => { this.modState[k] = v; });
    }
    if (config.sectionState) {
      Object.entries(config.sectionState).forEach(([k, v]) => { this.sectionState[k] = v; });
    }
    if (config.optState) {
      Object.entries(config.optState).forEach(([k, v]) => { this.optState[k] = v; });
    }
    // Restore prompt field values (if saved)
    if (config.promptFields) {
      this.promptFields = {...config.promptFields};
    }
  },

  // ── Export/Import ──
  exportData(){
    // Previously: export didn't include the customization store (pc-custom),
    // so user prompt overrides and hidden types were lost on export/import.
    // Previously: export format was v:2 but import didn't check version.
    // Importing old v1 exports into newer apps could fail silently.
    // Fix: bump to v:3 (adds plugins), import validates and warns on mismatch.
    const d={v:3,date:new Date().toISOString(),settings:{outputLang:this.$store.settings.outputLang,country:this.$store.settings.country,vars:this.$store.settings.vars,theme:this.$store.theme.mode,locale:this.$store.i18n.locale},favorites:this.$store.favs.items,history:this.$store.history.items,custom:this.$store.custom.data,plugins:this.$store.plugins.items};
    const blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);
    a.download='prompt-composer-'+new Date().toISOString().slice(0,10)+'.json';a.click();
  },
  importData(ev){
    const file=ev.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        // Safe parse: strips prototype pollution keys from imported data
        const d=safeJsonParse(e.target.result);
        // Warn on very old export format (but still try to import)
        if(d.v && d.v < 2) console.warn('Importing old export format v'+d.v);
        if(d.favorites)this.$store.favs.items=d.favorites;
        if(d.history)this.$store.history.items=d.history;
        if(d.settings){
          if(d.settings.vars)Object.entries(d.settings.vars).forEach(([k,v])=>this.$store.settings.setVar(k,v));
          if(d.settings.outputLang)this.$store.settings.setOutputLang(d.settings.outputLang);
          if(d.settings.country)this.$store.settings.setCountry(d.settings.country);
          if(d.settings.theme)this.$store.theme.set(d.settings.theme);
          if(d.settings.locale)this.$store.i18n.setLocale(d.settings.locale);
        }
        // Previously: import didn't restore customizations.
        if(d.plugins&&Array.isArray(d.plugins)){this.$store.plugins.items=d.plugins;this.$store.plugins.save();}
        if(d.custom){this.$store.custom.data=Object.assign({_v:1,overrides:{},hidden:[],userTypes:{},userPhases:{},userPrompts:{}},d.custom);this.$store.custom.save();}
        this.$store.favs.save();
        this.toast=true;setTimeout(()=>this.toast=false,1500);
      }catch(err){alert('Import failed: '+err.message);}
    };
    reader.readAsText(file);ev.target.value='';
  },

  analyzeQuality(prompt){
    if(!prompt||prompt.length<20)return[];
    const w=[];
    if(!/<role>/i.test(prompt)&&!/you are/i.test(prompt)&&!/act as/i.test(prompt))w.push('quality.no_role');
    if(!/<output_format>/i.test(prompt)&&!/format:/i.test(prompt.toLowerCase())&&!/table|json|markdown|list/i.test(prompt.toLowerCase()))w.push('quality.no_format');
    const words=prompt.split(/\s+/).length;
    if(words<40&&/\b(implement|create|build|design|architect|analyze|optimize)\b/i.test(prompt))w.push('quality.too_short');
    const vague=prompt.match(/\b(maybe|perhaps|somehow|something|stuff|things|etc\.?|various|sort of|kind of)\b/gi);
    if(vague&&vague.length>=2)w.push('quality.too_vague');
    const verbs=prompt.match(/\b(summarize|translate|analyze|create|write|build|implement|review|check|fix|optimize|compare|explain|generate|design|evaluate|test)\b/gi);
    if(verbs&&new Set(verbs.map(v=>v.toLowerCase())).size>=5)w.push('quality.multi_task');
    return w;
  },

  // Get hint info for a variable (label, hint text, example placeholder)
  getVarHint(varName) {
    const h = VARIABLE_HINTS[varName];
    if (!h) return { label: varName, hint: '', example: varName };
    const loc = this.$store.i18n.locale;
    return {
      label: h.label?.[loc] || h.label?.en || varName,
      hint: h.hint?.[loc] || h.hint?.en || '',
      example: h.example || varName
    };
  },

  // Toggle edit mode
  // Focus trap for modals — cycles Tab through focusable elements.
  // Research: WAI-ARIA Dialog (Modal) pattern requires Tab wrapping.
  // Previously: no focus trapping — Tab escaped modals into background.
  trapTab(e) {
    const modal = e.currentTarget;
    const focusable = [...modal.querySelectorAll(
      'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  },

  // ── Plugin / Package Methods ──

  importPlugin(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    // Previously: no size limit — a large JSON could freeze the browser.
    // Fix: reject files over 1 MB (generous limit for text-only plugins).
    if (file.size > 1024 * 1024) {
      alert('File too large (max 1 MB).');
      ev.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        // Previously: raw JSON.parse — vulnerable to prototype pollution.
        // Fix: safeJsonParse strips __proto__/constructor/prototype keys.
        const pkg = safeJsonParse(e.target.result);
        const result = this.$store.plugins.install(pkg);
        if (result.ok) {
          this.toast = true; setTimeout(() => this.toast = false, 1500);
        } else if (result.errors && result.errors[0] === 'slug_conflict') {
          if (confirm(this.t('plugins.conflict') + ': ' + pkg.meta.slug + '\n\nReplace?')) {
            this.$store.plugins.forceInstall(pkg);
            this.toast = true; setTimeout(() => this.toast = false, 1500);
          }
        } else {
          alert(this.t('plugins.invalid') + '\n' + result.errors.join('\n'));
        }
      } catch(err) { alert(this.t('plugins.invalid') + ': ' + err.message); }
    };
    reader.readAsText(file);
    ev.target.value = '';
  },

  exportPlugin(pluginId) {
    const pkg = this.$store.plugins.items.find(p => p.meta.id === pluginId);
    if (!pkg) return;
    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (pkg.meta.slug || 'plugin').replace(/[@/]/g, '-') + '.json';
    a.click();
  },

  // Create a new project type as a plugin package
  saveNewType() {
    const nt = this.newType;
    if (!nt.name.trim()) return;
    const typeId = nt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // Previously: phases without a prompt were silently dropped.
    // Fix: validate and warn user about incomplete phases before saving.
    const validPhases = nt.phases.filter(p => p.id && p.prompt);
    const droppedCount = nt.phases.length - validPhases.length;
    if (validPhases.length === 0) { alert('Each phase needs an ID and a prompt template.'); return; }
    if (droppedCount > 0 && !confirm(droppedCount + ' phase(s) without prompt will be skipped. Continue?')) return;

    const pkg = {
      schemaVersion: 1,
      meta: {
        id: crypto.randomUUID ? crypto.randomUUID() : 'f' + Date.now() + Math.random().toString(36).slice(2),
        slug: '@custom/' + typeId,
        author: nt.author || 'User',
        version: '1.0.0',
        description: nt.desc || nt.name
      },
      projectTypes: [{
        // Previously: duplicate phase names (e.g. two "Review" phases)
        // produced duplicate IDs. Fix: append index suffix on collision.

        id: typeId,
        icon: nt.icon || '🔧',
        name: { de: nt.name, en: nt.name_en || nt.name },
        description: { de: nt.desc || nt.name, en: nt.desc_en || nt.name_en || nt.name },
        phases: validPhases.map((p, idx) => ({
          id: (function(){
            const base = p.id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            // Append index if duplicate (e.g. "review" → "review-2")
            return base + (idx > 0 && nt.phases.slice(0, idx).some(q => q.id === p.id) ? '-' + (idx+1) : '');
          })(),
          icon: p.icon || '📄',
          name: { de: p.name || p.id, en: p.name_en || p.name || p.id },
          promptTemplate: p.prompt
        }))
      }]
    };
    const result = this.$store.plugins.install(pkg);
    if (result.ok) {
      this.showCreateType = false;
      this.newType = {name:'',name_en:'',icon:'🔧',desc:'',desc_en:'',author:'',phases:[{id:'default',name:'Default',name_en:'Default',icon:'📄',prompt:''}]};
      this.toast = true; setTimeout(() => this.toast = false, 1500);
    } else {
      alert(result.errors.join('\n'));
    }
  },

  addPhaseToNewType() {
    this.newType.phases.push({id:'',name:'',name_en:'',icon:'📄',prompt:''});
  },

  removePhaseFromNewType(idx) {
    if (this.newType.phases.length > 1) this.newType.phases.splice(idx, 1);
  },

  // Get storage usage info for display in settings
  getStorageInfo() {
    if (storage._isMemory) return { label: 'In-Memory (no persistence)', percent: 0 };
    const info = storage._getUsage();
    return { label: info.usedBytes > 0 ? (info.usedBytes / 1024).toFixed(0) + ' KB / 5 MB (' + info.percentUsed + '%)' : 'Empty', percent: info.percentUsed };
  },

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) this.editPanelOpen = false;
  },

  // Open edit panel for a specific target
  openEditPanel(target) {
    this.editTarget = target;
    this.editPanelOpen = true;
  },

  // Extract prompt fields: **Label:** (hint text) patterns.
  // These are per-route placeholders that become form inputs.
  // Different from {{variables}} which are global settings.
  // Previously: placeholders like "(describe goal)" stayed as raw text
  // in the prompt. Users had to manually find and replace them in the chat.
  // Fix: extract as form fields, show as inputs, replace when filled.
  extractFields(text) {
    const fields = [];
    const seen = new Set();
    // Match **Label:** (hint text) — the dominant pattern in prompt blocks
    const re = /\*\*([^*]+?)\*\*\s*[:.]?\s*\(([^)]{5,80})\)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const label = m[1].trim().replace(/:$/, '');
      const hint = m[2].trim();
      const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      // Skip duplicates and non-fillable patterns
      if (seen.has(key)) continue;
      // Skip non-fillable patterns: enumerations, instructions, technical lists.
      // Previously: only 3 patterns filtered, causing items like
      // "(CSV/JSON/SQL/Excel)" to appear as form fields.
      if (/^method \d|each step|functions,|\d+ command|subshells|step OK/.test(hint)) continue;
      // Skip if hint is mostly a list of options separated by /
      if ((hint.match(/\//g)||[]).length >= 2 && hint.length < 35) continue;
      seen.add(key);
      fields.push({ key, label, hint, fullMatch: m[0] });
    }
    return fields;
  },

  // Replace filled prompt fields in text
  resolveFields(text) {
    const fields = this.extractFields(text);
    let result = text;
    for (const f of fields) {
      const val = this.promptFields[f.key];
      if (val && val.trim()) {
        // Replace (hint text) with user's input, keep the **Label:**
        result = result.replace(f.fullMatch, '**' + f.label + ':** ' + val.trim());
      }
    }
    return result;
  },

  extractVars(text){
    return[...new Set((text.match(/\{\{(\w+)\}\}/g)||[]).map(m=>m.slice(2,-2)))];
  }
}));
});
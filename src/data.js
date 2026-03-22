const APP_VERSION = '0.1.0';
const CHANGELOG = {
};

const I18N = {
de:{
'app.title':'Prompt Composer','app.subtitle':'Modulare KI-Prompts',
'common.copy':'Kopieren','common.copied':'Kopiert!','common.save':'Speichern','common.cancel':'Abbrechen','common.close':'Schließen','common.delete':'Löschen','common.back':'Zurück','common.skip':'Überspringen','common.all':'Alle','common.search':'Suchen…','common.export':'Export','common.import':'Import','common.reset':'Zurücksetzen','common.settings':'Einstellungen','common.or':'oder',
'step.type':'Projekttyp','step.phase':'Phase','step.questions':'Details','step.configure':'Konfigurieren',
'step1.title':'Worum geht\'s?','step1.desc':'Wähle den Projekttyp, mit dem du arbeitest.',
'step2.title':'Was möchtest du tun?','step2.desc':'Wähle den passenden Schritt.',
'step3.title':'Kurze Rückfrage','step3.desc':'Hilft, den Prompt zu optimieren.',
'step4.title':'Prompt konfigurieren',
'config.variables':'Variablen','config.sections':'Abschnitte','config.optimize_for':'Wonach optimieren?','config.modifiers':'Modifikatoren','config.extra':'Zusätzliche Anforderungen','config.extra_ph':'Projektspezifische Ergänzungen…',
'preview.title':'Vorschau','preview.empty':'Wähle Projekttyp und Phase — dann siehst du hier den zusammengebauten Prompt.','preview.copy_step':'Schritt kopieren','preview.copy_all':'Alles kopieren',
'favs.title':'Favoriten','favs.empty':'Noch keine Favoriten','favs.save':'Als Favorit speichern','favs.name_ph':'Name für diesen Favoriten…',
'hist.title':'Zuletzt verwendet','hist.empty':'Noch keine Prompts generiert',
'settings.title':'Einstellungen','settings.ui_lang':'Oberflächensprache','settings.out_lang':'KI antwortet auf','settings.country':'Land des Nutzers','settings.theme':'Design','settings.theme_light':'Hell','settings.theme_dark':'Dunkel','settings.theme_neon':'Neon','settings.theme_hc':'♿ Kontrast','settings.variables':'Globale Variablen','settings.data':'Daten','settings.reset_confirm':'Alle Einstellungen und gespeicherten Daten zurücksetzen?',
'output_lang.block':'Provide all explanations, comments, and prose in {{lang}}. Keep all code, variable names, CLI commands, and technical identifiers in English. Adapt examples and references to be relevant for {{country}} where applicable.',
'changelog.title':'Neue Version','changelog.updated':'wurde aktualisiert auf Version',
'quality.title':'Prompt-Qualität','quality.no_role':'Keine Rolle definiert — eine Rollenzuweisung liefert gezielteren Output.','quality.no_format':'Kein Ausgabeformat spezifiziert.','quality.too_short':'Sehr kurzer Prompt für eine komplexe Aufgabe.','quality.too_vague':'Enthält vage Formulierungen.','quality.multi_task':'Enthält mehrere separate Aufgaben.','quality.good':'Prompt sieht gut strukturiert aus.',
'plugins.title':'Prompt-Pakete','plugins.installed':'Installiert','plugins.none':'Keine Pakete installiert.',
'plugins.import':'Paket importieren','plugins.export':'Paket exportieren','plugins.remove':'Entfernen',
'plugins.create':'Neuen Projekttyp erstellen','plugins.name':'Name','plugins.name_en':'Name (EN)',
'plugins.icon':'Icon (Emoji)','plugins.desc':'Beschreibung','plugins.desc_en':'Beschreibung (EN)',
'plugins.author':'Autor','plugins.update':'Aktualisieren','plugins.conflict':'Namenskonflikt',
'plugins.confirm_remove':'Dieses Paket wirklich entfernen?','plugins.imported':'Paket importiert!',
'plugins.invalid':'Ungültiges Paket-Format.','plugins.phases':'Phasen','plugins.add_phase':'Phase hinzufügen',
'plugins.phase_name':'Phasenname','plugins.phase_name_en':'Phasenname (EN)','plugins.phase_icon':'Icon',
'plugins.prompt_template':'Prompt-Vorlage','plugins.save':'Speichern',
'config.fields':'Details ausfüllen','config.show_advanced':'Erweiterte Optionen anzeigen','config.hide_advanced':'Erweiterte Optionen ausblenden',
'home.welcome':'Willkommen','home.quick_start':'Schnellstart: Wähle einen Projekttyp oder nutze einen Favoriten.',
},
en:{
'app.title':'Prompt Composer','app.subtitle':'Modular AI Prompts',
'common.copy':'Copy','common.copied':'Copied!','common.save':'Save','common.cancel':'Cancel','common.close':'Close','common.delete':'Delete','common.back':'Back','common.skip':'Skip','common.all':'All','common.search':'Search…','common.export':'Export','common.import':'Import','common.reset':'Reset','common.settings':'Settings','common.or':'or',
'step.type':'Project Type','step.phase':'Phase','step.questions':'Details','step.configure':'Configure',
'step1.title':'What are you working on?','step1.desc':'Choose the type of project.',
'step2.title':'What do you want to do?','step2.desc':'Choose the right step.',
'step3.title':'Quick question','step3.desc':'Helps optimize the prompt.',
'step4.title':'Configure prompt',
'config.variables':'Variables','config.sections':'Sections','config.optimize_for':'Optimize for?','config.modifiers':'Modifiers','config.extra':'Additional requirements','config.extra_ph':'Project-specific additions…',
'preview.title':'Preview','preview.empty':'Choose a project type and phase to see the assembled prompt here.','preview.copy_step':'Copy step','preview.copy_all':'Copy all',
'favs.title':'Favorites','favs.empty':'No favorites yet','favs.save':'Save as favorite','favs.name_ph':'Name for this favorite…',
'hist.title':'Recently used','hist.empty':'No prompts generated yet',
'settings.title':'Settings','settings.ui_lang':'Interface language','settings.out_lang':'AI responds in','settings.country':'User country','settings.theme':'Theme','settings.theme_light':'Light','settings.theme_dark':'Dark','settings.theme_neon':'Neon','settings.theme_hc':'♿ Kontrast','settings.variables':'Global variables','settings.data':'Data','settings.reset_confirm':'Reset all settings and saved data?',
'output_lang.block':'Provide all explanations, comments, and prose in {{lang}}. Keep all code, variable names, CLI commands, and technical identifiers in English. Adapt examples and references to be relevant for {{country}} where applicable.',
'changelog.title':'New Version','changelog.updated':'has been updated to version',
'quality.title':'Prompt Quality','quality.no_role':'No role defined — a role assignment produces more targeted output.','quality.no_format':'No output format specified.','quality.too_short':'Very short prompt for a complex task.','quality.too_vague':'Contains vague wording.','quality.multi_task':'Contains multiple separate tasks.','quality.good':'Prompt looks well-structured.',
'plugins.title':'Prompt Packages','plugins.installed':'Installed','plugins.none':'No packages installed.',
'plugins.import':'Import Package','plugins.export':'Export Package','plugins.remove':'Remove',
'plugins.create':'Create New Project Type','plugins.name':'Name','plugins.name_en':'Name (EN)',
'plugins.icon':'Icon (Emoji)','plugins.desc':'Description','plugins.desc_en':'Description (EN)',
'plugins.author':'Author','plugins.update':'Update','plugins.conflict':'Name Conflict',
'plugins.confirm_remove':'Really remove this package?','plugins.imported':'Package imported!',
'plugins.invalid':'Invalid package format.','plugins.phases':'Phases','plugins.add_phase':'Add Phase',
'plugins.phase_name':'Phase Name','plugins.phase_name_en':'Phase Name (EN)','plugins.phase_icon':'Icon',
'plugins.prompt_template':'Prompt Template','plugins.save':'Save',
'config.fields':'Fill in details','config.show_advanced':'Show advanced options','config.hide_advanced':'Hide advanced options',
'home.welcome':'Welcome','home.quick_start':'Quick start: Choose a project type or use a favorite.',
}
};

// ── Languages for output ──
const LANGUAGES = [
{code:'de',label:'Deutsch'},{code:'en',label:'English'},{code:'fr',label:'Français'},
{code:'es',label:'Español'},{code:'it',label:'Italiano'},{code:'pt',label:'Português'},
{code:'nl',label:'Nederlands'},{code:'pl',label:'Polski'},{code:'ja',label:'日本語'},
{code:'ko',label:'한국어'},{code:'zh',label:'中文'},{code:'ru',label:'Русский'},
{code:'ar',label:'العربية'},{code:'tr',label:'Türkçe'},{code:'sv',label:'Svenska'},
];

const COUNTRIES = [
'Germany','Austria','Switzerland','United States','United Kingdom','France','Spain','Italy',
'Netherlands','Poland','Japan','South Korea','China','Brazil','Canada','Australia','India',
'Sweden','Norway','Denmark','Belgium','Portugal','Turkey','Russia','Mexico','Argentina',
];


// ── Variable Hints ──
// Research (NNGroup, Baymard Institute, Material Design 3): inline supporting
// text below form fields is the most effective help pattern. Placeholder text
// alone is an anti-pattern (7 documented usability problems per NNGroup).
const VARIABLE_HINTS = {
  system: {
    label: { de: 'Zielsystem', en: 'Target System' },
    hint: { de: 'Betriebssystem, Shell, Paketmanager, Hardware.', en: 'OS, shell, package manager, hardware.' },
    example: 'macOS 15.2, zsh, Homebrew, M2 Pro'
  },
  project_type: {
    label: { de: 'Projekttyp', en: 'Project Type' },
    hint: { de: 'Wird automatisch gesetzt.', en: 'Auto-set from selection.' },
    example: 'Bash Script'
  },
  dataset_description: {
    label: { de: 'Datensatz', en: 'Dataset' },
    hint: { de: 'Name, Spalten, Datentypen, Größe.', en: 'Name, columns, data types, size.' },
    example: 'sales_2024.csv — 50k rows, date/product_id/revenue'
  },
  target: {
    label: { de: 'Zielvariable', en: 'Target Variable' },
    hint: { de: 'Variable für Vorhersage/Analyse.', en: 'Variable to predict or analyze.' },
    example: 'revenue'
  },
  analysis_type: {
    label: { de: 'Analyse-Typ', en: 'Analysis Type' },
    hint: { de: 'Art der Analyse.', en: 'Type of analysis.' },
    example: 'EDA / Regression / Classification'
  },
  library: {
    label: { de: 'Viz-Library', en: 'Viz Library' },
    hint: { de: 'Bibliothek für Charts.', en: 'Library for charts.' },
    example: 'matplotlib/seaborn, plotly, d3.js'
  },
  audience: {
    label: { de: 'Zielgruppe', en: 'Target Audience' },
    hint: { de: 'Für wen? Beeinflusst Detailtiefe.', en: 'For whom? Affects detail level.' },
    example: 'technical / executive / non-technical'
  },
  cloud_provider: {
    label: { de: 'Cloud-Provider', en: 'Cloud Provider' },
    hint: { de: 'Dein Cloud-Anbieter.', en: 'Your cloud provider.' },
    example: 'AWS / GCP / Azure / Hetzner'
  },
  api_style: {
    label: { de: 'API-Stil', en: 'API Style' },
    hint: { de: 'API-Architektur.', en: 'API architecture.' },
    example: 'REST / GraphQL / gRPC'
  },
  brainstorm_method: {
    label: { de: 'Brainstorm-Methode', en: 'Brainstorm Method' },
    hint: { de: 'Kreativtechnik.', en: 'Creative technique.' },
    example: 'Free / SCAMPER / Six Thinking Hats'
  },
};


// ── Field Labels (DE translations for prompt placeholder labels) ──
// Prompt text is English internally. The **Label:** (hint) patterns
// produce English field names. This table provides German translations
// so the UI can show both: "Zielgruppe / Target audience".
const FIELD_LABELS_DE = {
  'Topic':'Thema','Target audience':'Zielgruppe','Purpose':'Zweck',
  'Tone':'Ton / Stil','Length':'Länge','Special requirements':'Besondere Anforderungen',
  'To':'An (Empfänger)','Occasion':'Anlass','Goal':'Ziel',
  'Key points':'Kernpunkte','Context':'Kontext','Received message':'Erhaltene Nachricht',
  'My goal':'Mein Ziel','Format':'Format','Columns':'Spalten','Domain':'Fachgebiet',
  'Tool':'Werkzeug','Requirements':'Anforderungen','Current Setup':'Aktuelle Einrichtung',
  'Problem':'Problem','Constraints':'Einschränkungen','From':'Von','Data':'Daten',
  'Downtime tolerance':'Ausfalltoleranz','Symptoms':'Symptome','Logs/Output':'Logs/Ausgabe',
  'Recent changes':'Letzte Änderungen','Consumers':'Nutzer/Konsumenten',
  'Entities':'Entitäten','Authentication':'Authentifizierung','Database':'Datenbank',
  'My level':'Mein Level','Prerequisites':'Voraussetzungen','Options':'Optionen',
  'Use case':'Anwendungsfall','Criteria':'Kriterien','Level':'Level','Type':'Typ',
  'Scope':'Umfang','Problem/Goal':'Problem/Ziel','Project':'Projekt','Goals':'Ziele',
  'Decision':'Entscheidung','Task description':'Aufgabenbeschreibung',
  'Target model':'Zielmodell','Expected output':'Erwartete Ausgabe',
  'Current prompt':'Aktueller Prompt','Prompt':'Prompt',
  'Personality':'Persönlichkeit','Capabilities':'Fähigkeiten',
  'Restrictions':'Einschränkungen','Priorities':'Prioritäten',
  'Expected behavior':'Erwartetes Verhalten','Actual behavior':'Tatsächliches Verhalten',
  'Error message':'Fehlermeldung','Steps to reproduce':'Schritte zum Reproduzieren',
  'Terminal output':'Terminal-Ausgabe','System':'System',
};

// ── Field Hints (DE translations for placeholder hint text) ──
// Research: Mixed-language UIs are a documented anti-pattern with
// measurable user trust impact. Previously: only labels were translated
// via FIELD_LABELS_DE, but the hint text below each field stayed English.
// Fix: translate all ~45 hint texts that appear as form field descriptions.
const FIELD_HINTS_DE = {
  'describe':'beschreiben',
  'who will read this?':'Wer wird das lesen?',
  'inform, persuade, entertain, instruct?':'informieren, überzeugen, unterhalten, anleiten?',
  'formal, factual, casual, scientific?':'formell, sachlich, locker, wissenschaftlich?',
  'approximate word count or page count':'ungefähre Wort- oder Seitenzahl',
  'structure, sources, style':'Struktur, Quellen, Stil',
  'relationship to recipient: colleague, supervisor, client, ...':'Beziehung zum Empfänger: Kollege, Vorgesetzter, Kunde, ...',
  'why am I writing?':'Warum schreibe ich?',
  'what should the recipient do/think/feel?':'Was soll der Empfänger tun/denken/fühlen?',
  'formal, friendly, direct, diplomatic?':'formell, freundlich, direkt, diplomatisch?',
  'what must be included?':'Was muss enthalten sein?',
  'relationship to recipient, situation':'Beziehung zum Empfänger, Situation',
  'paste here':'hier einfügen',
  'business context':'Geschäftskontext',
  'describe what needs to be set up':'beschreiben, was eingerichtet werden muss',
  'describe what exists':'beschreiben, was bereits vorhanden ist',
  'what needs improvement - cost, performance, reliability?':'Was muss verbessert werden — Kosten, Performance, Zuverlässigkeit?',
  'budget, downtime tolerance, compliance':'Budget, Ausfalltoleranz, Compliance',
  'current provider/version/setup':'aktueller Anbieter/Version/Setup',
  'target provider/version/setup':'Ziel-Anbieter/Version/Setup',
  'what data needs to be migrated, volume, format':'Welche Daten migriert werden müssen, Volumen, Format',
  'zero-downtime required? maintenance window?':'Zero-Downtime erforderlich? Wartungsfenster?',
  'describe what\'s wrong':'beschreiben, was nicht funktioniert',
  'paste relevant output':'relevante Ausgabe einfügen',
  'what changed before the issue started?':'Was hat sich geändert, bevor das Problem begann?',
  'what does this API do?':'Was macht diese API?',
  'who/what will use it?':'Wer/was wird sie nutzen?',
  'list main data entities':'Hauptdaten-Entitäten auflisten',
  'describe the business domain':'Fachdomäne beschreiben',
  'list main entities and their relationships':'Haupt-Entitäten und ihre Beziehungen auflisten',
  'what to explain':'Was erklärt werden soll',
  'beginner/intermediate/advanced':'Anfänger/Fortgeschritten/Experte',
  'why I need to understand this':'Warum ich das verstehen muss',
  'what the learner will be able to do':'Was der Lernende danach können wird',
  'what the learner already knows':'Was der Lernende bereits weiß',
  'list what to compare':'Auflisten, was verglichen werden soll',
  'my specific situation':'Meine konkrete Situation',
  'what matters most to me':'Was mir am wichtigsten ist',
  'what to practice':'Was geübt werden soll',
  'what to cover':'Was abgedeckt werden soll',
  'basic/comprehensive':'grundlegend/umfassend',
  'describe':'beschreiben',
  'describe goal':'Ziel beschreiben',
  'budget, timeline, technology, team size':'Budget, Zeitrahmen, Technologie, Teamgröße',
  'what must it achieve?':'Was muss es erreichen?',
  'technology, budget, timeline, team':'Technologie, Budget, Zeitrahmen, Team',
  'what are we deciding?':'Was entscheiden wir?',
  'why does this decision need to be made?':'Warum muss diese Entscheidung getroffen werden?',
  'list the alternatives':'Alternativen auflisten',
  'what should the AI do?':'Was soll die KI tun?',
  'format, length, style':'Format, Länge, Stil',
  'what\'s not working well?':'Was funktioniert nicht gut?',
  'what should this AI agent/chatbot do?':'Was soll dieser KI-Agent/Chatbot tun?',
  'tone, style, behavior':'Ton, Stil, Verhalten',
  'what tools/knowledge does it have?':'Welche Tools/Wissen hat er?',
  'what it must NOT do':'Was er NICHT tun darf',
  'who will interact with it?':'Wer wird damit interagieren?',
  'what should happen?':'Was soll passieren?',
  'what happens instead?':'Was passiert stattdessen?',
  'exact error message, if any':'Genaue Fehlermeldung, falls vorhanden',
  'how to trigger the bug?':'Wie lässt sich der Bug auslösen?',
  'OS, packages, versions':'Betriebssystem, Pakete, Versionen',
};

// ── Naming Convention for Localized Data Objects ──
// tk = title (key language, German)    te = title (English)
// dk = description (key language, German)  de = description (English)
// lk = label (key language, German)    le = label (English)
// This convention is compact for inline data but counterintuitive
// (de looks like "German" but stores English). Kept for consistency
// across 100+ data entries; renaming would risk introducing bugs.

// ── Project Types ──
const TYPES = [
{id:'script', icon:'📜',tk:'Skript',te:'Script',dk:'Shell, Python, einzelne Skripte',de:'Shell, Python, single scripts'},
{id:'repo',   icon:'📦',tk:'Repo / Projekt',te:'Repo / Project',dk:'Git-Repository, Multi-File',de:'Git repository, multi-file'},
{id:'text',   icon:'📝',tk:'Text / Dokument',te:'Text / Document',dk:'Artikel, Bericht, Dokumentation',de:'Article, report, documentation'},
{id:'mail',   icon:'✉️',tk:'E-Mail / Nachricht',te:'Email / Message',dk:'Geschäftlich oder persönlich',de:'Business or personal'},
{id:'data',   icon:'📊',tk:'Daten & Analyse',te:'Data & Analysis',dk:'CSV, SQL, Statistik, Visualisierung',de:'CSV, SQL, statistics, visualization'},
{id:'devops', icon:'🔧',tk:'DevOps & Infra',te:'DevOps & Infra',dk:'Docker, CI/CD, Terraform, Cloud',de:'Docker, CI/CD, Terraform, Cloud'},
{id:'api',    icon:'🔌',tk:'API & Schema',te:'API & Schema',dk:'REST, GraphQL, Datenbank-Schema',de:'REST, GraphQL, database schema'},
{id:'learn',  icon:'🎓',tk:'Lernen & Erklärung',te:'Learn & Explain',dk:'Tutorials, Vergleiche, Cheatsheets',de:'Tutorials, comparisons, cheatsheets'},
{id:'plan',   icon:'🗺️',tk:'Planung & Architektur',te:'Planning & Architecture',dk:'Brainstorm, Konzept, ADR, Diagramme',de:'Brainstorm, concept, ADR, diagrams'},
{id:'prompt', icon:'🧠',tk:'Prompt Engineering',te:'Prompt Engineering',dk:'Prompts schreiben, prüfen, optimieren',de:'Write, review, optimize prompts'},
{id:'other',  icon:'⚙️',tk:'Anderes',te:'Other',dk:'Konfiguration, Sonstiges',de:'Configuration, other'},
];

// ── Phases per Project Type ──
const PHASES = {
script:[
  {id:'new',icon:'🚀',tk:'Neues Skript',te:'New Script',dk:'Von Grund auf planen',de:'Plan from scratch'},
  {id:'optimize',icon:'⚡',tk:'Optimieren',te:'Optimize',dk:'Bestehendes verbessern',de:'Improve existing'},
  {id:'review',icon:'🔍',tk:'Prüfen',te:'Review',dk:'Auf Korrektheit prüfen',de:'Check for correctness'},
  {id:'research',icon:'🔬',tk:'Recherchieren',te:'Research',dk:'Deep Research',de:'Deep Research'},
  {id:'bugfix',icon:'🐛',tk:'Bug fixen',te:'Fix Bug',dk:'Konkretes Problem lösen',de:'Fix a specific problem'},
],
repo:[
  {id:'new',icon:'🚀',tk:'Neues Projekt',te:'New Project',dk:'Anforderungen, Research, Prototyp',de:'Requirements, research, prototype'},
  {id:'optimize',icon:'⚡',tk:'Optimieren',te:'Optimize',dk:'Bestehendes Repo verbessern',de:'Improve existing repo'},
  {id:'review',icon:'🔍',tk:'Prüfen',te:'Review',dk:'Auf Korrektheit und Sicherheit',de:'Check correctness and security'},
  {id:'research',icon:'🔬',tk:'Recherchieren',te:'Research',dk:'Deep Research',de:'Deep Research'},
  {id:'install',icon:'📥',tk:'Setup-Skript',te:'Setup Script',dk:'Idempotentes Setup mit Rollback',de:'Idempotent setup with rollback'},
],
text:[
  {id:'write',icon:'✏️',tk:'Neuen Text schreiben',te:'Write New Text',dk:'Von Null starten',de:'Start from scratch'},
  {id:'optimize',icon:'⚡',tk:'Überarbeiten',te:'Revise',dk:'Bestehenden Text verbessern',de:'Improve existing text'},
  {id:'review',icon:'🔍',tk:'Lektorat',te:'Proofread',dk:'Qualität und Konsistenz',de:'Quality and consistency'},
  {id:'research',icon:'🔬',tk:'Recherchieren',te:'Research',dk:'Deep Research zum Thema',de:'Deep research on the topic'},
],
mail:[
  {id:'write',icon:'✏️',tk:'Neue Nachricht',te:'New Message',dk:'Von Null formulieren',de:'Compose from scratch'},
  {id:'optimize',icon:'⚡',tk:'Überarbeiten',te:'Revise',dk:'Ton und Wirkung verbessern',de:'Improve tone and impact'},
  {id:'reply',icon:'↩️',tk:'Antwort formulieren',te:'Compose Reply',dk:'Auf erhaltene Nachricht reagieren',de:'Reply to a received message'},
],
data:[
  {id:'explore',icon:'🔎',tk:'Daten erkunden',te:'Explore Data',dk:'EDA, Verteilungen, Muster',de:'EDA, distributions, patterns'},
  {id:'clean',icon:'🧹',tk:'Bereinigen',te:'Clean',dk:'Fehlende Werte, Duplikate, Formate',de:'Missing values, duplicates, formats'},
  {id:'analyze',icon:'📈',tk:'Analysieren',te:'Analyze',dk:'Statistik, Modellierung',de:'Statistics, modeling'},
  {id:'visualize',icon:'📊',tk:'Visualisieren',te:'Visualize',dk:'Charts, Dashboards',de:'Charts, dashboards'},
  {id:'summarize',icon:'📋',tk:'Zusammenfassen',te:'Summarize',dk:'Ergebnisse für Stakeholder',de:'Results for stakeholders'},
],
devops:[
  {id:'create',icon:'🚀',tk:'Erstellen',te:'Create',dk:'Neue Infrastruktur aufsetzen',de:'Set up new infrastructure'},
  {id:'secure',icon:'🔒',tk:'Absichern',te:'Secure',dk:'Security-Audit, Hardening',de:'Security audit, hardening'},
  {id:'debug',icon:'🐛',tk:'Troubleshoot',te:'Troubleshoot',dk:'Fehler diagnostizieren',de:'Diagnose errors'},
  {id:'optimize',icon:'⚡',tk:'Optimieren',te:'Optimize',dk:'Performance, Kosten',de:'Performance, costs'},
  {id:'migrate',icon:'🔄',tk:'Migrieren',te:'Migrate',dk:'Provider/Version wechseln',de:'Switch provider/version'},
],
api:[
  {id:'design',icon:'✏️',tk:'Entwerfen',te:'Design',dk:'API-Architektur und Endpoints',de:'API architecture and endpoints'},
  {id:'spec',icon:'📄',tk:'Spezifizieren',te:'Specify',dk:'OpenAPI/Swagger generieren',de:'Generate OpenAPI/Swagger'},
  {id:'schema',icon:'🗄️',tk:'DB-Schema',te:'DB Schema',dk:'Datenbank-Schema entwerfen',de:'Design database schema'},
  {id:'doc',icon:'📖',tk:'Dokumentieren',te:'Document',dk:'API-Dokumentation erstellen',de:'Create API documentation'},
  {id:'review',icon:'🔍',tk:'Prüfen',te:'Review',dk:'Schema/API reviewen',de:'Review schema/API'},
],
learn:[
  {id:'explain',icon:'💡',tk:'Erklären',te:'Explain',dk:'Konzept verständlich erklären',de:'Explain a concept clearly'},
  {id:'tutorial',icon:'📚',tk:'Tutorial',te:'Tutorial',dk:'Schritt-für-Schritt Anleitung',de:'Step-by-step guide'},
  {id:'compare',icon:'⚖️',tk:'Vergleichen',te:'Compare',dk:'Technologien/Ansätze vergleichen',de:'Compare technologies/approaches'},
  {id:'cheatsheet',icon:'📋',tk:'Cheatsheet',te:'Cheatsheet',dk:'Kompakte Referenz erstellen',de:'Create compact reference'},
  {id:'exercise',icon:'🏋️',tk:'Übung',te:'Exercise',dk:'Übungsaufgaben generieren',de:'Generate practice exercises'},
],
plan:[
  {id:'brainstorm',icon:'💡',tk:'Brainstormen',te:'Brainstorm',dk:'Ideen generieren',de:'Generate ideas'},
  {id:'concept',icon:'📐',tk:'Konzept erstellen',te:'Create Concept',dk:'Struktur und Architektur',de:'Structure and architecture'},
  {id:'decision',icon:'⚖️',tk:'Entscheidung (ADR)',te:'Decision (ADR)',dk:'Trade-offs evaluieren',de:'Evaluate trade-offs'},
  {id:'diagram',icon:'🗺️',tk:'Diagramm',te:'Diagram',dk:'Mermaid, PlantUML, C4',de:'Mermaid, PlantUML, C4'},
  {id:'project',icon:'📋',tk:'Projektplan',te:'Project Plan',dk:'Meilensteine, Tasks',de:'Milestones, tasks'},
],
prompt:[
  {id:'write',icon:'✏️',tk:'Prompt schreiben',te:'Write Prompt',dk:'Aus Aufgabenbeschreibung',de:'From task description'},
  {id:'optimize',icon:'⚡',tk:'Prompt optimieren',te:'Optimize Prompt',dk:'Bestehenden Prompt verbessern',de:'Improve existing prompt'},
  {id:'review',icon:'🔍',tk:'Prompt prüfen',te:'Review Prompt',dk:'12-Dimensionen-Checkliste',de:'12-dimension checklist'},
  {id:'system',icon:'🤖',tk:'System Prompt',te:'System Prompt',dk:'Für Chatbots/Agents',de:'For chatbots/agents'},
],
other:[
  {id:'new',icon:'🚀',tk:'Neues Vorhaben',te:'New Endeavor',dk:'Von Grund auf planen',de:'Plan from scratch'},
  {id:'optimize',icon:'⚡',tk:'Optimieren',te:'Optimize',dk:'Bestehendes verbessern',de:'Improve existing'},
  {id:'review',icon:'🔍',tk:'Prüfen',te:'Review',dk:'Auf Korrektheit prüfen',de:'Check for correctness'},
  {id:'research',icon:'🔬',tk:'Recherchieren',te:'Research',dk:'Deep Research',de:'Deep Research'},
],
};

// ── Quick-Select Questions (shown between phase and config) ──
const QUESTIONS = {
'script:optimize':{q:{dk:'Wonach optimieren?',de:'Optimize for?'},multi:true,opts:[
  {id:'readability',lk:'Lesbarkeit',le:'Readability'},{id:'simplify',lk:'Vereinfachung',le:'Simplification'},
  {id:'ux',lk:'User Experience',le:'User Experience'},{id:'security',lk:'Sicherheit',le:'Security'},
  {id:'structure',lk:'Struktur',le:'Structure'},{id:'performance',lk:'Performance',le:'Performance'},
]},
'repo:optimize':{q:{dk:'Wonach optimieren?',de:'Optimize for?'},multi:true,opts:[
  {id:'readability',lk:'Lesbarkeit',le:'Readability'},{id:'simplify',lk:'Vereinfachung',le:'Simplification'},
  {id:'ux',lk:'User Experience',le:'User Experience'},{id:'security',lk:'Sicherheit',le:'Security'},
  {id:'structure',lk:'Struktur / Aufteilung',le:'Structure / Split'},{id:'docs',lk:'Dokumentation',le:'Documentation'},
]},
'text:optimize':{q:{dk:'Wonach überarbeiten?',de:'Revise for?'},multi:true,opts:[
  {id:'clarity',lk:'Klarheit',le:'Clarity'},{id:'brevity',lk:'Kürze',le:'Brevity'},
  {id:'tone',lk:'Ton & Stil',le:'Tone & Style'},{id:'grammar',lk:'Grammatik',le:'Grammar'},
]},
// varKey: when set, the selected option's label is written to this variable.
// Previously: single-select answers were captured but never used — the prompt
// resolved {{variable}} from defaults, ignoring the user's choice.
'text:write':{q:{dk:'Was für ein Text?',de:'What kind of text?'},multi:false,opts:[
  {id:'article',lk:'Artikel / Blogpost',le:'Article / Blog post'},{id:'report',lk:'Bericht',le:'Report'},
  {id:'docs',lk:'Dokumentation',le:'Documentation'},{id:'creative',lk:'Kreativ / Erzählung',le:'Creative / Narrative'},
]},
'data:analyze':{q:{dk:'Art der Analyse?',de:'Type of analysis?'},multi:false,varKey:'analysis_type',opts:[
  {id:'eda',lk:'Explorative Analyse',le:'Exploratory Analysis'},{id:'regression',lk:'Regression',le:'Regression'},
  {id:'classification',lk:'Klassifikation',le:'Classification'},{id:'clustering',lk:'Clustering',le:'Clustering'},
  {id:'timeseries',lk:'Zeitreihe',le:'Time Series'},
]},
'devops:create':{q:{dk:'Was erstellen?',de:'What to create?'},multi:false,varKey:'devops_tool',opts:[
  {id:'docker',lk:'Dockerfile / Compose',le:'Dockerfile / Compose'},{id:'terraform',lk:'Terraform / IaC',le:'Terraform / IaC'},
  {id:'cicd',lk:'CI/CD Pipeline',le:'CI/CD Pipeline'},{id:'k8s',lk:'Kubernetes',le:'Kubernetes'},
  {id:'monitoring',lk:'Monitoring / Alerting',le:'Monitoring / Alerting'},
]},
'api:design':{q:{dk:'API-Stil?',de:'API style?'},multi:false,varKey:'api_style',opts:[
  {id:'rest',lk:'REST',le:'REST'},{id:'graphql',lk:'GraphQL',le:'GraphQL'},{id:'grpc',lk:'gRPC',le:'gRPC'},
]},
'plan:brainstorm':{q:{dk:'Brainstorm-Methode?',de:'Brainstorm method?'},multi:false,varKey:'brainstorm_method',opts:[
  {id:'free',lk:'Freies Brainstorming',le:'Free Brainstorming'},{id:'scamper',lk:'SCAMPER',le:'SCAMPER'},
  {id:'sixhats',lk:'Six Thinking Hats',le:'Six Thinking Hats'},{id:'reverse',lk:'Reverse Brainstorming',le:'Reverse Brainstorming'},
]},
};

// ── Modifiers ──
const MODIFIERS = {
  comment_rules:{icon:'📝',lk:'Kommentar-Regeln',le:'Comment Rules',
    text:'Document all changes in the code with comments that describe the previous state, its problems, and the reason for the change. Do not remove existing comments that describe earlier issues and decisions. Do not reference specific version numbers — describe the general problem.'},
  lang_code_en:{icon:'🌐',lk:'Code EN / Dialog…',le:'Code EN / Dialog…',
    text:'Keep all code, variable names, comments, and technical identifiers in English.'},
  priorities:{icon:'📊',lk:'Prioritäten',le:'Priorities',
    text:'When goals conflict, follow this priority order: 1. Correctness 2. Security & data integrity 3. Readability & maintainability 4. User experience 5. Performance 6. Code brevity'},
  implement:{icon:'✅',lk:'Direkt umsetzen',le:'Implement directly',
    text:'Implement all optimizations directly. Do not just describe changes — apply them.'},
  show_only:{icon:'👁',lk:'Nur Stellen zeigen',le:'Show changes only',
    text:'Do NOT implement changes directly. Instead, show me the exact locations that need to change. Describe each location so I can find it unambiguously (from where to where, replace with what).'},
  no_delete:{icon:'🛡',lk:'Nichts löschen',le:'Never delete',
    text:'CRITICAL: Ensure the code cannot delete, overwrite, or damage any data or files under any circumstances!'},
  research_prompt:{icon:'🔬',lk:'Research-Prompt',le:'Research Prompt',
    text:'At the end, write a Deep Research prompt addressing any remaining open questions or unclear points. Provide enough context so it can be understood without prior knowledge of this project. Write it as Markdown.'},
  research_summary:{icon:'📋',lk:'Research-Zusammenfassung',le:'Research Summary',
    text:'Summarize all findings relevant to the original question as a Markdown document. The summary does not need to be compact — it should contain everything necessary. Check your summary: is it optimal, or can it be improved?'},
  logbook:{icon:'📓',lk:'Logbuch fortschreiben',le:'Continue logbook',
    text:'A running project log is maintained throughout this conversation. At the end of your response, output an updated Markdown section under `## Project Log`. Append a new entry with: date, task performed, key decisions, findings, open questions, and next steps. Do not repeat previous entries — only add the new one. Continue from the existing log if present.'},
  self_refine:{icon:'🔄',lk:'Self-Refine (3x)',le:'Self-Refine (3x)',
    text:'Before providing your final answer, perform an internal self-refinement loop: 1) Generate initial response 2) Critique it for completeness, accuracy, and clarity 3) Generate improved version. Repeat this cycle exactly 3 times, then output only the final refined result.'},
};

// ── Prompt Blocks (English, assembled per route) ──
const P = {
// ── NEW / START ──
requirements:`<role>You are a senior technical consultant helping to plan a new project.</role>
<task>
I want to set up the following: (describe goal)

**System:** {{system}}

**Priorities:** (quality vs. performance, offline-capable, main output format, localization)

**Desired deliverables:**
1. (Guide/Instructions)
2. (Script/Code)
3. (Other)

**Constraints:** (licenses, compliance, security, other restrictions)

**Process instruction:** Do NOT create a guide yet. Instead, create:
1. A numbered list of open questions that need to be clarified for an optimal solution
2. A consolidated Deep Research prompt that answers ALL questions in ONE round
</task>`,

prototype:`<role>You are a pragmatic engineer focused on minimal viable implementations.</role>
<task>
Based on the research report, create a MINIMAL guide with exactly these sections:
1. Install system dependencies (exact commands)
2. Set up project environment (exact commands)
3. First functional test (1 command that proves everything works)

<rules>
- Mark EVERY piece of information from the research that has not been verified at the terminal with **[UNVERIFIED]**
- Maximum 50 lines. No post-processing, no GUI, no batch — just the bare, runnable installation.
- End with a request for me to share the complete terminal output and the tool's help output.
</rules>
</task>`,

correction:`<task>
Here is my terminal output: (paste here)
Here is the tool's help output: (paste here)

Please:
1. Correct all [UNVERIFIED] items based on the terminal output
2. Create a table "What the research said vs. what the test showed" for each deviation
3. Expand the guide with all missing sections
4. Information that still comes only from research remains marked as [UNVERIFIED]
</task>`,

// ── OPTIMIZE ──
optimize_script:`<role>You are a senior code reviewer performing a comprehensive script audit.</role>
<task>
- Write a complete list of requirements for the script that you have identified.
- Review all previous versions of the script (including your own optimizations) critically, comprehensively, and in detail for correctness. Take your time.
- Create a single tabular overview of strengths and weaknesses of each version. Assign a ranking.
- Ensure the script CANNOT delete or damage anything!
- The script must be professional and production-ready.
</task>`,

optimize_repo:`<role>You are a senior software architect performing a comprehensive repository audit.</role>
<task>
- Write a complete list of requirements for the repo that you have identified.
- Review all previous versions critically, comprehensively, and in detail for correctness.
- Create a single tabular overview of strengths and weaknesses of each version with rankings.
- Ensure the repo CANNOT delete or damage anything!
- Are all points from RESEARCH.md considered (if it exists at the repo root)?
- Ensure the repo contains a clear, concise explanation of what it does, its options, and prerequisites (OS, packages, versions).
- The repo must be professional and production-ready.
</task>`,

opt_readability:'- Are there ways to make the code more readable without bloating it?\n- Are naming conventions consistent throughout (files, variables, functions)?',
opt_simplify:'- Are there ways to meaningfully simplify without losing important functionality?\n- Are there dead code paths, redundant logic, or implicit dependencies?',
opt_ux:'- Are there ways to optimize user experience without bloating the project?\n- Ensure there is a clear, concise description and prerequisites (OS, packages, versions).',
opt_security:'- Check for hardcoded credentials/secrets, insecure defaults, missing input validation.\n- Are there code paths that could delete, overwrite, or corrupt data?',
opt_structure:'- Does it make sense to split some files into multiple files?\n- Should any files be merged?\n- Feel free to make large restructuring changes if beneficial.',
opt_performance:'- Are there performance bottlenecks that can be resolved without adding complexity?\n- Are there unnecessary computations or redundant I/O operations?',
opt_docs:'- Is the documentation complete, accurate, and up-to-date?\n- Does a README exist with clear setup instructions?',
opt_text_clarity:'- Simplify complex sentences\n- Replace jargon with accessible language where possible\n- Improve logical structure and flow',
opt_text_brevity:'- Remove repetitions and filler words\n- Make each sentence as concise as possible without changing the meaning',
opt_text_tone:'- Adapt tone to the target audience\n- Ensure consistent style throughout\n- Avoid unintended tonal shifts',
opt_text_grammar:'- Correct all spelling and grammar errors\n- Check punctuation\n- Verify correct use of technical terms',

// ── REVIEW ──
review_structured:`<role>You are a meticulous code auditor using systematic analysis methods.</role>
<task>Review the {{project_type}} using EACH of the following methods. Document what was checked and what was found for each method.</task>`,

review_m1:'**Method 1 — Control Flow Trace:** Trace EVERY path through error handling functions. Play through all error combinations (each step OK vs. FAIL). Can any scenario produce an inconsistent state or data loss?',
review_m2:'**Method 2 — Data Flow Analysis:** Trace every value written to a variable and later used as a command or path. Can any of these values be empty, contain spaces, or point to an unexpected filesystem location?',
review_m3:'**Method 3 — Partial State Analysis:** What happens if the script aborts MID-FUNCTION (network error, user abort, power failure)? What does the NEXT run see? Does it take the correct code path?',
review_m4:'**Method 4 — Language Standard Analysis:** Does error handling behave as expected in all calling contexts? Are there implicit context switches where errors are silently swallowed or variable changes are lost?',
review_m5:'**Method 5 — Quoting/Encoding Audit:** Find EVERY place where a variable is used without proper escaping in a command. Can paths with spaces, special characters, or Unicode cause errors?',
review_m6:'**Method 6 — Platform Audit:** Are there commands, flags, or libraries that don\'t exist or behave differently on the target platform?',
review_suffix:'<output_format>ONE table with columns: Method, What was checked, Finding, Severity, Fix. Then: implement all fixes. Add a comment to each fix describing the previous problem and the reason for the change.</output_format>',

security_check:`<role>You are a security auditor.</role>
<task>The {{project_type}} MUST address each of the following points. Write a code comment for each explaining HOW it is addressed and WHY the alternative would be dangerous.</task>`,
sec_paths:'**Path Safety:** Can the script accidentally execute a system binary if a variable is empty or a path cannot be resolved? Are all path variables properly escaped?',
sec_files:'**File Safety:** Can the script corrupt a user\'s configuration file (duplicate entries, broken syntax)? Can rollback operations lose data?',
sec_errors:'**Error Handling:** Does error handling work correctly in all contexts (functions, subshells, pipes)? Are error messages never misleading?',
sec_platform:'**Platform Compatibility:** Are there commands or flags that don\'t exist or behave differently on the target platform?',
sec_idempotency:'**Idempotency:** Can the script cause damage when run repeatedly? Are already-installed components correctly detected and skipped?',
sec_smoke:'**Smoke Tests:** Do the tests actually test critical functionality, or only superficial configuration checks?',

review_perspectives:`<task>Review the entire {{project_type}} once more for correctness, consistency, and completeness from at least three perspectives:</task>`,
perspective_user:'**As a first-time user:** Can I clone the repo and use it immediately? Is everything documented?',
perspective_maintainer:'**As a maintainer:** Is the code maintainable, understandable, consistent?',
perspective_security:'**As a security reviewer:** Are there open attack vectors, insecure defaults, missing validation?',
perspective_suffix:'Explicitly confirm that nothing can be deleted or damaged. Explicitly confirm no hardcoded secrets or insecure defaults exist.',

// ── RESEARCH ──
research_consolidated:`<role>You are a thorough technical researcher.</role>
<task>Please research the following questions:

**System context:** {{system}}</task>`,
research_tools:'**Block A — Tool Evaluation:** What options exist? Benchmark comparison by quality, speed, license, platform support. Known limitations per tool.',
research_install:'**Block B — Installation & Dependencies:** Exact install commands for my system. Known dependency conflicts. CLI syntax and defaults — from CURRENT source code, not outdated documentation.',
research_platform:'**Block C — Platform Issues:** Known bugs on my OS version. Hardware acceleration and compatibility. Memory and performance characteristics.',
research_automation:'**Block D — Automation & Scripting:** Recommended method for non-interactive execution. Backup and rollback strategies. Signal handling for long-running processes.',
research_security:'**Block E — Security:** Known CVEs in current versions. Secure configuration practices.',
research_suffix:'<rules>For each answer: cite sources. When uncertain: describe how I can verify it myself.</rules>',

research_followup:`<task>
I am providing Deep Research prompt(s) and result report(s), as well as any notes from incomplete reports. Please summarize all findings relevant to the original question as a Markdown document. The summary does not need to be compact — it should contain everything necessary.
</task>`,
research_quality_check:'Check your summary and all sources again. Is the summary optimal? If there is room for improvement, create a revised version.',
research_generate_followup:'Check whether questions remain open that should be answered. If so, write another Deep Research prompt with enough context — as if nothing is known in advance. Write it as Markdown.',

// ── BUGFIX ──
bugfix:`<role>You are an expert debugger.</role>
<task>
I have a problem with the {{project_type}}:

**Expected behavior:** (what should happen?)
**Actual behavior:** (what happens instead?)
**Error message:** (exact error message, if any)
**Steps to reproduce:** (how to trigger the bug?)
**Terminal output:** (paste here)

Please:
1. Identify the root cause
2. Propose a fix and explain why it solves the problem
3. Check if the fix could have side effects
</task>`,

// ── INSTALL SCRIPT ──
install_script:`<role>You are a senior DevOps engineer.</role>
<task>
Write a professional, production-ready, idempotent installation and update script that I can reuse repeatedly.

<rules>
- Before any update, provide a meaningful form of revertability (backup)
- The script should verify whether the update succeeded — and auto-revert if not
- Extremely robust and user-friendly
- Include many relevant comments explaining decisions and approaches
</rules>
</task>`,

// ── TEXT / MAIL ──
text_write:`<role>You are a skilled writer.</role>
<task>
Write a text on the following topic:

**Topic:** (describe)
**Target audience:** (who will read this?)
**Purpose:** (inform, persuade, entertain, instruct?)
**Tone:** (formal, factual, casual, scientific?)
**Length:** (approximate word count or page count)
**Special requirements:** (structure, sources, style)
</task>`,
text_optimize:`<role>You are a professional editor.</role>
<task>Revise the following text. Keep the content and message intact, but improve:</task>`,
text_review:`<role>You are a meticulous proofreader.</role>
<task>Carefully review the following text:</task>`,
text_review_facts:'Check all facts, numbers, names, and dates for correctness. Mark uncertain items with [VERIFY].',
text_review_consistency:'Are terms used consistently throughout? Are there contradictions between sections?',
text_review_audience:'Are language, level of detail, and tone appropriate for the target audience?',
text_review_completeness:'Are important aspects missing? Are there logical gaps in the argumentation?',

mail_write:`<task>
Compose a message:

**To:** (relationship to recipient: colleague, supervisor, client, ...)
**Occasion:** (why am I writing?)
**Goal:** (what should the recipient do/think/feel?)
**Tone:** (formal, friendly, direct, diplomatic?)
**Key points:** (what must be included?)
</task>`,
mail_optimize:`<task>
Revise the following message. Keep the core message, but improve tone, clarity, and impact.

**Context:** (relationship to recipient, situation)
**Goal:** (what should the recipient do/think/feel?)

Message:
(paste here)
</task>`,
mail_reply:`<task>
Compose a reply to the following message:

**Received message:** (paste here)
**My goal:** (what should the recipient do/think/feel?)
**Tone:** (formal, friendly, direct, diplomatic?)
**Key points:** (what must be included?)
</task>`,

// ── DATA ──
data_explore:`<role>You are an experienced data scientist.</role>
<task>
Perform a comprehensive Exploratory Data Analysis (EDA) on the provided dataset.

**Dataset:** {{dataset_description}}
**Format:** (CSV/JSON/SQL/Excel)
**Columns:** (list column names and types)
**Domain:** (business context)

Provide:
1. Statistical summary of all variables
2. Distribution analysis for key columns
3. Correlation analysis / heatmap
4. Missing value assessment
5. Key patterns, anomalies, and outliers
6. Guiding questions for further analysis
</task>`,
data_clean:`<role>You are a data engineer focused on data quality.</role>
<task>Clean and prepare the dataset for analysis. Address: missing values, duplicates, inconsistent formats, outliers, type casting issues. Document every transformation and its rationale.</task>`,
data_analyze:`<role>You are a senior data scientist.</role>
<task>Perform a {{analysis_type}} analysis on the dataset. Target variable: {{target}}. Include model selection rationale, feature importance, evaluation metrics, and interpretation of results.</task>`,
data_visualize:`<role>You are a data visualization expert.</role>
<task>Create visualizations for the dataset using {{library}}. Include: appropriate chart types for each insight, clear labels/titles, color scheme suitable for the audience, annotations for key findings.</task>`,
data_summarize:`<role>You are a data analyst presenting to stakeholders.</role>
<task>Summarize the analysis findings for a {{audience}} audience. Include: executive summary, key findings with supporting data, actionable recommendations, limitations and caveats, suggested next steps.</task>`,

// ── DEVOPS ──
devops_create:`<role>You are a senior cloud/DevOps engineer.</role>
<task>Create the following infrastructure component:

**Cloud Provider:** {{cloud_provider}}
**Tool:** (Docker/Terraform/Ansible/GitHub Actions/etc.)
**Requirements:** (describe what needs to be set up)

<rules>
- Follow security best practices: least privilege, no hardcoded secrets, encrypted at rest/transit
- Use variables for all environment-specific values
- Include comments explaining architectural decisions
- deletion_protection = true for critical resources
- Never use :latest tags in production
- Pin all dependency versions
</rules>
</task>`,
devops_secure:`<role>You are a cloud security auditor.</role>
<task>Perform a security audit of the infrastructure configuration. Check for: open security groups (0.0.0.0/0), unencrypted resources, missing IAM policies, exposed secrets, non-root enforcement, image version pinning. Recommend fixes with CIS benchmark references.</task>`,

devops_optimize:`<role>You are a cloud cost and performance optimization engineer.</role>
<task>Optimize the following infrastructure configuration:

**Current Setup:** (describe what exists)
**Problem:** (what needs improvement - cost, performance, reliability?)
**Constraints:** (budget, downtime tolerance, compliance)

Analyze: resource sizing, reserved vs. on-demand, caching layers, CDN usage,
database query patterns, auto-scaling configuration, unused resources.
Provide: specific changes with estimated cost/performance impact.
</task>`,

devops_migrate:`<role>You are a cloud migration architect.</role>
<task>Plan and execute a migration:

**From:** (current provider/version/setup)
**To:** (target provider/version/setup)
**Data:** (what data needs to be migrated, volume, format)
**Downtime tolerance:** (zero-downtime required? maintenance window?)

Provide: step-by-step migration plan, rollback strategy, data verification
checks, DNS/routing cutover plan, post-migration validation tests.

<rules>
- NEVER delete source data before target verification is complete
- Always maintain rollback capability until migration is fully validated
</rules>
</task>`,

devops_debug:`<role>You are a site reliability engineer.</role>
<task>Diagnose the following infrastructure issue:

**Symptoms:** (describe what's wrong)
**Logs/Output:** (paste relevant output)
**Recent changes:** (what changed before the issue started?)

Provide: root cause analysis, step-by-step fix, prevention strategy.</task>`,

// ── API ──
api_design:`<role>You are a senior API architect following design-first principles.</role>
<task>Design a {{api_style}} API for:

**Purpose:** (what does this API do?)
**Consumers:** (who/what will use it?)
**Entities:** (list main data entities)
**Authentication:** (API Key / OAuth 2.0 / JWT)

Provide: endpoint list, HTTP methods, request/response schemas, error handling strategy (RFC 9457), pagination approach, rate limiting strategy, versioning approach.
</task>`,
api_spec:`<role>You are an API specification expert.</role>
<task>Generate a complete OpenAPI 3.1 specification (YAML) for the described API. Include: all endpoints with parameters, request/response schemas with examples, authentication definitions, error responses, pagination parameters.</task>`,
api_schema:`<role>You are a database architect.</role>
<task>Design the database schema for:

**Domain:** (describe the business domain)
**Entities:** (list main entities and their relationships)
**Database:** (PostgreSQL/MySQL/MongoDB/etc.)

Provide: table definitions (DDL), relationships (foreign keys), indexes for common queries, constraints, normalization to 3NF, migration files if applicable.
</task>`,

// ── LEARN ──
learn_explain:`<role>You are a patient, skilled teacher.</role>
<task>Explain the following concept clearly and thoroughly:

**Topic:** (what to explain)
**My level:** (beginner/intermediate/advanced)
**Context:** (why I need to understand this)

Use analogies, examples, and progressive disclosure. Start simple, then build complexity. Highlight common misconceptions.</task>`,
learn_tutorial:`<role>You are a technical instructor creating a hands-on tutorial.</role>
<task>Create a step-by-step tutorial for:

**Goal:** (what the learner will be able to do)
**Prerequisites:** (what the learner already knows)
**Environment:** {{system}}

Include: numbered steps with exact commands, expected output at each step, troubleshooting for common errors, "checkpoint" verifications.</task>`,
learn_compare:`<role>You are a technology analyst.</role>
<task>Compare the following technologies/approaches:

**Options:** (list what to compare)
**Use case:** (my specific situation)
**Criteria:** (what matters most to me)

Provide: comparison table, pros/cons for each, recommendation with rationale, "choose X when..." decision guide.</task>`,

learn_exercise:`<role>You are a technical instructor creating practice exercises.</role>
<task>Generate practice exercises for:

**Topic:** (what to practice)
**Level:** (beginner/intermediate/advanced)
**Type:** (multiple choice / coding challenge / fill-in-the-blank / project-based)

Create 5-10 exercises with increasing difficulty. For each:
1. Clear problem statement
2. Hints (hidden by default)
3. Complete solution with explanation
4. Common mistakes to watch for
</task>`,

learn_cheatsheet:`<role>You are creating a developer reference card.</role>
<task>Create a compact cheatsheet for:

**Topic:** (what to cover)
**Scope:** (basic/comprehensive)

Format: grouped by category, most-used commands/patterns first, include examples for each entry, fit on 1-2 printed pages.</task>`,

// ── PLAN ──
plan_brainstorm:`<role>You are a creative facilitator running a structured brainstorming session.</role>
<task>Generate ideas for:

**Problem/Goal:** (describe)
**Constraints:** (budget, timeline, technology, team size)
**Method:** {{brainstorm_method}}

Provide: 15-20 initial ideas (divergent), then group into themes, evaluate top 5 by feasibility/impact, suggest next steps for the top 3.</task>`,
plan_concept:`<role>You are a senior architect creating a technical concept document.</role>
<task>Create a concept/architecture document for:

**Project:** (describe)
**Goals:** (what must it achieve?)
**Constraints:** (technology, budget, timeline, team)

Include: system overview, component diagram (Mermaid), data flow, technology choices with rationale, risk assessment, implementation phases.</task>`,
plan_decision:`<role>You are helping write an Architecture Decision Record (ADR).</role>
<task>Create an ADR for the following decision:

**Decision:** (what are we deciding?)
**Context:** (why does this decision need to be made?)
**Options:** (list the alternatives)

Use the ADR format: Title, Status, Context, Decision, Consequences. Evaluate each option with pros/cons and recommend one with clear rationale.</task>`,

// ── PROMPT ENGINEERING ──
prompt_write:`<role>You are a prompt engineering expert.</role>
<task>Create a structured, high-quality prompt for the following task:

**Task description:** (what should the AI do?)
**Target model:** (GPT-4/Claude/Gemini/any)
**Expected output:** (format, length, style)

Build the prompt using: clear role definition, explicit constraints, output format specification, examples if helpful. Use XML tags for structure. Optimize for clarity and minimal token usage.</task>`,
prompt_optimize:`<role>You are a prompt optimization specialist.</role>
<task>Analyze and improve the following prompt:

**Current prompt:** (paste here)
**Problem:** (what's not working well?)

Evaluate on: clarity, completeness, specificity, structure, token efficiency, hallucination risk. Provide the improved version with explanations for each change.</task>`,
prompt_review:`<role>You are a prompt quality auditor using a systematic checklist.</role>
<task>Review the following prompt against these 12 quality dimensions:

**Prompt:** (paste here)

Rate each dimension 1-10 and suggest improvements for anything below 7:
1. Clarity — unambiguous instructions
2. Completeness — all necessary context provided
3. Specificity — concrete success criteria
4. Structure — sections separated by delimiters
5. Examples — appropriate input/output demonstrations
6. Role/Persona — suitable role assignment
7. Output format — explicit format specification
8. Hallucination risk — uncertainty rules, source requirements
9. Token efficiency — only essential information
10. Constraints — length limits, tone, forbidden behaviors
11. Edge cases — instructions for ambiguous/erroneous inputs
12. Reasoning support — Chain-of-Thought when task requires it
</task>`,
prompt_system:`<role>You are an expert in designing AI system prompts.</role>
<task>Create a system prompt for:

**Purpose:** (what should this AI agent/chatbot do?)
**Personality:** (tone, style, behavior)
**Capabilities:** (what tools/knowledge does it have?)
**Restrictions:** (what it must NOT do)
**Target audience:** (who will interact with it?)

Include: identity definition, behavioral rules, response format, error handling, edge case instructions. Use XML tags for structure.</task>`,
};


// Previously: section labels were generated from IDs via regex replacement,
// producing cryptic names like "Review M1" or "Sec Paths".
// Fix: explicit human-readable labels for all section IDs.
const SECTION_LABELS = {
  review_m1:'Control Flow Trace',review_m2:'Data Flow Analysis',
  review_m3:'Partial State Analysis',review_m4:'Language Standard',
  review_m5:'Quoting / Encoding Audit',review_m6:'Platform Audit',
  review_suffix:'Result Format',
  sec_paths:'Path Safety',sec_files:'File Safety',sec_errors:'Error Handling',
  sec_platform:'Platform Compatibility',sec_idempotency:'Idempotency',sec_smoke:'Smoke Tests',
  perspective_user:'As First-Time User',perspective_maintainer:'As Maintainer',
  perspective_security:'As Security Reviewer',perspective_suffix:'Confirmation',
  research_tools:'Tool Evaluation',research_install:'Installation & Dependencies',
  research_platform:'Platform Issues',research_automation:'Automation & Scripting',
  research_security:'Security',research_suffix:'Source Requirements',
  text_review_facts:'Factual Correctness',text_review_consistency:'Consistency',
  text_review_audience:'Audience Fit',text_review_completeness:'Completeness',
  research_quality_check:'Quality Check',research_generate_followup:'Generate Follow-Up',
};

// ── Route Mapping: (type:phase) → config ──
const ROUTES = {
'script:new':{blocks:['requirements','prototype','correction'],mods:['lang_code_en','priorities']},
'script:optimize':{blocks:['optimize_script'],optMap:{readability:'opt_readability',simplify:'opt_simplify',ux:'opt_ux',security:'opt_security',structure:'opt_structure',performance:'opt_performance'},mods:['comment_rules','lang_code_en','priorities','implement','no_delete']},
'script:review':{blocks:['review_structured'],sections:['review_m1','review_m2','review_m3','review_m4','review_m5','review_m6'],suffix:'review_suffix',mods:['lang_code_en','no_delete']},
'script:research':{blocks:['research_consolidated'],sections:['research_tools','research_install','research_platform','research_automation','research_security'],suffix:'research_suffix',mods:[]},
'script:bugfix':{blocks:['bugfix'],mods:['lang_code_en']},

'repo:new':{blocks:['requirements','prototype','correction'],mods:['lang_code_en','priorities']},
'repo:optimize':{blocks:['optimize_repo'],optMap:{readability:'opt_readability',simplify:'opt_simplify',ux:'opt_ux',security:'opt_security',structure:'opt_structure',docs:'opt_docs'},mods:['comment_rules','lang_code_en','priorities','implement','no_delete']},
'repo:review':{blocks:['review_structured','security_check','review_perspectives'],
  sections:['review_m1','review_m2','review_m3','review_m4','review_m5','review_m6','sec_paths','sec_files','sec_errors','sec_platform','sec_idempotency','sec_smoke','perspective_user','perspective_maintainer','perspective_security'],
  suffix:'perspective_suffix',mods:['lang_code_en','no_delete']},
'repo:research':{blocks:['research_consolidated'],sections:['research_tools','research_install','research_platform','research_automation','research_security'],suffix:'research_suffix',mods:[]},
'repo:install':{blocks:['install_script'],mods:['lang_code_en','priorities','comment_rules']},

'text:write':{blocks:['text_write'],mods:[]},
'text:optimize':{blocks:['text_optimize'],optMap:{clarity:'opt_text_clarity',brevity:'opt_text_brevity',tone:'opt_text_tone',grammar:'opt_text_grammar'},mods:[]},
'text:review':{blocks:['text_review'],sections:['text_review_facts','text_review_consistency','text_review_audience','text_review_completeness'],mods:[]},
'text:research':{blocks:['research_consolidated'],sections:['research_tools'],suffix:'research_suffix',mods:[]},

'mail:write':{blocks:['mail_write'],mods:[]},
'mail:optimize':{blocks:['mail_optimize'],optMap:{clarity:'opt_text_clarity',brevity:'opt_text_brevity',tone:'opt_text_tone',grammar:'opt_text_grammar'},mods:[]},
'mail:reply':{blocks:['mail_reply'],mods:[]},

'data:explore':{blocks:['data_explore'],mods:[]},
'data:clean':{blocks:['data_clean'],mods:[]},
'data:analyze':{blocks:['data_analyze'],mods:[]},
'data:visualize':{blocks:['data_visualize'],mods:[]},
'data:summarize':{blocks:['data_summarize'],mods:[]},

'devops:create':{blocks:['devops_create'],mods:['comment_rules','priorities','no_delete']},
'devops:secure':{blocks:['devops_secure'],mods:['no_delete']},
'devops:debug':{blocks:['devops_debug'],mods:[]},
'devops:optimize':{blocks:['devops_optimize'],mods:['priorities']},
'devops:migrate':{blocks:['devops_migrate'],mods:['no_delete','priorities']},

'api:design':{blocks:['api_design'],mods:['priorities']},
'api:spec':{blocks:['api_spec'],mods:[]},
'api:schema':{blocks:['api_schema'],mods:['priorities']},
'api:doc':{blocks:['api_design'],mods:[]},
'api:review':{blocks:['review_structured'],sections:['review_m1','review_m2'],suffix:'review_suffix',mods:['no_delete']},

'learn:explain':{blocks:['learn_explain'],mods:[]},
'learn:tutorial':{blocks:['learn_tutorial'],mods:[]},
'learn:compare':{blocks:['learn_compare'],mods:[]},
'learn:cheatsheet':{blocks:['learn_cheatsheet'],mods:[]},
'learn:exercise':{blocks:['learn_exercise'],mods:[]},

'plan:brainstorm':{blocks:['plan_brainstorm'],mods:[]},
'plan:concept':{blocks:['plan_concept'],mods:['priorities']},
'plan:decision':{blocks:['plan_decision'],mods:[]},
'plan:diagram':{blocks:['plan_concept'],mods:[]},
'plan:project':{blocks:['plan_concept'],mods:['priorities']},

'prompt:write':{blocks:['prompt_write'],mods:[]},
'prompt:optimize':{blocks:['prompt_optimize'],mods:[]},
'prompt:review':{blocks:['prompt_review'],mods:[]},
'prompt:system':{blocks:['prompt_system'],mods:[]},

'other:new':{blocks:['requirements'],mods:['priorities']},
'other:optimize':{blocks:['optimize_repo'],optMap:{readability:'opt_readability',simplify:'opt_simplify',security:'opt_security'},mods:['priorities','implement']},
'other:review':{blocks:['review_structured'],sections:['review_m1','review_m2','review_m3'],suffix:'review_suffix',mods:['no_delete']},
'other:research':{blocks:['research_consolidated'],sections:['research_tools','research_install','research_security'],suffix:'research_suffix',mods:[]},
};

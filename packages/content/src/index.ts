/**
 * @neurovim/content — versionierte Content-Quelle.
 *
 * Bündelt (nach Phase 3) den Player-Content als build-bare, typisierte Daten:
 *  - Missionen: ARC I (M-01..M-16) + ARC II (R-01..R-24)
 *  - Katas (KATA-01..11), Loot (LOOT-01..06), Fragments, REF
 *  - STORY-BIBLE, WORLD-CODEX, CHARACTERS, ORGANIZATIONS
 *
 * Herkunft: 32_NeuroVim/_content/ + _dev/ (heute Obsidian-Markdown im Vault).
 * Build-Step: Markdown + Frontmatter → typisiertes JSON, das ContentSource (web) lädt.
 *
 * Offene Frage (ADR Open Question 3): bleibt Obsidian die Autoren-Umgebung
 * (Build extrahiert aus Vault) oder wandert Authoring ins Monorepo?
 */
export {};
// TODO Phase 3: Content-Extraktions-Build + typisierte Mission-Exports.

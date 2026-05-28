/**
 * ObsidianContent — ContentPort-Implementierung gegen die Obsidian-Vault-API.
 *
 * Liest Mission-/Lore-Content aus den Vault-`_content/`-Notes (= Bestand-Plugin-Verhalten,
 * unverändert). Findet Files über `metadataCache`-Frontmatter (mission_id / loot_id),
 * wie es main.ts bereits tut — kein zusätzliches Pfad-Mapping nötig.
 *
 * Noch NICHT in main.ts verdrahtet — Port-Consumption ist Schritt 2.5. Diese Impl
 * stabilisiert die Schnittstelle und ist test-/wiederverwendbar.
 * ADR-001 §P4 / D3 / D15.
 */
import { App, TFile } from 'obsidian';
import type { ContentPort, MissionSummary, MissionDoc, LoreDoc } from '@neurovim/core';

export class ObsidianContent implements ContentPort {
  constructor(private readonly app: App) {}

  private fm(file: TFile): Record<string, unknown> {
    return this.app.metadataCache.getFileCache(file)?.frontmatter ?? {};
  }

  private toSummary(file: TFile, fm: Record<string, unknown>): MissionSummary {
    const id = String(fm.mission_id ?? '');
    return {
      mission_id: id,
      mission_type: (fm.mission_type as MissionSummary['mission_type']) ?? 'practice',
      title: String(fm.title ?? file.basename),
      category: String(fm.category ?? ''),
      xp_reward: Number(fm.xp_reward ?? 0),
      locked: Boolean(fm.locked ?? false),
      tier: String(fm.tier ?? ''),
      arc: /^R-/.test(id) ? 'II' : 'I',
      chapter: file.parent?.name ?? '.',
    };
  }

  async listMissions(arc?: 'I' | 'II'): Promise<MissionSummary[]> {
    const out: MissionSummary[] = [];
    for (const file of this.app.vault.getMarkdownFiles()) {
      const fm = this.fm(file);
      if (!fm.mission_id) continue;
      if (!file.path.includes('TRANSMISSION') && !file.path.includes('KATA')) continue;
      const s = this.toSummary(file, fm);
      if (arc && s.arc !== arc) continue;
      out.push(s);
    }
    return out;
  }

  async getMission(id: string): Promise<MissionDoc> {
    const files = this.app.vault.getMarkdownFiles();
    const main = files.find(
      (f) => String(this.fm(f).mission_id ?? '') === id
        && (f.path.includes('TRANSMISSION') || f.path.includes('KATA')),
    );
    if (!main) throw new Error(`Mission nicht gefunden: ${id}`);
    const briefing = files.find(
      (f) => String(this.fm(f).mission_id ?? '') === id && f.path.includes('BRIEFING'),
    );
    return {
      ...this.toSummary(main, this.fm(main)),
      transmissionBody: await this.app.vault.read(main),
      briefingBody: briefing ? await this.app.vault.read(briefing) : '',
    };
  }

  async getLore(id: string): Promise<LoreDoc> {
    const file = this.app.vault.getMarkdownFiles().find((f) => {
      const fm = this.fm(f);
      return String(fm.loot_id ?? '') === id || f.basename.startsWith(id);
    });
    if (!file) throw new Error(`Lore nicht gefunden: ${id}`);
    const fm = this.fm(file);
    const kind: LoreDoc['kind'] = file.path.includes('/LOOT/') ? 'loot'
      : file.path.includes('/FRAGMENTS/') ? 'fragment' : 'ref';
    return { id, kind, title: String(fm.title ?? file.basename), body: await this.app.vault.read(file) };
  }

  async getRaw(path: string): Promise<string> {
    return this.app.vault.adapter.read(path);
  }
}

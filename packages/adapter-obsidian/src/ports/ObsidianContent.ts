/**
 * ObsidianContent — ContentPort implementation against the Obsidian vault API.
 *
 * Reads mission/lore content from the vault's `_content/` notes (= existing plugin behavior,
 * unchanged). Finds files via `metadataCache` frontmatter (mission_id / loot_id),
 * as main.ts already does — no additional path mapping needed.
 *
 * NOT yet wired into main.ts — port consumption is step 2.5. This impl
 * stabilizes the interface and is testable/reusable.
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
    if (!main) throw new Error(`Mission not found: ${id}`);
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
    if (!file) throw new Error(`Lore not found: ${id}`);
    const fm = this.fm(file);
    const kind: LoreDoc['kind'] = file.path.includes('/LOOT/') ? 'loot'
      : file.path.includes('/FRAGMENTS/') ? 'fragment' : 'ref';
    return { id, kind, title: String(fm.title ?? file.basename), body: await this.app.vault.read(file) };
  }

  async getRaw(path: string): Promise<string> {
    return this.app.vault.adapter.read(path);
  }
}

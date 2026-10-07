/**
 * ObjectivePanel — what the mission asks for, shown for the whole run above the editor.
 * Deliberately independent of the CIPHER rail's guidance tier, pin and taps: the motions
 * are the challenge, the target never is. Exact strings (backtick spans in the content)
 * render as <code> so they stand out from the prose. The panel's height is capped (see
 * styles.css), so a long list scrolls inside it — tabIndex makes that scroll region
 * reachable by keyboard; the labelled <section> is announced as the "Objective" region.
 */
import type { MissionSummary } from '@neurovim/core';
import { objectiveView } from './objective';

export function ObjectivePanel({ mission }: { mission: Pick<MissionSummary, 'objective' | 'summary'> }) {
  const view = objectiveView(mission);
  return (
    <section class="nv-objective" aria-labelledby="nv-objective-label" tabIndex={0}>
      <h2 id="nv-objective-label" class="nv-objective-k">Objective</h2>
      {view.kind === 'steps' ? (
        <ol class="nv-objective-steps">
          {view.steps.map((segs, i) => (
            <li key={i}>
              {segs.map((s, j) => (s.code ? <code key={j}>{s.text}</code> : s.text))}
            </li>
          ))}
        </ol>
      ) : (
        <p class="nv-objective-summary">{view.text}</p>
      )}
    </section>
  );
}

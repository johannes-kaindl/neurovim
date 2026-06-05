/**
 * Reveal-corruption — a CM6 line-decoration field driven by a StateEffect. Highlights the
 * lines that still differ from the solution (location to look at — never the fix). The host
 * computes the divergent line indices (core getDivergentLines) and dispatches them.
 */
import { StateEffect, StateField, RangeSetBuilder } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';

export const setRevealLines = StateEffect.define<number[]>();

const lineMark = Decoration.line({ class: 'nv-reveal-line' });

export const revealField = StateField.define<DecorationSet>({
  create() { return Decoration.none; },
  update(deco, tr) {
    deco = deco.map(tr.changes);
    for (const e of tr.effects) {
      if (e.is(setRevealLines)) {
        const builder = new RangeSetBuilder<Decoration>();
        for (const idx of e.value) {
          if (idx >= 0 && idx < tr.state.doc.lines) {
            const line = tr.state.doc.line(idx + 1); // CM lines are 1-based
            builder.add(line.from, line.from, lineMark);
          }
        }
        deco = builder.finish();
      }
    }
    return deco;
  },
  provide: (f) => EditorView.decorations.from(f),
});

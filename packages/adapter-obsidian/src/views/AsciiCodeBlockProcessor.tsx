import React from 'react';
import { render as preactRender } from 'preact';
import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { AsciiArt, AsciiFilter } from '@neurovim/core';

type Kind = { tag: string; filter: AsciiFilter | null };

const KINDS: Kind[] = [
  { tag: 'ascii', filter: null },
  { tag: 'ascii-glitch', filter: 'glitch' },
  { tag: 'ascii-corruption', filter: 'corruption' },
  { tag: 'ascii-scanlines', filter: 'scanlines' },
  { tag: 'ascii-chromatic', filter: 'chromatic' },
];

export function registerAsciiCodeBlockProcessors(plugin: Plugin): void {
  for (const { tag, filter } of KINDS) {
    plugin.registerMarkdownCodeBlockProcessor(
      tag,
      (source: string, el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
        el.classList.add('nv-ascii-host', `nv-ascii-host--${tag}`);
        el.style.background = 'transparent';
        el.style.border = 'none';
        el.style.padding = '0';
        el.style.margin = '0';
        preactRender(
          <AsciiArt art={source} filter={filter} className={`nv-ascii nv-ascii--${tag}`} />,
          el,
        );
      },
    );
  }
}

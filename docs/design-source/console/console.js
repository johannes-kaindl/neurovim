/* =============================================================
   NeuroVim — Operative Console · application logic
   ============================================================= */
(function () {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  /* ---------- persistent state ---------- */
  const LS = 'nv_console_v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } };
  const save = () => localStorage.setItem(LS, JSON.stringify(state));
  const state = Object.assign({ done: {}, xp: 0, streak: 0, fastest: null, onboarded: false, audio: false,
    tw: { hue: 145, glow: 1, scan: 0.55, vig: 0.72, motion: 'on' } }, load());
  state.tw = Object.assign({ hue: 145, glow: 1, scan: 0.55, vig: 0.72, motion: 'on', bloom: 1.3, mono: 'on', font: 'tech' }, state.tw || {});

  /* ---------- ranks ---------- */
  const RANKS = ['SIGNAL LOST', 'GHOST OPERATIVE', 'CIPHER-CLEARED', 'SHADOW LINK', 'NIGHTFALL', 'ARCHITECT'];
  const LEVEL_XP = 66; // xp to first rank-up (demo)

  /* ---------- mission data ---------- */
  const cleanGeneric = (title, skill) => ([
    'FROM: CIPHER',
    'TO: OPERATIVE',
    '',
    'CORP corrupted this transmission in transit. NEVERMORE noise,',
    'injected at the character level. The document reads as garbage.',
    'It should not. Restore it.',
    '',
    'This drill trains one discipline: ' + skill + '.',
    'Use Vim. Nothing else. Drop the noise, recover the signal.',
    '',
    'Normal mode is your default. Move without writing.',
    'Insert when you must change. Escape when you are done.',
    '',
    'The file is broken. The tool is not.',
    'Use the tool. Fix the file.',
    '',
    '— CIPHER'
  ]);

  const M01_CORRUPT = [
    'FROM: CIPHER',
    'TO: [PENDING DESIGNATION] — NEW OPERATIVE',
    '',
    'YoXur induction doZcument has been comprXomized in tranZsit.',
    "CORP's NEVERMORE sysXtem injeXcted noise at the charZacter level.",
    'You must useX the tooXl to reZmove it.',
    '',
    'Three moXdes. That is alXl you need to knoZw right now.',
    '',
    'Normal mZode — your defauXlt state. The tool waXits here.',
    'Insert moXde — when you must cZhange somethZing. Press i.',
    'Escape — wheXn you are done chanZging. Press ESC.',
    '',
    'YouX are not typZing. You are editZing.',
    'There is a diXfference. LeaZrn it.',
    '',
    'The fiXle is broken. The tooXl is not.',
    'Use the tZool. Fix the fXile.',
    '',
    '— CIPHER'
  ];

  // inject X/Z noise into interior of words (deterministic via seed)
  function corrupt(lines, seed) {
    let s = seed * 1013;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return lines.map(l => l.replace(/[A-Za-z]{4,}/g, (w) => {
      if (rnd() < 0.45) return w;
      const pos = 1 + Math.floor(rnd() * (w.length - 2));
      const ch = rnd() < 0.5 ? 'X' : 'Z';
      return w.slice(0, pos) + ch + w.slice(pos);
    }));
  }

  function mk(id, title, xp, skill, opts = {}) {
    return Object.assign({ id, title, xp, skill }, opts);
  }

  const TIERS = [
    { name: 'ARC I · INDOCTRINATION', missions: [
      mk('M-01', 'The Three Modes', 15, 'mode switching', {
        corrupt: M01_CORRUPT, file: 'M-01-TRANSMISSION-The_Three_Modes',
        brief: {
          head: ['INCOMING — CIPHER', 'BRIEFING: M-01 // THE THREE MODES'],
          callouts: [
            { type: 'quote', who: 'CIPHER', text: "You were referred. Someone vouched. That's all you get before the test. Before you receive a designation, before you receive missions — you prove you can use the tool. Not fluently. Not fast. Just: can you use it at all. CORP corrupted your induction document in transit. Standard NEVERMORE noise. The document reads as garbage. It shouldn't. Restore it. Use Vim. Nothing else. Three modes. That's all you need. The document is waiting." },
            { type: 'directive', objective: 'Restore the corrupted induction document.', skills: 'Mode switching (<kbd>i</kbd> <kbd>a</kbd> <kbd>o</kbd> <kbd>ESC</kbd>), character deletion (<kbd>x</kbd> <kbd>X</kbd>)', xp: 15 }
          ]
        }
      }),
      mk('M-02', 'Basic Navigation — hjkl', 15, 'cursor movement'),
      mk('M-03', 'Word Movement — w b e', 20, 'word motions'),
      mk('M-04', 'Lines and Jumps', 15, 'line motions'),
    ]},
    { name: 'ARC I · FIELD TRAINING', missions: [
      mk('M-05', 'Operators — d c y p', 25, 'operators'),
      mk('M-06', 'Text Objects — ciw di( ya"', 30, 'text objects'),
      mk('M-07', 'Search and Replace — f / ?', 30, 'search & replace'),
      mk('M-08', 'Corrupted Transmission — Operation RAVEN', 35, 'all of Tier 2 combined', {
        boss: true, file: 'M-08-TRANSMISSION-Corrupted_Transmission',
        brief: {
          head: ['INCOMING — WRAITH + CIPHER', 'BRIEFING: M-08 // OPERATION RAVEN', 'Clearance: SHADOW LINK'],
          callouts: [
            { type: 'wraith', who: 'WRAITH', text: "CORP intercepted the archive transmission. The original is a poem — our next handoff is encoded in it. They replaced words, shifted lines, injected garbage. Everything you've learned — modes, navigation, word movement, operators, text objects, search and replace. All of it. Restore the poem. Vim only. Clock is running." },
            { type: 'quote', who: 'CIPHER', text: "The poem is Poe's The Raven. Clean version in 99-THE_RAVEN for reference. Every Nevermore you recover is the same word. Work fast. Work clean." },
            { type: 'warning', who: 'CLEARANCE', text: "SHADOW LINK is one-time. If verification fails, the channel burns and you restart cold." },
            { type: 'directive', objective: 'Fully restore the corrupted Raven transmission.', skills: 'All of Tier 2 — combined application', xp: 35 }
          ]
        }
      }),
    ]},
    { name: 'ARC I · DEEP COVER', locked: true, missions: [
      mk('M-09', 'Marks, Macros & Registers', 50, 'macros'),
      mk('M-10', 'Named Registers', 55, 'registers'),
      mk('M-11', 'Bulletin Drift', 55, 'drift recovery'),
      mk('M-12', 'Anomaly Classification', 60, 'classification'),
    ]},
    { name: 'ARC I · COUNTER-OPS', locked: true, missions: [
      mk('M-13', 'Case-Cipher Decryption', 55, 'case operations'),
      mk('M-14', 'Counter-Operations', 60, 'counter-ops'),
      mk('M-15', 'Pattern Rewriting', 65, 'pattern rewrite'),
      mk('M-16', 'Extraction Window', 80, 'extraction'),
    ]},
    { name: 'KATA · DRILLS', kata: true, missions: [
      mk('KATA-01', 'Word Sprint', 10, 'word sprint'),
      mk('KATA-02', 'Operator Strike', 10, 'operator strike'),
      mk('KATA-03', 'Object Infiltration', 10, 'text objects'),
      mk('KATA-04', 'Echo Trace', 10, 'search'),
      mk('KATA-05', 'Line Splice', 10, 'line ops'),
      mk('KATA-06', 'Visual Sweep', 15, 'visual mode'),
    ]},
  ];

  // flat ordered list + lookup; seed corrupt + briefs
  const ORDER = [];
  const BY_ID = {};
  let seed = 1;
  TIERS.forEach((t, ti) => t.missions.forEach((m) => {
    m.tierIndex = ti;
    m.tierLocked = !!t.locked;
    if (!m.corrupt) m.corrupt = corrupt(cleanGeneric(m.title, m.skill), seed++);
    if (!m.file) m.file = m.id + '-TRANSMISSION';
    if (!m.brief) m.brief = {
      head: ['INCOMING — CIPHER', 'BRIEFING: ' + m.id + ' // ' + m.title.toUpperCase()],
      callouts: [
        { type: 'quote', who: 'CIPHER', text: 'Another transmission, another wound CORP left in it. This one drills ' + m.skill + '. You know the shape of the work by now — find the noise, drop it, recover the signal. Vim only. The document is waiting.' },
        { type: 'directive', objective: 'Restore the corrupted transmission.', skills: 'Focus: ' + m.skill, xp: m.xp }
      ]
    };
    ORDER.push(m); BY_ID[m.id] = m;
  }));

  // demo progress: first three done, M-04 active
  if (!Object.keys(state.done).length && !state._init) {
    state.done = { 'M-01': { time: 1.2, keys: 14 }, 'M-02': { time: 2.1, keys: 22 }, 'M-03': { time: 3.4, keys: 31 } };
    state.xp = 50; state.streak = 3; state.fastest = 1.2; state._init = true; save();
  }

  function missionState(m) {
    if (state.done[m.id]) return 'done';
    if (m.tierLocked) return 'locked';
    // first non-done unlocked mission in arc order is "active"
    return m === firstActive() ? 'active' : 'unlocked';
  }
  function firstActive() {
    return ORDER.find(m => !m.tierLocked && !m.kata && !state.done[m.id]) || null;
  }

  /* ---------- routing ---------- */
  let current = null; // current mission for briefing/editor
  function go(view) {
    $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
    $('#stage').scrollTop = 0;
    if (view !== 'editor') { $('#sb-hud').classList.remove('on'); stopTimer(); }
    if (view === 'nexus') renderNexus();
    if (view === 'sandbox') updateSandboxPB();
  }
  $$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));

  /* ---------- NEXUS render ---------- */
  function renderNexus() {
    $('#lvl').textContent = 1;
    $('#rank').textContent = RANKS[0];
    $('#next-rank').textContent = RANKS[1];
    $('#xp-have').textContent = state.xp;
    $('#xp-need').textContent = LEVEL_XP;
    const pct = Math.min(100, Math.round(state.xp / LEVEL_XP * 100));
    requestAnimationFrame(() => {
      $('#xpfill').style.width = pct + '%';
      if (xpJustGained) {
        const f = $('#xpfill'); f.classList.remove('flash'); void f.offsetWidth; f.classList.add('flash');
        setTimeout(() => f.classList.remove('flash'), 700); xpJustGained = false;
      }
    });
    const cleared = Object.keys(state.done).length;
    $('#stat-cleared').textContent = cleared;
    $('#stat-streak').textContent = state.streak;
    $('#stat-fast').textContent = state.fastest ? state.fastest.toFixed(1) + 's' : '—';

    const host = $('#tiers'); host.innerHTML = '';
    TIERS.forEach(t => {
      const tEl = document.createElement('div'); tEl.className = 'tier';
      const cleared = t.missions.filter(m => state.done[m.id]).length;
      tEl.innerHTML =
        '<div class="tier-head">' +
          '<span class="name">' + esc(t.name) + (t.locked ? ' <span class="dim">· LOCKED</span>' : '') + '</span>' +
          '<span class="line"></span>' +
          '<span class="count">' + cleared + '/' + t.missions.length + ' cleared</span>' +
        '</div>';
      const list = document.createElement('div'); list.className = 'mlist';
      t.missions.forEach(m => {
        const st = missionState(m);
        const row = document.createElement('button');
        row.className = 'mrow ' + st;
        row.disabled = (st === 'locked');
        const best = state.done[m.id];
        row.innerHTML =
          '<span class="mid">' + (st === 'active' ? '<span class="marker">▸</span> ' : '') + esc(m.id) + '</span>' +
          '<span class="mtitle">' + esc(m.title) + '</span>' +
          (best ? '<span class="mbest">★ ' + best.time.toFixed(1) + 's · ' + best.keys + 'ks</span>' : '<span class="mbest"></span>') +
          '<span class="mxp">' + (st === 'done' ? '<span class="check">✓</span>' : st === 'locked' ? '<span class="lock">⊘ LOCKED</span>' : '<b>' + m.xp + '</b> XP') + '</span>';
        if (st !== 'locked') row.addEventListener('click', () => openBriefing(m));
        list.appendChild(row);
      });
      tEl.appendChild(list);
      host.appendChild(tEl);
    });
  }

  /* ---------- BRIEFING ---------- */
  function openBriefing(m) {
    current = m;
    $('#brief-crumb').innerHTML = '<b>' + esc(m.id) + '</b> · ' + esc(m.title);
    const b = m.brief;
    let html = '<div class="ascii-box"><div class="ascii-frame">' +
      b.head.map((l, i) => '<div>' + (i === 0 ? '<span class="lead">' + esc(l) + '</span>' : esc(l)) + '</div>').join('') +
      '</div></div>';
    b.callouts.forEach(c => {
      if (c.type === 'directive') {
        html += '<div class="callout directive"><div class="head">DIRECTIVE</div>' +
          '<div class="dir-item"><span class="k">OBJECTIVE</span><span class="v">' + esc(c.objective) + '</span></div>' +
          '<div class="dir-item"><span class="k">SKILLS</span><span class="v">' + c.skills + '</span></div>' +
          '<div class="dir-item"><span class="dir-xp">+' + c.xp + ' XP</span></div>' +
          '<div class="dir-file">→ <b>' + esc(m.file) + '</b> — open to begin. Timer starts on file open.</div>' +
          '</div>';
      } else {
        html += '<div class="callout ' + c.type + '"><span class="who">' + esc(c.who) + '</span>' +
          '<span class="body">' + (c.type === 'quote' || c.type === 'wraith' ? '"' + esc(c.text) + '"' : esc(c.text)) + '</span></div>';
      }
    });
    $('#brief-body').innerHTML = html;
    go('briefing');
  }
  $('#brief-begin').addEventListener('click', () => openEditor(current));
  $('#brief-begin-top').addEventListener('click', () => openEditor(current));

  /* ---------- EDITOR ---------- */
  let mode = 'NORMAL', curLine = 0, curCol = 0, keys = 0, t0 = 0, timerId = null, caretEl = null, xpJustGained = false;

  function openEditor(m) {
    current = m;
    $('#ed-crumb').innerHTML = '<b>' + esc(m.id) + '</b> · ' + esc(m.title);
    $('#ed-file').textContent = m.file;
    renderCode(m);
    curLine = 0; curCol = 0; keys = 0;
    $('#hud-keys').textContent = '0';
    setMode('NORMAL');
    updateNoise();
    highlightLine(0);
    $('#sb-hud').classList.toggle('on', !!m.sandbox);
    go('editor');
    startTimer();
    $('#ed-submit').disabled = false;
  }

  function renderCode(m) {
    const lines = m.corrupt;
    $('#ed-gutter').innerHTML = lines.map((_, i) => '<div class="lnum' + (i === 0 ? ' cur' : '') + '">' + (i + 1) + '</div>').join('');
    $('#ed-code').innerHTML = lines.map((l, i) => {
      const body = esc(l).replace(/[XZ]/g, '<span class="noise">$&</span>');
      return '<div class="ln' + (i === 0 ? ' cur' : '') + '" data-i="' + i + '">' + (body || ' ') + '</div>';
    }).join('');
    const n = $$('#ed-code .noise').length;
    $('#hud-noise').textContent = n;
  }

  function updateNoise() {
    const n = $$('#ed-code .noise').length;
    $('#hud-noise').textContent = n;
    $('#sbh-rem').textContent = n;
    const rem = $('#sb-hud .cell.rem'); if (rem) rem.classList.toggle('clean', n === 0);
    return n;
  }
  function lineLen(i) { return (current.corrupt[i] || '').length; }
  function clampCol(i, col) { return Math.max(0, Math.min(col, Math.max(0, lineLen(i) - (mode === 'INSERT' ? 0 : 1)))); }

  function placeCaret(line, col) {
    if (caretEl) caretEl.remove();
    caretEl = document.createElement('span');
    caretEl.className = 'ed-caret' + (mode === 'INSERT' ? ' insert' : mode === 'VISUAL' ? ' visual' : '');
    const ln = $('#ed-code .ln[data-i="' + line + '"]');
    if (ln) { caretEl.style.left = col + 'ch'; ln.appendChild(caretEl); }
    $('#hud-ln').textContent = line + 1;
    $('#hud-col').textContent = col + 1;
  }
  function highlightLine(i) {
    $$('#ed-code .ln').forEach(l => l.classList.toggle('cur', +l.dataset.i === i));
    $$('#ed-gutter .lnum').forEach((l, k) => l.classList.toggle('cur', k === i));
  }
  function setMode(m) {
    mode = m;
    const chip = $('#mode-chip');
    chip.textContent = m; chip.dataset.mode = m;
    curCol = clampCol(curLine, curCol);
    placeCaret(curLine, curCol);
  }

  function startTimer() {
    t0 = performance.now();
    stopTimer();
    timerId = setInterval(() => {
      const s = (performance.now() - t0) / 1000;
      $('#hud-timer').textContent = s.toFixed(1) + 's';
      if (current && current.sandbox) $('#sbh-time').textContent = s.toFixed(1);
    }, 100);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  // keyboard handling inside editor
  document.addEventListener('keydown', (e) => {
    if (!$('#view-editor').classList.contains('active')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'Escape') { setMode('NORMAL'); return; }
    if (mode === 'NORMAL') {
      if (k === 'i' || k === 'a') { setMode('INSERT'); bump(); e.preventDefault(); return; }
      if (k === 'o') { setMode('INSERT'); bump(); e.preventDefault(); return; }
      if (k === 'v') { setMode('VISUAL'); bump(); e.preventDefault(); return; }
      if (k === 'j') { move(1); e.preventDefault(); return; }
      if (k === 'k') { move(-1); e.preventDefault(); return; }
      if (k === 'x') { dropNoiseOnLine(); bump(); e.preventDefault(); return; }
      if (k === 'h') { hmove(-1); e.preventDefault(); return; }
      if (k === 'l') { hmove(1); e.preventDefault(); return; }
    } else {
      bump();
    }
  });
  function bump() { keys++; $('#hud-keys').textContent = keys; }
  function move(d) {
    const max = current.corrupt.length - 1;
    curLine = Math.max(0, Math.min(max, curLine + d));
    curCol = clampCol(curLine, curCol);
    highlightLine(curLine); placeCaret(curLine, curCol); bump();
  }
  function hmove(d) {
    curCol = clampCol(curLine, curCol + d);
    placeCaret(curLine, curCol); bump();
  }
  function dropNoiseOnLine() {
    const ln = $('#ed-code .ln[data-i="' + curLine + '"]');
    if (!ln) return;
    const n = ln.querySelector('.noise');
    if (n) {
      n.classList.add('clearing');
      setTimeout(() => { n.remove(); updateNoise(); }, 480);
    }
  }

  // Submit
  $('#ed-submit').addEventListener('click', () => {
    if (mode !== 'NORMAL') { showFail(); return; }
    const spans = $$('#ed-code .noise');
    $('#ed-submit').disabled = true;
    stopTimer();
    if (!spans.length) { succeed(); return; }
    spans.forEach((s, i) => setTimeout(() => s.classList.add('clearing'), i * 18));
    const total = spans.length * 18 + 540;
    setTimeout(() => {
      spans.forEach(s => s.remove());
      updateNoise();
      succeed();
    }, total);
  });

  /* ---------- RESULT MODAL ---------- */
  function succeed() {
    const m = current;
    const time = +((performance.now() - t0) / 1000).toFixed(1);
    const k = Math.max(keys, 1);
    const card = $('#result-card'); card.classList.remove('fail');
    $('#sb-hud').classList.remove('on');
    $('#result-verdict').innerHTML = '<span class="tick">✓</span>SIGNAL RESTORED';
    $('#result-title').textContent = m.title;
    $('#rm-time').textContent = time + 's';
    $('#rm-keys').textContent = k;
    $('#rm-acc').textContent = '100%';
    $('#rm-acc-best').textContent = 'signal clean';

    if (m.sandbox) {
      const diff = (m.title.split('· ')[1] || '').trim();
      const key = 'pb_RAVEN_' + diff;
      const pb = state[key];
      const best = pb ? Math.min(pb, time) : time;
      const isPB = !pb || time < pb;
      state[key] = best; save();
      $('#result-xp').textContent = time + 's';
      $('#result-lock').textContent = isPB ? '◆ NEW PERSONAL BEST' : 'RUN CLEAN · RAVEN';
      $('#rm-time-best').textContent = 'PB ' + best.toFixed(1) + 's';
      $('#rm-keys-best').textContent = '—';
      $('#result-levelup').hidden = true;
      openModal();
      return;
    }

    const prev = state.done[m.id];
    $('#result-xp').textContent = '+' + (prev ? 0 : m.xp);
    $('#result-lock').textContent = prev ? 'ALREADY CLEARED · TIME LOGGED' : 'XP LOCKED IN';
    const bestTime = prev ? Math.min(prev.time, time) : time;
    const bestKeys = prev ? Math.min(prev.keys, k) : k;
    $('#rm-time-best').textContent = 'best ' + bestTime.toFixed(1) + 's';
    $('#rm-keys-best').textContent = 'best ' + bestKeys;

    const willLevel = !prev && state.xp < LEVEL_XP && (state.xp + m.xp) >= LEVEL_XP;
    $('#result-levelup').hidden = !willLevel;
    if (willLevel) $('#result-rank').textContent = RANKS[1];

    if (!prev) { state.xp += m.xp; state.streak += 1; xpJustGained = true; }
    state.done[m.id] = { time: bestTime, keys: bestKeys };
    state.fastest = state.fastest ? Math.min(state.fastest, bestTime) : bestTime;
    save();

    cue();
    openModal();
  }
  function showFail() {
    const card = $('#result-card'); card.classList.add('fail');
    const remain = $$('#ed-code .noise').length;
    $('#result-verdict').innerHTML = '✗ TRANSMISSION STILL CORRUPTED';
    $('#result-title').textContent = 'You verified mid-edit — drop to NORMAL first';
    $('#result-xp').textContent = remain;
    $('#result-xp').style.color = 'var(--red)';
    $('#result-lock').textContent = 'FRAGMENTS REMAINING';
    $('#rm-time').textContent = ((performance.now() - t0) / 1000).toFixed(1) + 's';
    $('#rm-keys').textContent = keys;
    $('#rm-acc').textContent = '—';
    $('#rm-time-best').textContent = 'still running';
    $('#rm-keys-best').textContent = '';
    $('#rm-acc-best').textContent = 'press ESC, then retry';
    $('#result-levelup').hidden = true;
    openModal(true);
  }
  let lastFail = false;
  function openModal(fail) {
    lastFail = !!fail;
    $('#result-next').textContent = fail ? 'Retry →' : (current && current.sandbox ? 'Run Again →' : 'Next Mission →');
    const bd = $('#result'), card = $('#result-card');
    bd.classList.add('open');
    // restart entrance animation now that the backdrop is displayed
    card.classList.remove('enter'); void card.offsetWidth; card.classList.add('enter');
    $('#result-next').focus();
  }
  function closeModal() { $('#result').classList.remove('open'); $('#result-xp').style.color = ''; }

  $('#result-review').addEventListener('click', () => { closeModal(); $('#ed-submit').disabled = false; startTimer(); });
  $('#result-next').addEventListener('click', () => {
    closeModal();
    if (lastFail) { setMode('NORMAL'); $('#ed-submit').disabled = false; startTimer(); return; }
    if (current && current.sandbox) { go('sandbox'); return; }
    const idx = ORDER.indexOf(current);
    const nxt = ORDER.slice(idx + 1).find(m => !m.tierLocked);
    if (nxt) openBriefing(nxt); else go('nexus');
  });
  $('#result-nexus').addEventListener('click', () => { closeModal(); go('nexus'); });
  $('#result').addEventListener('click', (e) => { if (e.target.id === 'result') closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#result').classList.contains('open')) closeModal(); });

  /* ---------- SANDBOX ---------- */
  function updateSandboxPB() {
    $$('.sb-tile').forEach(t => {
      const pb = state['pb_RAVEN_' + t.dataset.diff];
      const el = t.querySelector('.pb b');
      if (el) el.textContent = pb ? pb.toFixed(1) + 's' : '—';
    });
  }
  $$('.sb-tile').forEach(t => t.addEventListener('click', () => {
    // open a sandbox run reusing the editor on a generic transmission
    const diff = t.dataset.diff;
    const lines = corrupt(cleanGeneric('RAVEN ' + diff, 'free-play restoration'), diff === 'EASY' ? 3 : diff === 'NORMAL' ? 7 : 13);
    const m = { id: 'RAVEN', title: 'RAVEN SANDBOX · ' + diff, xp: 0, corrupt: lines, file: 'RAVEN-' + diff + '-LIVE', sandbox: true };
    openEditor(m);
  }));

  /* ---------- AUDIO ---------- */
  const audioBtn = $('#audio-toggle');
  function renderAudio() {
    audioBtn.classList.toggle('on', state.audio);
    audioBtn.setAttribute('aria-pressed', state.audio);
    $('#audio-label').textContent = state.audio ? 'AUDIO ON' : 'AUDIO OFF';
    $('#audio-glyph').textContent = state.audio ? '♪' : '♪';
  }
  audioBtn.addEventListener('click', () => { state.audio = !state.audio; save(); renderAudio(); flashCue(audioBtn); });
  renderAudio();
  if (!state.onboarded) {
    const h = $('#audio-hint'); h.hidden = false;
    $('#audio-hint-x').addEventListener('click', () => { h.hidden = true; state.onboarded = true; save(); });
    setTimeout(() => { if (!h.hidden) { h.hidden = true; state.onboarded = true; save(); } }, 9000);
  }
  // visual pendant for any cue (always fires, even silent)
  function cue() { /* success pendant handled by modal settle ring */ }
  function flashCue(el) {
    el.animate([{ filter: 'brightness(2)' }, { filter: 'brightness(1)' }], { duration: 420, easing: 'ease-out' });
  }

  /* ---------- TWEAKS ---------- */
  const root = document.documentElement;
  function applyTweaks() {
    const tw = state.tw;
    root.style.setProperty('--green-h', tw.hue);
    root.style.setProperty('--glow', tw.glow);
    root.style.setProperty('--bloom', tw.bloom);
    root.style.setProperty('--scan', tw.scan);
    root.style.setProperty('--vignette', tw.vig);
    document.body.classList.toggle('motion-off', tw.motion === 'off');
    document.body.classList.toggle('mono', tw.mono === 'on');
    document.body.classList.remove('font-vt', 'font-jb');
    if (tw.font === 'vt') document.body.classList.add('font-vt');
    if (tw.font === 'jb') document.body.classList.add('font-jb');
    $('#tw-hue').value = tw.hue; $('#tv-hue').textContent = tw.hue;
    $('#tw-glow').value = tw.glow; $('#tv-glow').textContent = (+tw.glow).toFixed(1);
    $('#tw-bloom').value = tw.bloom; $('#tv-bloom').textContent = (+tw.bloom).toFixed(1);
    $('#tw-scan').value = tw.scan; $('#tv-scan').textContent = (+tw.scan).toFixed(2);
    $('#tw-vig').value = tw.vig; $('#tv-vig').textContent = (+tw.vig).toFixed(2);
    $$('#tw-motion button').forEach(b => b.classList.toggle('on', b.dataset.motion === tw.motion));
    $$('#tw-mono button').forEach(b => b.classList.toggle('on', b.dataset.mono === tw.mono));
    $$('#tw-font button').forEach(b => b.classList.toggle('on', b.dataset.font === tw.font));
  }
  function wire(id, key, fmt) {
    $('#tw-' + id).addEventListener('input', function () {
      state.tw[key] = parseFloat(this.value); save(); applyTweaks();
    });
  }
  wire('hue', 'hue'); wire('glow', 'glow'); wire('bloom', 'bloom'); wire('scan', 'scan'); wire('vig', 'vig');
  $$('#tw-motion button').forEach(b => b.addEventListener('click', () => { state.tw.motion = b.dataset.motion; save(); applyTweaks(); }));
  $$('#tw-mono button').forEach(b => b.addEventListener('click', () => { state.tw.mono = b.dataset.mono; save(); applyTweaks(); }));
  $$('#tw-font button').forEach(b => b.addEventListener('click', () => { state.tw.font = b.dataset.font; save(); applyTweaks(); }));
  applyTweaks();

  const panel = $('#tweaks');
  window.addEventListener('message', e => {
    if (e.data && e.data.type === '__activate_edit_mode') panel.classList.add('visible');
    if (e.data && e.data.type === '__deactivate_edit_mode') panel.classList.remove('visible');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
  $('#tweaks-close').addEventListener('click', () => { panel.classList.remove('visible'); try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {} });
  document.addEventListener('keydown', e => { if ((e.key === 't' || e.key === 'T') && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) panel.classList.toggle('visible'); });

  /* ---------- welcome ENTER ---------- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !$('#boot') && $('#view-welcome').classList.contains('active')) go('nexus');
  });

  /* ---------- boot intro ---------- */
  function bootSeq() {
    const boot = $('#boot'); if (!boot) return;
    const pre = $('#boot-pre');
    const reduced = state.tw.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = () => {
      const w = $('#view-welcome'); w.classList.add('reveal');
      setTimeout(() => w.classList.remove('reveal'), 1300);
    };
    const finish = () => {
      boot.classList.add('gone');
      setTimeout(() => boot.remove(), 520);
      reveal();
    };
    if (reduced || sessionStorage.getItem('nv_booted')) { boot.remove(); return; }
    sessionStorage.setItem('nv_booted', '1');
    const lines = [
      ['> establishing shadow link ', 'ok'],
      ['> spoofing CORP credentials ', 'ok'],
      ['> phosphor layer ', 'engaged'],
      ['> CIPHER handshake ', 'live'],
      ['> operative console ready', '']
    ];
    let done = false, li = 0, ci = 0, txt = '';
    const skip = () => { if (done) return; done = true; finish(); };
    boot.addEventListener('click', skip);
    const onKey = () => { skip(); document.removeEventListener('keydown', onKey); };
    document.addEventListener('keydown', onKey);
    function tick() {
      if (done) return;
      if (li >= lines.length) { done = true; pre.innerHTML = txt + '<span class="bcur"></span>'; setTimeout(finish, 460); return; }
      const label = lines[li][0], ok = lines[li][1];
      if (ci <= label.length) {
        pre.innerHTML = txt + label.slice(0, ci) + '<span class="bcur"></span>';
        ci++; setTimeout(tick, 13);
      } else {
        const dots = ok ? '.'.repeat(Math.max(1, 30 - label.length)) : '';
        txt += label + dots + (ok ? ' <span class="ok">' + ok + '</span>' : '') + '\n';
        li++; ci = 0; setTimeout(tick, ok ? 95 : 30);
      }
    }
    tick();
  }

  /* ---------- boot ---------- */
  go('welcome');
  bootSeq();
})();

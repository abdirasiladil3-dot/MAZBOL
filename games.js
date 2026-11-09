// Блиц-игры. Слова берутся из уроков курса (задания «найдите пары»), поэтому новые уроки сами пополняют игры.
// Каждая игра: { id, title, desc, icon, run(A) }, где A — помощник из app.js (A.pool, A.body, A.hud, A.finish, ...).
(function () {
  const I = window.I18N.en;
  Object.assign(I, {
    'Игры': 'Games', 'Блиц-игры на словах курса': 'Quick games with course words', 'Лучший результат': 'Best score', 'Играть': 'Play',
    'Блиц на время': 'Timed blitz', '60 секунд: выберите как можно больше верных переводов': '60 seconds: pick as many correct translations as you can',
    'Карточки на память': 'Memory cards', 'Найдите пары: казахское слово и перевод': 'Find the pairs: a Kazakh word and its translation',
    'Собери слово': 'Build the word', 'Составьте казахское слово из букв': 'Make a Kazakh word from letters',
    'Найди лишнее': 'Odd one out', 'Какое слово не подходит к остальным?': 'Which word does not belong with the others?',
    'Верно или неверно': 'True or false', 'Правильный ли это перевод?': 'Is this translation correct?',
    'Работа над ошибками': 'Review mistakes', 'Повторите слова, в которых были ошибки': 'Repeat the words you got wrong',
    'Верно': 'True', 'Неверно': 'False', 'Какое слово лишнее?': 'Which word is the odd one out?',
    'Составьте слово из букв': 'Make the word from the letters', 'Игра окончена': 'Game over', 'Результат': 'Score',
    'Ошибок нет — отлично! Сыграйте в другие игры, и здесь появятся слова для повторения.': 'No mistakes — great! Play other games and words to review will appear here.',
    'сек': 'sec', 'ходов': 'moves'
  });

  const T = (s) => (window.APP_T ? window.APP_T(s) : s);
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const distract = (A, w, n) => {
    const seen = new Set([w.v]), out = [];
    A.shuffle(A.pool).forEach(x => { if (out.length < n && !seen.has(x.v)) { seen.add(x.v); out.push(x.v); } });
    return out;
  };
  const mark = (btn, ok) => btn.classList.add(ok ? 'ok' : 'bad');

  // ---- Блиц на время ----
  function blitz(A) {
    let score = 0, time = 60, cur, locked = false, over = false;
    const hud = () => A.hud(time + ' ' + A.T('сек') + ' · ' + score);
    const next = () => {
      locked = false; cur = rnd(A.pool);
      const options = A.shuffle([cur.v, ...distract(A, cur, 3)]);
      A.body.innerHTML = `<div class="gword">${A.esc(cur.k)}</div><div class="opts" id="o"></div>`;
      options.forEach(o => {
        const b = A.el(`<button class="opt">${A.esc(o)}</button>`);
        b.onclick = () => {
          if (locked || over) return; locked = true;
          const ok = o === cur.v; A.beep(ok); mark(b, ok);
          if (ok) { score++; A.solved(cur.k); } else { A.mistake(cur.k); [...A.body.querySelectorAll('.opt')].forEach(x => { if (x.textContent === cur.v) x.classList.add('ok'); }); }
          hud(); setTimeout(() => { if (!over) next(); }, ok ? 200 : 700);
        };
        A.body.querySelector('#o').appendChild(b);
      });
    };
    A.timer(() => {
      time--; hud();
      if (time <= 0) { over = true; A.stop(); A.finish({ score, xp: Math.min(20, score), label: A.T('Результат') + ': ' + score }); }
    }, 1000);
    hud(); next();
  }

  // ---- Карточки на память ----
  function memory(A) {
    const pairs = A.shuffle(A.pool).slice(0, 6);
    const cards = A.shuffle(pairs.flatMap((p, i) => [{ id: i, t: p.k, k: p.k }, { id: i, t: p.v, k: p.k }]));
    let open = [], matched = 0, moves = 0, lock = false;
    A.body.innerHTML = '<div class="memgrid" id="g"></div>';
    const grid = A.body.querySelector('#g');
    A.hud('0 ' + A.T('ходов'));
    cards.forEach(c => {
      const b = A.el(`<button class="mem"><span>${A.esc(c.t)}</span></button>`);
      b.onclick = () => {
        if (lock || b.classList.contains('up') || b.classList.contains('done')) return;
        b.classList.add('up'); open.push([c, b]);
        if (open.length < 2) return;
        moves++; A.hud(moves + ' ' + A.T('ходов'));
        const [[c1, b1], [c2, b2]] = open; open = [];
        if (c1.id === c2.id) {
          A.beep(true); b1.classList.add('done'); b2.classList.add('done'); matched++;
          if (matched === pairs.length) setTimeout(() => A.finish({ score: Math.max(1, 30 - moves), xp: Math.max(5, 20 - (moves - 6) * 2), label: moves + ' ' + A.T('ходов') }), 500);
        } else {
          A.beep(false); lock = true;
          setTimeout(() => { b1.classList.remove('up'); b2.classList.remove('up'); lock = false; }, 800);
        }
      };
      grid.appendChild(b);
    });
  }

  // ---- Собери слово ----
  function letters(A) {
    const words = A.shuffle(A.pool.filter(w => !/\s/.test(w.k) && w.k.length >= 3 && w.k.length <= 8)).slice(0, 6);
    let i = 0, score = 0;
    const round = () => {
      if (i >= words.length) return A.finish({ score, xp: 3 + score * 2, label: A.T('Результат') + ': ' + score + '/' + words.length });
      const w = words[i]; let slipped = false, chosen = [];
      let lt = [...w.k]; for (let t = 0; t < 5 && lt.join('') === w.k; t++) lt = A.shuffle(lt);
      A.hud((i + 1) + '/' + words.length);
      A.body.innerHTML = `<h1>${A.esc(A.T('Составьте слово из букв'))}</h1><div class="prompt">${A.esc(w.v)}</div><div class="answerbox" id="ab"></div><div class="tiles" id="lt"></div>`;
      const ab = A.body.querySelector('#ab'), pool = A.body.querySelector('#lt');
      const draw = () => {
        ab.innerHTML = ''; pool.innerHTML = '';
        chosen.forEach((idx, pos) => { const t = A.el(`<button class="tile">${A.esc(lt[idx])}</button>`); t.onclick = () => { chosen.splice(pos, 1); draw(); }; ab.appendChild(t); });
        lt.forEach((ch, idx) => {
          const used = chosen.includes(idx);
          const t = A.el(`<button class="tile" ${used ? 'style="opacity:.25;pointer-events:none"' : ''}>${A.esc(ch)}</button>`);
          t.onclick = () => { chosen.push(idx); draw(); if (chosen.length === lt.length) check(); };
          pool.appendChild(t);
        });
      };
      const check = () => {
        const ok = chosen.map(x => lt[x]).join('') === w.k; A.beep(ok);
        if (ok) { if (!slipped) score++; A.solved(w.k); i++; setTimeout(round, 500); }
        else { slipped = true; A.mistake(w.k); setTimeout(() => { chosen = []; draw(); }, 450); }
      };
      draw();
    };
    round();
  }

  // ---- Найди лишнее ----
  function odd(A) {
    const byL = {}; A.pool.forEach(w => (byL[w.l] = byL[w.l] || []).push(w));
    const groups = Object.values(byL).filter(g => g.length >= 3);
    let i = 0, score = 0; const N = 6;
    const round = () => {
      if (i >= N) return A.finish({ score, xp: 3 + score * 2, label: A.T('Результат') + ': ' + score + '/' + N });
      const g1 = rnd(groups); let g2 = rnd(groups); for (let t = 0; t < 10 && g2 === g1; t++) g2 = rnd(groups);
      const three = A.shuffle(g1).slice(0, 3), odd1 = rnd(g2);
      const tiles = A.shuffle([...three, odd1]);
      A.hud((i + 1) + '/' + N);
      A.body.innerHTML = `<h1>${A.esc(A.T('Какое слово лишнее?'))}</h1><div class="opts" id="o"></div>`;
      let locked = false;
      tiles.forEach(w => {
        const b = A.el(`<button class="opt"><b>${A.esc(w.k)}</b><br><small>${A.esc(w.v)}</small></button>`);
        b.onclick = () => {
          if (locked) return; locked = true;
          const ok = w === odd1; A.beep(ok); mark(b, ok);
          if (ok) score++; else { A.mistake(w.k); [...A.body.querySelectorAll('.opt')].forEach((x, n) => { if (tiles[n] === odd1) x.classList.add('ok'); }); }
          i++; setTimeout(round, ok ? 400 : 900);
        };
        A.body.querySelector('#o').appendChild(b);
      });
    };
    round();
  }

  // ---- Верно или неверно ----
  function truefalse(A) {
    let i = 0, score = 0; const N = 10;
    const round = () => {
      if (i >= N) return A.finish({ score, xp: 3 + score, label: A.T('Результат') + ': ' + score + '/' + N });
      const w = rnd(A.pool), truth = Math.random() < 0.5;
      const shown = truth ? w.v : (distract(A, w, 1)[0] || w.v);
      const isTrue = shown === w.v;
      A.hud((i + 1) + '/' + N);
      A.body.innerHTML = `<h1>${A.esc(A.T('Правильный ли это перевод?'))}</h1><div class="gword">${A.esc(w.k)}</div><div class="prompt" style="text-align:center">= ${A.esc(shown)}</div><div class="opts" id="o"></div>`;
      let locked = false;
      [[true, 'Верно'], [false, 'Неверно']].forEach(([val, label]) => {
        const b = A.el(`<button class="opt" style="text-align:center">${A.esc(A.T(label))}</button>`);
        b.onclick = () => {
          if (locked) return; locked = true;
          const ok = val === isTrue; A.beep(ok); mark(b, ok);
          if (ok) score++; else A.mistake(w.k);
          i++; setTimeout(round, ok ? 350 : 800);
        };
        A.body.querySelector('#o').appendChild(b);
      });
    };
    round();
  }

  // ---- Работа над ошибками ----
  function review(A) {
    const list = A.shuffle(A.getMistakes().map(k => A.pool.find(w => w.k === k)).filter(Boolean)).slice(0, 10);
    if (!list.length) { A.body.innerHTML = `<div class="center"><div class="big">${A.ic('check', 80, 'var(--blue)')}</div><h1>${A.esc(A.T('Ошибок нет — отлично! Сыграйте в другие игры, и здесь появятся слова для повторения.'))}</h1></div>`; return; }
    let i = 0, score = 0;
    const round = () => {
      if (i >= list.length) return A.finish({ score, xp: Math.min(15, score * 2), label: A.T('Результат') + ': ' + score + '/' + list.length });
      const w = list[i]; A.hud((i + 1) + '/' + list.length);
      A.body.innerHTML = `<div class="gword">${A.esc(w.k)}</div><div class="opts" id="o"></div>`;
      let locked = false;
      A.shuffle([w.v, ...distract(A, w, 3)]).forEach(o => {
        const b = A.el(`<button class="opt">${A.esc(o)}</button>`);
        b.onclick = () => {
          if (locked) return; locked = true;
          const ok = o === w.v; A.beep(ok); mark(b, ok);
          if (ok) { score++; A.solved(w.k); } else [...A.body.querySelectorAll('.opt')].forEach(x => { if (x.textContent === w.v) x.classList.add('ok'); });
          i++; setTimeout(round, ok ? 350 : 900);
        };
        A.body.querySelector('#o').appendChild(b);
      });
    };
    round();
  }

  window.GAMES = [
    { id: 'blitz', icon: 'bolt', title: 'Блиц на время', desc: '60 секунд: выберите как можно больше верных переводов', run: blitz },
    { id: 'memory', icon: 'cards', title: 'Карточки на память', desc: 'Найдите пары: казахское слово и перевод', run: memory },
    { id: 'letters', icon: 'abc', title: 'Собери слово', desc: 'Составьте казахское слово из букв', run: letters },
    { id: 'odd', icon: 'eye', title: 'Найди лишнее', desc: 'Какое слово не подходит к остальным?', run: odd },
    { id: 'tf', icon: 'scale', title: 'Верно или неверно', desc: 'Правильный ли это перевод?', run: truefalse },
    { id: 'review', icon: 'repeat', title: 'Работа над ошибками', desc: 'Повторите слова, в которых были ошибки', run: review }
  ];
})();

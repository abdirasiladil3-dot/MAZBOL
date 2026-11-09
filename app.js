(function () {
  const app = document.getElementById('app');
  const KEY = 'qazaq_progress_v1';
  // Все 42 буквы казахского алфавита (кириллица)
  const LETTERS = 'а ә б в г ғ д е ё ж з и й к қ л м н ң о ө п р с т у ұ ү ф х һ ц ч ш щ ъ ы і ь э ю я'.split(' ');

  // Окно подтверждения на странице (системный confirm() в некоторых браузерах блокируется)
  function ask(text, onYes) {
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `<div class="box"><p>${esc(text)}</p>
      <div class="row"><button class="btn gray" data-a="no">${esc(T('Назад'))}</button>
      <button class="btn red" data-a="yes">${esc(T('Выйти'))}</button></div></div>`;
    m.onclick = (e) => {
      const a = e.target.dataset && e.target.dataset.a;
      if (a === 'yes') { m.remove(); onYes(); } else if (a === 'no' || e.target === m) m.remove();
    };
    document.body.appendChild(m);
  }

  // ---------- иконки (собственные SVG) ----------
  const ICONS = {
    // линейные
    lock: '<rect x="11" y="22" width="26" height="19" rx="6"/><path d="M17 22v-5a7 7 0 0 1 14 0v5"/><circle cx="24" cy="31" r="2.6" fill="currentColor"/>',
    check: '<path d="M11 25l9 9 17-20"/>',
    greet: '<path d="M10 10h28a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H25l-9 8v-8h-6a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z"/><path d="M16 21h16"/>',
    howareyou: '<circle cx="24" cy="24" r="17"/><path d="M16 28c2 5 14 5 16 0"/><circle cx="18" cy="20" r="1.8" fill="currentColor"/><circle cx="30" cy="20" r="1.8" fill="currentColor"/>',
    pronouns: '<circle cx="24" cy="16" r="7"/><path d="M9 41c0-9 6-14 15-14s15 5 15 14"/>',
    numbers: '<path d="M10 17l5-4v22M22 17a4 4 0 0 1 8 0c0 5-8 9-8 18h8M34 14h7l-4 8c3 0 5 2 5 5s-2 6-6 6"/>',
    family: '<circle cx="14" cy="15" r="5"/><circle cx="34" cy="15" r="5"/><circle cx="24" cy="28" r="4"/><path d="M5 38c0-6 4-9 9-9M43 38c0-6-4-9-9-9M16 43c0-5 3-7 8-7s8 2 8 7"/>',
    globe: '<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c-8 8-8 26 0 34M24 7c8 8 8 26 0 34"/>',
    coin: '<circle cx="24" cy="24" r="19"/><path d="M24 13v22M18 19h12M18 29h12" stroke="#7a5a00" stroke-width="3.500" fill="none" stroke-linecap="round"/>',
    bolt: '<path d="M27 5L10 27h12l-2 16 18-24H26z"/>',
    cards: '<rect x="6" y="12" width="22" height="28" rx="4"/><rect x="20" y="8" width="22" height="28" rx="4"/>',
    abc: '<path d="M5 36l8-22 8 22M8 29h10M28 14v22h8a5 5 0 0 0 0-10h-8"/>',
    eye: '<path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24z"/><circle cx="24" cy="24" r="6"/>',
    scale: '<path d="M24 8v32M12 40h24M10 15h28M10 15l-6 13a6 6 0 0 0 12 0zM38 15l-6 13a6 6 0 0 0 12 0z"/>',
    repeat: '<path d="M8 22a14 14 0 0 1 24-8l4 4M40 26a14 14 0 0 1-24 8l-4-4M36 8v10H26M12 40V30h10"/>',
    book: '<path d="M6 10h13a5 5 0 0 1 5 5v24a4 4 0 0 0-4-4H6zM42 10H29a5 5 0 0 0-5 5v24a4 4 0 0 1 4-4h14z"/>',
    mountain: '<path d="M4 40l14-24 8 12 6-8 12 20z"/><path d="M14 22l4-6 4 6"/>',
    cloud: '<path d="M14 34a8 8 0 0 1-1-16 11 11 0 0 1 21 2 7 7 0 0 1 0 14z"/><path d="M18 41l2-4M26 41l2-4M34 41l2-4"/>',
    ruler: '<rect x="5" y="16" width="38" height="16" rx="4"/><path d="M13 16v6M21 16v9M29 16v6M37 16v9"/>',
    compass: '<circle cx="24" cy="24" r="17"/><path d="M31 17l-4 10-10 4 4-10z"/>',
    building: '<path d="M8 41V20l8-5 8 5v21M24 41V12h16v29M4 41h40"/><path d="M30 20h4M30 27h4M30 34h4"/>',
    bus: '<rect x="7" y="9" width="34" height="28" rx="6"/><path d="M7 24h34M16 37v5M32 37v5"/><circle cx="15" cy="30" r="1.800" fill="currentColor"/><circle cx="33" cy="30" r="1.800" fill="currentColor"/>',
    clock: '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l8 5"/>',
    verb: '<path d="M8 24h28M26 14l10 10-10 10"/>',
    bag: '<path d="M10 17h28l3 24H7z"/><path d="M17 17v-4a7 7 0 0 1 14 0v4"/>',
    plane: '<path d="M42 8L6 22l12 5 5 12z"/><path d="M18 27l24-19"/>',
    briefcase: '<rect x="6" y="15" width="36" height="25" rx="5"/><path d="M17 15v-4h14v4M6 26h36"/>',
    hand: '<path d="M16 28V12a3 3 0 0 1 6 0v10V9a3 3 0 0 1 6 0v13V12a3 3 0 0 1 6 0v18c0 8-5 12-11 12-7 0-10-4-13-9l-4-7a3 3 0 0 1 5-3z"/>',
    food: '<path d="M24 15c-6-4-15 0-15 10 0 9 6 17 11 17 2 0 2-1 4-1s2 1 4 1c5 0 11-8 11-17 0-10-9-14-15-10z"/><path d="M24 15c0-4 2-7 6-9"/>',
    colors: '<path d="M24 7C14 7 6 14 6 24s8 17 14 17c3.500 0 3-3 1-5s0-5 3-5h6c6 0 12-3 12-8 0-8-8-16-18-16z"/><circle cx="16" cy="22" r="2" fill="currentColor"/><circle cx="23" cy="15" r="2" fill="currentColor"/><circle cx="32" cy="18" r="2" fill="currentColor"/>',
    days: '<rect x="7" y="11" width="34" height="30" rx="6"/><path d="M7 21h34M16 7v8M32 7v8"/><circle cx="17" cy="30" r="1.8" fill="currentColor"/><circle cx="24" cy="30" r="1.8" fill="currentColor"/><circle cx="31" cy="30" r="1.8" fill="currentColor"/>',
    animals: '<path d="M24 25c-6 0-12 6-12 11 0 4 5 4 12 4s12 0 12-4c0-5-6-11-12-11z"/><circle cx="11" cy="22" r="3.500"/><circle cx="19" cy="13" r="3.500"/><circle cx="29" cy="13" r="3.500"/><circle cx="37" cy="22" r="3.500"/>',
    plural: '<rect x="6" y="14" width="22" height="22" rx="6"/><rect x="20" y="12" width="22" height="22" rx="6"/>',
    tobe: '<path d="M9 11h13a4 4 0 1 1 8 0h9v12a4 4 0 1 0 0 8v10H9z"/>',
    myyour: '<rect x="5" y="11" width="38" height="26" rx="6"/><circle cx="17" cy="23" r="4"/><path d="M10 33c1-4 4-5 7-5s6 1 7 5M28 21h10M28 28h7"/>',
    questions: '<path d="M16 18a8 8 0 1 1 11 7c-2 1-3 3-3 5"/><circle cx="24" cy="38" r="1.800" fill="currentColor"/>',
    sound: '<path d="M8 19h7l9-7v24l-9-7H8z" fill="currentColor"/><path d="M31 18c3 3 3 9 0 12M36 13c6 6 6 16 0 22"/>',
    camera: '<path d="M7 15h7l3-5h14l3 5h7v24H7z"/><circle cx="24" cy="26" r="7"/>',
    logo: '<circle cx="24" cy="24" r="17"/><path d="M24 7v34M7 24h34M12 12c8 8 16 16 24 24M36 12C28 20 20 28 12 36"/>',
    // залитые
    flame: '<path d="M24 5c2 9 11 13 11 24a11 11 0 0 1-22 0c0-5 3-9 6-12 0 3 2 5 4 5-1-6 0-11 1-17z"/>',
    star: '<path d="M24 5l6 13 14 1-11 10 3 14-12-7-12 7 3-14L4 19l14-1z"/>',
    heart: '<path d="M24 41S7 30 7 19a8.500 8.500 0 0 1 17-3 8.500 8.500 0 0 1 17 3c0 11-17 22-17 22z"/>',
    brokenheart: '<path d="M24 41S7 30 7 19a8.500 8.500 0 0 1 17-3 8.500 8.500 0 0 1 17 3c0 11-17 22-17 22z"/><path d="M24 16l-5 7 7 4-4 8" stroke="#0f1519" stroke-width="3" fill="none"/>',
    trophy: '<path d="M14 7h20v12a10 10 0 0 1-20 0z"/><path d="M14 11H7v4a7 7 0 0 0 7 7M34 11h7v4a7 7 0 0 1-7 7M24 29v8M15 42h18" stroke="currentColor" stroke-width="3.500" fill="none" stroke-linecap="round"/>'
  };
  const FILLED = ['coin', 'flame', 'star', 'heart', 'brokenheart', 'trophy', 'sound'];
  const LESSON_ICON = { greet: 'greet', howareyou: 'howareyou', pronouns: 'pronouns', numbers: 'numbers', family: 'family', food: 'food', colors: 'colors', days: 'days', animals: 'animals', plural: 'plural', 'to-be': 'tobe', 'my-your': 'myyour', questions: 'questions',
    nature: 'mountain', weather: 'cloud', adjectives: 'ruler', directions: 'compass', city: 'building', transport: 'bus',
    daytime: 'clock', months1: 'days', months2: 'days', verbs1: 'verb', verbs2: 'verb', shop: 'bag', travel: 'plane',
    professions: 'briefcase', body: 'hand' };
  function ic(name, size, color) {
    const fill = FILLED.includes(name);
    return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" style="color:${color || 'currentColor'};vertical-align:middle;flex:none" ${fill ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"'}>${ICONS[name] || ''}</svg>`;
  }

  // ---------- состояние ----------
  let S = load();
  // Язык обучения: 'ru' (с русского на казахский) или 'en' (с английского на казахский)
  const T = (s) => (S.lang === 'en' && window.I18N && window.I18N.en[s]) || s;
  const tdeep = (v) => typeof v === 'string' ? T(v) : Array.isArray(v) ? v.map(tdeep)
    : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, (k === 'say' || k === 'id') ? x : tdeep(x)])) : v;
  function today() { return new Date().toISOString().slice(0, 10); }
  function load() {
    try { return Object.assign({ xp: 0, streak: 0, last: null, done: [] }, JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return { xp: 0, streak: 0, last: null, done: [] }; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function touchStreak() {
    const t = today();
    if (S.last === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak = S.last === y ? S.streak + 1 : 1;
    S.last = t;
  }

  // ---------- утилиты ----------
  const el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  const shuffle = (a) => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function beep(ok) {
    try {
      const c = new (window.AudioContext || window.webkitAudioContext)();
      const o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.value = ok ? 660 : 200; o.type = ok ? 'sine' : 'sawtooth';
      g.gain.value = 0.08; o.start(); o.stop(c.currentTime + (ok ? 0.15 : 0.3));
    } catch (e) {}
  }

  // ---------- главный экран ----------
  // ---------- регистрация и аватар ----------
  const EMOJIS = ['🦅', '🐺', '🐆', '🐎', '🦌', '🐫', '🦉', '🐻', '🦊', '🐯', '🌙', '⭐'];
  function avatarHtml(p, size, frameKey) {
    const a = p && p.avatar;
    const st = `width:${size}px;height:${size}px;border-radius:50%;background:var(--blue-bg);display:inline-flex;align-items:center;justify-content:center;overflow:hidden;font-size:${Math.round(size * 0.6)}px;border:2px solid var(--blue);vertical-align:middle;${(window.GAMIFY && window.GAMIFY.FRAMES[frameKey || (S.eq && S.eq.frame)]) || ''}`;
    if (a && a.type === 'img') return `<span style="${st}"><img src="${a.v}" style="width:100%;height:100%;object-fit:cover" alt=""></span>`;
    return `<span style="${st}">${a ? a.v : '🦅'}</span>`;
  }
  function profileForm(isNew, draft) {
    const p = draft || S.profile || { name: '', avatar: { type: 'emoji', v: '🦅' } };
    let avatar = Object.assign({}, p.avatar);
    app.innerHTML = '';
    const root = el(`<div class="wrap" style="padding-top:40px">
      <div class="center" style="padding-top:0"><div class="big">${logoHtml(220)}<div class="brandtxt big">Қазақ тілі</div></div>
      <h1>${isNew ? 'Қош келдіңіз! Добро пожаловать' : 'Профиль'}</h1>
      <p>${isNew ? 'Создайте профиль, чтобы сохранять прогресс' : 'Измените имя или аватар'}</p></div>
      <div style="text-align:center;margin:16px 0" id="prev"></div>
      <div class="opts" style="grid-template-columns:repeat(6,1fr)" id="emo"></div>
      <label class="opt" style="display:block;text-align:center;margin-top:12px">${ic('camera', 22)} Загрузить своё фото
        <input type="file" accept="image/*" id="file" hidden></label>
      <div class="opts" id="lang" style="grid-template-columns:1fr 1fr;margin-top:16px"></div>
      <input class="txt" id="name" maxlength="20" placeholder="Ваше имя" style="margin-top:16px" value="${esc(p.name)}">
      <div style="margin-top:20px;display:flex;gap:10px">
        ${isNew ? '' : '<button class="btn red" id="cancel" style="background:var(--gray);box-shadow:0 4px 0 #1d272d;color:var(--text)">Назад</button>'}
        <button class="btn" id="go" style="flex:1">${isNew ? 'Начать' : 'Сохранить'}</button></div>
      ${isNew ? '' : '<p style="text-align:center"><button id="reset" style="background:none;border:0;color:var(--red)">Выйти и стереть прогресс</button></p>'}
    </div>`);
    app.appendChild(root);
    const prev = root.querySelector('#prev'), name = root.querySelector('#name'), go = root.querySelector('#go');
    const refresh = () => { prev.innerHTML = avatarHtml({ avatar }, 96); go.disabled = !name.value.trim(); };
    EMOJIS.forEach(e => {
      const b = el(`<button class="opt" style="text-align:center;padding:8px;font-size:24px">${e}</button>`);
      b.onclick = () => { avatar = { type: 'emoji', v: e }; refresh(); };
      root.querySelector('#emo').appendChild(b);
    });
    [['ru', 'Русский → Қазақша'], ['en', 'English → Қазақша']].forEach(([code, label]) => {
      const b = el(`<button class="opt ${(S.lang === 'en' ? 'en' : 'ru') === code ? 'sel' : ''}" style="text-align:center;padding:10px">${label}</button>`);
      b.onclick = () => { S.lang = code; save(); profileForm(isNew, { name: name.value, avatar }); };
      root.querySelector('#lang').appendChild(b);
    });
    root.querySelector('#file').onchange = (ev) => {
      const f = ev.target.files[0]; if (!f) return;
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = c.height = 128;
        const s = Math.min(img.width, img.height);
        c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 128, 128);
        avatar = { type: 'img', v: c.toDataURL('image/jpeg', 0.8) }; refresh();
      };
      img.src = URL.createObjectURL(f);
    };
    name.oninput = refresh;
    go.onclick = () => { S.profile = { name: name.value.trim(), avatar }; save(); home(); };
    const c = root.querySelector('#cancel'); if (c) c.onclick = home;
    const r = root.querySelector('#reset');
    if (r) r.onclick = () => ask(T('Стереть профиль и весь прогресс?'), () => { S = { xp: 0, streak: 0, last: null, done: [], profile: null, lang: S.lang }; save(); home(); });
    refresh();
  }

  const PLACES = ['Алматы', 'Астана', 'Шымкент', 'Бурабай', 'Чарын', 'Туркестан', 'Кольсай', 'Бозжыра', 'Актау', 'Алтай'];

  // ---------- словарь: все слова курса из заданий «найдите пары», по разделам ----------
  function renderDict(box) {
    const seen = new Set();
    const groups = window.UNITS.map((u, ui) => {
      const words = [];
      u.ids.forEach(id => {
        const l = window.LESSONS.find(x => x.id === id);
        l.exercises.forEach(e => {
          if (e.type !== 'match') return;
          e.pairs.forEach(([k, v]) => {
            if (/→|…/.test(k) || seen.has(k)) return;
            seen.add(k); words.push([k, v]);
          });
        });
      });
      return { u, ui, words };
    });
    const total = groups.reduce((n, g) => n + g.words.length, 0);
    box.innerHTML = `<input class="txt" id="q" placeholder="Поиск слова…" autocomplete="off">
      <p class="dcount">${total} ${esc(T('слов'))}</p><div id="dlist"></div>`;
    const list = box.querySelector('#dlist');
    const draw = () => {
      const q = norm(box.querySelector('#q').value);
      list.innerHTML = '';
      let shown = 0;
      groups.forEach(g => {
        const ws = g.words.filter(([k, v]) => !q || norm(k).includes(q) || norm(v).includes(q) || norm(T(v)).includes(q));
        if (!ws.length) return;
        shown += ws.length;
        const sec = el(`<div class="dsec"><div class="dhead"><div class="scene">${(window.SCENES || [])[g.ui] || ''}</div>
          <div class="dt"><span class="place">${esc(T(PLACES[g.ui] || ''))}</span><h2>${esc(T(g.u.title))}</h2></div></div>
          <div class="dwords"></div></div>`);
        ws.forEach(([k, v]) => sec.querySelector('.dwords').appendChild(el(`<div class="w"><b>${esc(k)}</b><span>${esc(T(v))}</span></div>`)));
        list.appendChild(sec);
      });
      if (!shown) list.appendChild(el(`<p class="dcount">${esc(T('Ничего не найдено'))}</p>`));
    };
    box.querySelector('#q').oninput = draw;
    draw();
  }

  // ---------- блиц-игры (сами игры — в games.js) ----------
  function wordPool() {
    const seen = new Set(), out = [];
    const add = (k, v, li) => { if (!k || !v || /→|…|\?|🔊/.test(k + v) || seen.has(k)) return; seen.add(k); out.push({ k, v: T(v), l: li }); };
    window.LESSONS.forEach((l, li) => l.exercises.forEach(e => {
      if (e.type === 'match') e.pairs.forEach(([k, v]) => add(k, v, li));
    }));
    // слова из заданий «напишите по-казахски» (ответ — казахский, подсказка — перевод)
    window.LESSONS.forEach((l, li) => l.exercises.forEach(e => { if (e.type === 'type') add(e.answer, e.prompt, li); }));
    return out;
  }

  function renderGames(box) {
    // раздел «Работа над ошибками»: слова, в которых были ошибки (в уроках и играх)
    const pool = wordPool();
    const wrong = (S.mistakes || []).map(k => pool.find(w => w.k === k)).filter(Boolean);
    box.innerHTML = `<div class="mbox"><div class="mh"><b>${esc(T('Работа над ошибками'))}</b><span class="badge">${wrong.length}</span></div>
      ${wrong.length ? `<div class="chips">${wrong.slice(0, 24).map(w => `<span class="mchip"><b>${esc(w.k)}</b> ${esc(w.v)}</span>`).join('')}</div>
        <button class="btn" id="mrev">${esc(T('Повторить'))}</button>` : `<p class="miss">${esc(T('Пока ошибок нет — так держать!'))}</p>`}</div>
      <p class="dcount">${esc(T('Блиц-игры на словах курса'))}</p><div class="gamelist" id="gl"></div>`;
    const mrev = box.querySelector('#mrev');
    if (mrev) mrev.onclick = () => startGame(window.GAMES.find(g => g.id === 'review'));
    const best = S.best || {};
    window.GAMES.filter(g => g.id !== 'review').forEach(g => {
      const card = el(`<button class="gcard"><span class="gico">${ic(g.icon, 30, '#06222f')}</span>
        <span class="gtxt"><b>${esc(T(g.title))}</b><span>${esc(T(g.desc))}</span>${best[g.id] ? `<em>${esc(T('Лучший результат'))}: ${best[g.id]}</em>` : ''}</span></button>`);
      card.onclick = () => startGame(g);
      box.querySelector('#gl').appendChild(card);
    });
  }

  function startGame(g) {
    const root = el(`<div class="lesson"><div class="lhead"><button class="close" title="Выйти">✕</button>
      <div class="gtitle">${esc(T(g.title))}</div><span class="ghud"></span></div><div class="lbody"></div></div>`);
    app.appendChild(root);
    const timers = [], body = root.querySelector('.lbody'), hud = root.querySelector('.ghud');
    const stop = () => timers.forEach(clearInterval);
    const leave = () => { stop(); root.remove(); home(); };
    root.querySelector('.close').onclick = () => ask(T('Выйти? Прогресс урока потеряется.'), leave);
    g.run({
      T, el, esc, shuffle, ic, beep, body, stop,
      pool: wordPool(),
      hud: (t) => { hud.textContent = t; },
      timer: (fn, ms) => { const id = setInterval(fn, ms); timers.push(id); return id; },
      getMistakes: () => S.mistakes || [],
      mistake: (k) => { S.mistakes = S.mistakes || []; if (!S.mistakes.includes(k)) S.mistakes.push(k); save(); },
      solved: (k) => { if (S.mistakes && S.mistakes.includes(k)) { S.mistakes = S.mistakes.filter(x => x !== k); save(); } },
      finish: ({ score, xp, label }) => {
        stop();
        touchStreak(); S.xp += xp;
        S.best = S.best || {}; S.best[g.id] = Math.max(S.best[g.id] || 0, score); save();
        root.innerHTML = `<div class="lbody center"><div class="big">${ic('trophy', 96, 'var(--gold)')}</div><h1>${esc(T('Игра окончена'))}</h1><p>${esc(label)}</p>
          <div class="sum"><div>${ic('star', 22, 'var(--gold)')} +${xp} XP</div></div></div>
          <div class="foot"><div class="in"><span></span><button class="btn">Продолжить</button></div></div>`;
        root.querySelector('.btn').onclick = leave;
      }
    });
  }

  // Логотип сайта MƏZBOL (images/logo.png, 500×500): показываем только область с надписью
  function logoHtml(w) {
    // images/logo-mark.png: тот же логотип без бежевого фона, буквы светлые (для тёмного сайта)
    return `<img class="logo" src="images/logo-mark.png" alt="MƏZBOL" style="width:${w}px;height:auto">`;
  }

  // ---------- плакаты разделов (RU / EN) и экран «картинка + слова» перед уроком ----------
  // Если в папке images лежит фото images/s<номер раздела>-<ru|en>.webp (или png/jpg), показывается оно.
  // Иначе сайт сам рисует плакат из слов раздела.
  const photoCache = {};
  function findPhoto(ui, lang, cb) {
    const key = ui + lang;
    if (key in photoCache) return cb(photoCache[key]);
    const exts = ['webp', 'png', 'jpg', 'jpeg']; let i = 0;
    const tryNext = () => {
      if (i >= exts.length) { photoCache[key] = null; return cb(null); }
      const url = `images/s${ui + 1}-${lang}.${exts[i++]}`, im = new Image();
      im.onload = () => { photoCache[key] = url; cb(url); };
      im.onerror = tryNext;
      im.src = url;
    };
    tryNext();
  }

  function lessonRows(l, cap) {
    const curated = window.LESSON_WORDS && window.LESSON_WORDS[l.id];
    if (curated) return curated.slice(0, cap).map(([k, v]) => [k, T(v)]);
    const seen = new Set(), rows = [];
    const add = (k, v) => { const key = String(k).toLowerCase(); if (!k || !v || seen.has(key)) return; seen.add(key); rows.push([k, T(v)]); };
    l.exercises.forEach(e => { if (e.type === 'match') e.pairs.forEach(([k, v]) => add(k, v)); });
    l.exercises.forEach(e => { if (e.type === 'type') add(e.answer, e.prompt); });
    return rows.slice(0, cap);
  }
  const cardHtml = (l, cap, cls) => `<div class="pcard ${cls || ''}"><div class="ptitle">${esc(T(l.title))}</div><table>${
    lessonRows(l, cap).map(([k, v]) => `<tr><td class="kk">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table></div>`;
  const posterTitle = (ui) => `${T('Раздел')} ${ui + 1}. ${T(PLACES[ui])}`;

  function posterHtml(ui) {
    const u = window.UNITS[ui];
    return `<div class="poster"><div class="scene">${(window.SCENES || [])[ui] || ''}</div>
      <div class="pban"><b>${esc(posterTitle(ui))}</b><span>${esc(T(u.desc))}</span></div>
      <div class="pgrid">${u.ids.map(id => cardHtml(window.LESSONS.find(x => x.id === id), 8)).join('')}</div></div>`;
  }

  function openPoster(ui) {
    const v = el(`<div class="pview"><div class="shophead"><button class="close" title="Выйти">✕</button><b>${esc(posterTitle(ui))}</b></div><div class="pbody"><div class="pslot"></div></div></div>`);
    document.body.appendChild(v);
    v.querySelector('.close').onclick = () => v.remove();
    const slot = v.querySelector('.pslot');
    slot.innerHTML = posterHtml(ui);
    findPhoto(ui, S.lang === 'en' ? 'en' : 'ru', (url) => { if (url) slot.innerHTML = `<img class="pimg" src="${url}" alt="${esc(posterTitle(ui))}">`; });
  }

  function showIntro(l) {
    const ui = window.UNITS.findIndex(u => u.ids.includes(l.id));
    const root = el(`<div class="lesson"><div class="lhead"><button class="close" title="Выйти">✕</button><div class="gtitle">${esc(T(l.title))}</div></div>
      <div class="lbody"><p class="miss">${esc(T('Сначала посмотрите картинку и слова, потом выполняйте задания.'))}</p>
        <div class="introimg"></div>${cardHtml(l, 14, 'big')}
        <button class="pbtn" id="allp">${ic('eye', 18)} ${esc(T('Постер раздела'))}</button></div>
      <div class="foot"><div class="in"><span></span><button class="btn">${esc(T('Начать урок'))}</button></div></div></div>`);
    app.appendChild(root);
    const slot = root.querySelector('.introimg');
    slot.innerHTML = `<div class="pbanner"><div class="scene">${(window.SCENES || [])[ui] || ''}</div><div class="pban small"><b>${esc(posterTitle(ui))}</b></div></div>`;
    findPhoto(ui, S.lang === 'en' ? 'en' : 'ru', (url) => { if (url) slot.innerHTML = `<img class="pimg" src="${url}" alt="${esc(posterTitle(ui))}">`; });
    root.querySelector('.close').onclick = () => root.remove();
    root.querySelector('#allp').onclick = () => openPoster(ui);
    root.querySelector('.foot .btn').onclick = () => { root.remove(); startLesson(l); };
  }

  function fix() {
    S.xp = S.xp || 0; S.coins = S.coins || 0; S.res = S.res || {}; S.owned = S.owned || [];
    S.eq = S.eq || {}; S.mistakes = S.mistakes || []; S.daily = S.daily || { d: '', n: 0 };
  }
  const DAILY_GOAL = 2;
  const starsFor = (m) => m === 0 ? 3 : m <= 2 ? 2 : 1;
  const starsHtml = (n, size) => [1, 2, 3].map(i => ic('star', size, i <= n ? 'var(--gold)' : '#3a4852')).join('');

  // применить купленные цвет сайта и фон
  function applyTheme() {
    const G = window.GAMIFY, th = G.THEMES[S.eq.color], st = document.documentElement.style;
    ['--blue', '--blue-d', '--blue-bg'].forEach((v, i) => th ? st.setProperty(v, th[i]) : st.removeProperty(v));
    document.body.className = S.eq.bg || '';
  }

  // Барыс с репликой
  function barysCard(text, sub) {
    return `<div class="barys">${window.GAMIFY.barysSvg(76, S.eq)}<div class="bubble"><b>${esc(text)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div></div>`;
  }

  function openShop() {
    const G = window.GAMIFY, m = document.createElement('div');
    m.className = 'shop';
    const preview = (it) => it.kind === 'frame' ? avatarHtml(S.profile, 46, it.id)
      : it.kind === 'color' ? `<span class="sw" style="background:${G.THEMES[it.id][0]}"></span>`
      : it.kind === 'bg' ? `<span class="sw" style="background:${G.BG_PREVIEW[it.id]}"></span>`
      : G.barysSvg(52, { hat: it.id });
    const draw = () => {
      m.innerHTML = `<div class="shophead"><button class="close" title="Выйти">✕</button><b>${esc(T('Магазин'))}</b><span class="chip">${ic('coin', 20, 'var(--gold)')} ${S.coins}</span></div>
        <div class="shopbody"><p class="miss">${esc(T('Золото — это игровая валюта, не настоящие деньги.'))}</p></div>`;
      const body = m.querySelector('.shopbody');
      Object.keys(G.KIND_TITLE).forEach(kind => {
        body.appendChild(el(`<h3 class="trh">${esc(T(G.KIND_TITLE[kind]))}</h3>`));
        G.ITEMS.filter(i => i.kind === kind).forEach(it => {
          const owned = S.owned.includes(it.id), on = S.eq[kind] === it.id;
          const row = el(`<div class="item"><span class="pv">${preview(it)}</span><span class="nm"><b>${esc(T(it.name))}</b>
            <span>${owned ? (on ? esc(T('Надето')) : '') : ic('coin', 16, 'var(--gold)') + ' ' + it.price}</span></span>
            <button class="btn ${owned && !on ? '' : on ? 'gray' : ''}">${esc(T(owned ? (on ? 'Снять' : 'Надеть') : 'Купить'))}</button></div>`);
          row.querySelector('button').onclick = () => {
            if (!owned) {
              if (S.coins < it.price) { row.querySelector('.nm').appendChild(el(`<em class="warn">${esc(T('Не хватает золота'))}</em>`)); return; }
              S.coins -= it.price; S.owned.push(it.id); S.eq[kind] = it.id;
            } else if (on) delete S.eq[kind]; else S.eq[kind] = it.id;
            save(); applyTheme(); draw();
          };
          body.appendChild(row);
        });
      });
      m.querySelector('.close').onclick = () => { m.remove(); home(); };
    };
    draw();
    document.body.appendChild(m);
  }

  function statsRow() {
    const lv = window.GAMIFY.levelFor(S.xp);
    return `<div class="statsrow">
      <span class="chip" title="Серия дней">${ic('flame', 20, '#ff9600')} ${S.streak}</span>
      <span class="chip" title="Очки">${ic('star', 20, 'var(--gold)')} ${S.xp}</span>
      <button class="chip coinbtn" id="shopbtn" title="Магазин">${ic('coin', 20, 'var(--gold)')} ${S.coins}</button>
      <span class="lvl"><b>${esc(T(lv.name))}</b><i><u style="width:${lv.pct}%"></u></i><small>${lv.next ? S.xp + ' / ' + lv.next : 'MAX'}</small></span></div>`;
  }

  function home() {
    if (!S.profile) return profileForm(true);
    fix(); applyTheme();
    // порядок уроков = порядок на экране (по разделам)
    const L = window.UNITS.flatMap(u => u.ids.map(id => window.LESSONS.find(l => l.id === id)));
    const firstOpen = L.findIndex(l => !S.done.includes(l.id));
    const tab = (S.tab === 'lessons' || S.tab === 'games') ? S.tab : 'dict'; // первая страница — словарь
    app.innerHTML = '';
    app.appendChild(el(`<div>
      <div class="top"><span class="brand" title="MƏZBOL">${logoHtml(96)}<span class="brandtxt">Қазақ тілі</span></span>
        <span class="stats"><button id="lg" class="lg" title="RU / EN → Қазақша">${S.lang === 'en' ? 'EN' : 'RU'}</button><button id="me" title="Профиль" style="background:none;border:0;padding:0">${avatarHtml(S.profile, 32)}</button></span>
        ${statsRow()}</div>
      <div class="wrap">
        <div class="tabs"><button data-t="dict" class="${tab === 'dict' ? 'on' : ''}">${ic('book', 20)} Словарь</button><button data-t="lessons" class="${tab === 'lessons' ? 'on' : ''}">${ic('verb', 20)} Уроки</button><button data-t="games" class="${tab === 'games' ? 'on' : ''}">${ic('bolt', 20)} Игры</button></div>
        <div id="units"></div>
      </div></div>`));
    document.getElementById('me').onclick = () => profileForm(false);
    document.getElementById('shopbtn').onclick = openShop;
    document.getElementById('lg').onclick = () => { S.lang = S.lang === 'en' ? 'ru' : 'en'; save(); home(); };
    document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => { S.tab = b.dataset.t; save(); home(); });
    const units = document.getElementById('units');
    if (tab === 'dict') return renderDict(units);
    if (tab === 'games') return renderGames(units);

    // Барыс приветствует и подсказывает, куда идти дальше
    const curLesson = (S.last && L.find(l => l.id === S.last && !S.done.includes(l.id))) || L[firstOpen];
    if (!curLesson) units.appendChild(el(barysCard(T('Ты прошёл все уроки! Керемет!'))));
    else if (!S.done.length && !S.last) units.appendChild(el(barysCard('Сәлем, ' + S.profile.name + '!', T('Я Барыс. Вместе выучим казахский!'))));
    else {
      const cu = window.UNITS.findIndex(u => u.ids.includes(curLesson.id)), pm = window.GAMIFY.PLACE_MSG[PLACES[cu]];
      if (pm) units.appendChild(el(barysCard(pm[0], T(pm[1]))));
    }

    // цель дня
    const n = S.daily.d === today() ? S.daily.n : 0, gp = Math.min(100, Math.round(n / DAILY_GOAL * 100));
    units.appendChild(el(`<div class="daily"><div><b>${esc(T('Цель на сегодня'))}</b>
      <p>${n >= DAILY_GOAL ? esc(T('Цель выполнена! Отлично!')) : esc(T('Сегодня нужно пройти')) + ' ' + DAILY_GOAL + ' ' + esc(T('урока')) + '. ' + esc(T('Выполнено')) + ': ' + n + '/' + DAILY_GOAL}</p></div>
      <div class="dbar"><u style="width:${gp}%"></u></div></div>`));

    window.UNITS.forEach((u, ui) => {
      const doneN = u.ids.filter(id => S.done.includes(id)).length, pct = Math.round(doneN / u.ids.length * 100);
      const sec = el(`<div class="section"><div class="scene">${(window.SCENES || [])[ui] || ''}</div></div>`);
      sec.appendChild(el(`<div class="unit"><span class="place">${esc(T(PLACES[ui] || ''))}</span><h2>${esc(T(u.title))}</h2><p>${esc(T(u.desc))}</p>
        <div class="uprog"><span>${esc(T('Пройдено'))} ${doneN} ${esc(T('из'))} ${u.ids.length} ${esc(T('уроков'))} — ${pct}%</span><i><u style="width:${pct}%"></u></i></div>
        <button class="pbtn" data-ui="${ui}">${ic('eye', 18, '#06222f')} ${esc(T('Постер раздела'))}</button></div>`));
      sec.querySelector('.pbtn').onclick = () => openPoster(ui);
      const path = el('<div class="path"></div>');
      u.ids.forEach((id, pos) => {
        const l = L.find(x => x.id === id), idx = L.indexOf(l);
        const done = S.done.includes(l.id);
        const locked = !done && idx > firstOpen && firstOpen !== -1;
        const stars = done ? ((S.res[l.id] && S.res[l.id].stars) || 1) : 0;
        const state = locked ? 'locked' : done ? (stars <= 1 ? 'repeat' : 'done') : (idx === firstOpen ? 'current' : '');
        const icon = locked ? ic('lock', 38) : state === 'repeat' ? ic('repeat', 38) : done ? ic('check', 40) : ic(LESSON_ICON[l.id] || 'star', 40);
        const offset = [0, 34, 50, 34, 0, -34, -50, -34][pos % 8];
        const box = el(`<div class="lnode" style="transform:translateX(${offset}px)">
          <button class="node ${state}" title="${esc(T(l.title))}">${icon}</button>
          <div class="stars">${done ? starsHtml(stars, 16) : ''}</div>
          <div class="label">${esc(T(l.title))}</div></div>`);
        if (!locked) box.querySelector('button').onclick = () => showIntro(l);
        path.appendChild(box);
      });
      // итоговый сынак раздела: открывается, когда пройдены все уроки раздела; 100 очков за первое прохождение
      const exUnlocked = u.ids.every(id => S.done.includes(id)), exRes = S.res['exam-' + ui];
      const exState = !exUnlocked ? 'locked' : exRes ? 'done' : 'current';
      const exBox = el(`<div class="lnode" style="transform:translateX(0)">
        <button class="node exam ${exState}" title="${esc(examTitle(ui))}">${!exUnlocked ? ic('lock', 38) : exRes ? ic('check', 40) : ic('trophy', 42)}</button>
        <div class="stars">${exRes ? starsHtml(exRes.stars, 16) : ''}</div>
        <div class="label">${esc(examTitle(ui))}</div></div>`);
      if (exUnlocked) exBox.querySelector('button').onclick = () => startExam(ui);
      path.appendChild(exBox);
      sec.appendChild(path);
      units.appendChild(sec);
    });

    // кнопка «Продолжить урок» — ведёт к последнему незавершённому уроку
    const target = (S.last && L.find(l => l.id === S.last && !S.done.includes(l.id))) || L[firstOpen];
    if (target) {
      const bar = el(`<div class="contbar"><button class="btn" id="cont">${ic('verb', 18, '#06222f')} ${esc(T('Продолжить урок'))}: ${esc(T(target.title))}</button></div>`);
      app.appendChild(bar);
      bar.querySelector('#cont').onclick = () => showIntro(target);
    }
  }

  // ---------- итоговые сынаки разделов ----------
  const examTitle = (ui) => S.lang === 'en' ? T(PLACES[ui]) + ' final exam' : PLACES[ui] + ' сынағы';
  function startExam(ui) {
    const u = window.UNITS[ui], picked = [];
    u.ids.forEach(id => {
      const l = window.LESSONS.find(x => x.id === id);
      shuffle(l.exercises).slice(0, 3).forEach(e => picked.push(e));
    });
    startLesson({ id: 'exam-' + ui, title: examTitle(ui), exam: true, exercises: shuffle(picked).slice(0, 12) });
  }

  // ---------- движок урока ----------
  function recordMistake(o) {
    if (!o) return;
    const map = new Map(wordPool().map(w => [w.k.toLowerCase(), w.k]));
    const pieces = [];
    ['q', 'prompt', 'answer'].forEach(f => { const v = o[f]; if (typeof v === 'string') pieces.push(v); else if (Array.isArray(v)) pieces.push(v.join(' '), ...v); });
    (o.options || []).forEach(x => pieces.push(x));
    (o.pairs || []).forEach(pr => pieces.push(pr[0], pr[1]));
    const found = new Set();
    pieces.forEach(pc => {
      const lp = String(pc).toLowerCase().trim(); if (map.has(lp)) found.add(map.get(lp));
      (lp.match(/[а-яёәғқңөұүһі]+/g) || []).forEach(tk => { if (map.has(tk)) found.add(map.get(tk)); });
    });
    found.forEach(k => { if (!S.mistakes.includes(k)) S.mistakes.push(k); });
    if (S.mistakes.length > 80) S.mistakes = S.mistakes.slice(-80);
  }

  function startLesson(lesson0) {
    fix();
    const lesson = tdeep(lesson0);
    const origMap = new Map(); lesson.exercises.forEach((e, i) => origMap.set(e, lesson0.exercises[i]));
    if (!lesson0.exam) { S.last = lesson0.id; save(); }
    const queue = lesson.exercises.slice();
    const total = queue.length;
    let hearts = 5, correct = 0, mistakes = 0, firstTry = 0;
    const missed = new Set();

    const root = el(`<div class="lesson">
      <div class="lhead"><button class="close" title="Выйти">✕</button>
        <div class="bar"><i style="width:0"></i></div><span class="hearts"></span></div>
      <div class="lbody"></div>
      <div class="foot"><div class="in"><span class="msg"></span><button class="btn" disabled>Проверить</button></div></div>
    </div>`);
    app.appendChild(root);
    const body = root.querySelector('.lbody'), foot = root.querySelector('.foot'),
      msg = root.querySelector('.msg'), btn = root.querySelector('.btn'),
      bar = root.querySelector('.bar i'), hb = root.querySelector('.hearts');

    root.querySelector('.close').onclick = () => ask(T('Выйти? Прогресс урока потеряется.'), () => { root.remove(); home(); });

    function updateTop() { hb.innerHTML = ic('heart', 22, 'var(--red)') + ' ' + hearts; bar.style.width = (correct / total * 100) + '%'; }

    function next() {
      updateTop();
      foot.className = 'foot'; msg.textContent = '';
      if (hearts <= 0) return fail();
      if (!queue.length) return finish();
      const ex = queue[0];
      const h = render(ex, body, (ready) => { btn.disabled = !ready; });
      btn.disabled = true; btn.className = 'btn'; btn.textContent = 'Проверить';
      btn.onclick = () => {
        const ok = h.check();
        beep(ok);
        h.lock && h.lock(ok);
        foot.className = 'foot ' + (ok ? 'ok' : 'bad');
        msg.textContent = ok ? '✔ ' + T('Верно!') : '✘ ' + T('Правильно:') + ' ' + h.correctText();
        btn.className = 'btn' + (ok ? '' : ' red'); btn.textContent = 'Дальше';
        btn.disabled = false;
        queue.shift();
        if (ok) { correct++; if (!missed.has(ex)) firstTry++; }
        else { hearts--; mistakes++; missed.add(ex); recordMistake(origMap.get(ex)); save(); queue.push(ex); }
        updateTop();
        btn.onclick = next;
      };
    }

    function finish() {
      const id = lesson0.id, prev = S.res[id], first = !prev && !S.done.includes(id);
      const stars = starsFor(mistakes);
      // очки даются только за первое прохождение: 10 за верный ответ с первой попытки, 20 за урок, +30 без ошибок
      const pts = !first ? 0 : lesson0.exam ? 100 : firstTry * 10 + 20 + (mistakes === 0 ? 30 : 0);
      const coins = !first ? 0 : lesson0.exam ? 50 : stars * 5;
      touchStreak(); S.xp += pts; S.coins += coins;
      S.res[id] = { stars: Math.max(prev ? prev.stars : 0, stars), pts: prev ? prev.pts : pts };
      if (!lesson0.exam && !S.done.includes(id)) S.done.push(id);
      if (S.daily.d !== today()) S.daily = { d: today(), n: 0 };
      S.daily.n++;
      save();
      root.innerHTML = `<div class="lbody center"><div class="big">${ic('trophy', 96, 'var(--gold)')}</div><h1>${esc(T(lesson0.exam ? 'Зачёт сдан!' : 'Урок пройден!'))}</h1>
        <div class="bigstars">${starsHtml(stars, 44)}</div>
        ${barysCard(T(stars === 3 ? 'Отлично! Без единой ошибки!' : stars === 2 ? 'Почти идеально. Так держать!' : 'Повтори урок, и получится лучше.'))}
        <div class="sum"><div>${ic('star', 22, 'var(--gold)')} +${pts} ${esc(T('очков'))}</div><div>${ic('coin', 22, 'var(--gold)')} +${coins}</div><div>${ic('brokenheart', 22, 'var(--red)')} ${mistakes}</div></div>
        ${first ? '' : `<p class="miss">${esc(T('Очки даются только за первое прохождение урока'))}</p>`}</div>
        <div class="foot"><div class="in"><span></span><button class="btn">Продолжить</button></div></div>`;
      root.querySelector('.btn').onclick = () => { root.remove(); home(); };
    }
    function fail() {
      root.innerHTML = `<div class="lbody center"><div class="big">${ic('brokenheart', 96, 'var(--red)')}</div><h1>Сердечки закончились</h1><p>Повторите материал и попробуйте ещё раз.</p></div>
        <div class="foot"><div class="in"><span></span><button class="btn red">Назад</button></div></div>`;
      root.querySelector('.btn').onclick = () => { root.remove(); home(); };
    }
    next();
  }
  // ---------- упражнения ----------
  function render(ex, body, setReady) {
    body.innerHTML = '';
    const say = '';
    if (ex.type === 'choose') {
      body.appendChild(el(`<div><h1>${esc(ex.q)}${say}</h1></div>`));
      const wrap = el('<div class="opts"></div>');
      let sel = null;
      shuffle(ex.options).forEach(o => {
        const b = el(`<button class="opt">${esc(o)}</button>`);
        b.onclick = () => { sel = o; [...wrap.children].forEach(c => c.classList.remove('sel')); b.classList.add('sel'); setReady(true); };
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      return {
        check: () => sel === ex.answer, correctText: () => ex.answer,
        lock: (ok) => [...wrap.children].forEach(c => { if (c.textContent === ex.answer) c.classList.add('ok'); else if (c.classList.contains('sel')) c.classList.add('bad'); })
      };
    }
    if (ex.type === 'tiles') {
      body.appendChild(el(`<div><h1>${esc(ex.q)}</h1><div class="prompt">${esc(ex.prompt)}</div></div>`));
      const box = el('<div class="answerbox"></div>'), pool = el('<div class="tiles"></div>');
      const chosen = [];
      const draw = () => {
        box.innerHTML = ''; pool.innerHTML = '';
        chosen.forEach((w, i) => { const t = el(`<button class="tile">${esc(w)}</button>`); t.onclick = () => { chosen.splice(i, 1); draw(); }; box.appendChild(t); });
        ex._words.forEach(w => {
          const used = chosen.filter(c => c === w).length >= ex._words.filter(x => x === w).length;
          const t = el(`<button class="tile ${used ? 'used' : ''}">${esc(w)}</button>`);
          if (used) t.style.opacity = '.25';
          t.onclick = () => { if (!used) { chosen.push(w); draw(); } };
          pool.appendChild(t);
        });
        setReady(chosen.length > 0);
      };
      ex._words = ex._words || shuffle(ex.words);
      body.appendChild(box); body.appendChild(pool); draw();
      return { check: () => chosen.join(' ') === ex.answer.join(' '), correctText: () => ex.answer.join(' ') };
    }
    if (ex.type === 'match') {
      body.appendChild(el('<div><h1>Найдите пары</h1></div>'));
      const grid = el('<div class="match"></div>');
      const left = shuffle(ex.pairs.map(p => p[0])), right = shuffle(ex.pairs.map(p => p[1]));
      let a = null, matched = 0, errors = 0;
      const mk = (txt, side) => {
        const b = el(`<button class="opt" data-side="${side}">${esc(txt)}</button>`);
        b.onclick = () => {
          if (b.classList.contains('used')) return;
          if (!a || a.dataset.side === side) { if (a) a.classList.remove('sel'); a = b; b.classList.add('sel'); return; }
          const l = side === 'l' ? b : a, r = side === 'l' ? a : b;
          const ok = ex.pairs.some(p => p[0] === l.textContent && p[1] === r.textContent);
          a.classList.remove('sel');
          if (ok) { l.classList.add('used'); r.classList.add('used'); matched++; beep(true); if (matched === ex.pairs.length) setReady(true); }
          else { errors++; beep(false); [l, r].forEach(x => { x.classList.add('bad'); setTimeout(() => x.classList.remove('bad'), 500); }); }
          a = null;
        };
        return b;
      };
      for (let i = 0; i < left.length; i++) { grid.appendChild(mk(left[i], 'l')); grid.appendChild(mk(right[i], 'r')); }
      body.appendChild(grid);
      return { check: () => errors < 2, correctText: () => 'слишком много ошибок, повторим' };
    }
    if (ex.type === 'type') {
      body.appendChild(el(`<div><h1>${esc(ex.q)}${say}</h1><div class="prompt">${esc(ex.prompt)}</div></div>`));
      const inp = el('<input class="txt" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ответ по-казахски">');
      const kb = el('<div class="kb"></div>');
      LETTERS.forEach(ch => { const b = el(`<button>${ch}</button>`); b.onclick = () => { inp.value += ch; inp.focus(); inp.dispatchEvent(new Event('input')); }; kb.appendChild(b); });
      inp.oninput = () => setReady(inp.value.trim().length > 0);
      body.appendChild(inp); body.appendChild(kb);
      setTimeout(() => inp.focus(), 50);
      return { check: () => norm(inp.value) === norm(ex.answer), correctText: () => ex.answer };
    }
    return { check: () => true, correctText: () => '' };
  }

  // Автоперевод интерфейса (подписи, кнопки, подсказки) на выбранный язык
  function trNode(n) {
    if (S.lang !== 'en') return;
    if (n.nodeType === 3) {
      const k = n.nodeValue.trim(), v = k && window.I18N.en[k];
      if (v) n.nodeValue = n.nodeValue.replace(k, v);
    } else if (n.nodeType === 1) {
      if (n.classList && (n.classList.contains('tile') || n.classList.contains('mem'))) return; // плитки с буквами и карточки не переводим
      ['placeholder', 'title'].forEach(a => { const t = n.getAttribute && n.getAttribute(a); if (t && window.I18N.en[t]) n.setAttribute(a, window.I18N.en[t]); });
      n.childNodes.forEach(trNode);
    }
  }
  new MutationObserver(ms => ms.forEach(m => {
    if (m.type === 'characterData') trNode(m.target); else m.addedNodes.forEach(trNode);
  })).observe(app, { childList: true, subtree: true, characterData: true });
  window.APP_T = T;
  home();
})();

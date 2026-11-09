// Фоновые иллюстрации разделов (оригинальные SVG): 1 — Алматы, 2 — Астана, 3 — Шымкент.
(function () {
  const stars = (seed, n, h) => {
    let s = seed, out = '';
    for (let i = 0; i < n; i++) {
      s = (s * 9301 + 49297) % 233280; const x = (s / 233280) * 400;
      s = (s * 9301 + 49297) % 233280; const y = (s / 233280) * h;
      s = (s * 9301 + 49297) % 233280; const r = 0.6 + (s / 233280) * 1.2;
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.4 + r / 3).toFixed(2)}"/>`;
    }
    return out;
  };
  const lights = (seed, n, y0, y1, color) => {
    let s = seed, out = '';
    for (let i = 0; i < n; i++) {
      s = (s * 9301 + 49297) % 233280; const x = (s / 233280) * 400;
      s = (s * 9301 + 49297) % 233280; const y = y0 + (s / 233280) * (y1 - y0);
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="${color}" opacity=".85"/>`;
    }
    return out;
  };
  const pines = (xs, base, c) => xs.map(x => `<path d="M${x} ${base - 46}l11 22h-6l9 16h-8l7 12h-26l7-12h-8l9-16h-6z" fill="${c}"/>`).join('');
  const wrap = (inner) => `<svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

  // ---- Алматы: горы Заилийского Алатау, телебашня Кок-Тобе, огни города ----
  const almaty = wrap(`
    <defs><linearGradient id="skA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081a33"/><stop offset=".55" stop-color="#17466b"/><stop offset="1" stop-color="#2f7596"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skA)"/>
    ${stars(7, 60, 300)}
    <circle cx="322" cy="92" r="26" fill="#f6f2c8" opacity=".92"/><circle cx="332" cy="86" r="24" fill="#17466b" opacity=".35"/>
    <path d="M0 430L66 310l46 52 78-130 74 106 52-72 84 94V700H0z" fill="#2a5b80"/>
    <path d="M190 232l-26 40 16-8 12 16 12-14 18 10zM66 310l-20 30 14-6 8 10 14-10zM316 266l-22 34 15-6 9 10 13-9z" fill="#eaf6fc"/>
    <path d="M0 540l84-110 72 70 82-100 92 110 70-60V700H0z" fill="#1d4262"/>
    <path d="M238 400l-18 24 12-4 8 8 10-7z" fill="#cfe6f2" opacity=".8"/>
    <rect x="58.500" y="350" width="3" height="110" fill="#d6ecf7"/><rect x="53" y="396" width="14" height="8" rx="2" fill="#d6ecf7"/>
    <path d="M60 330l2 20h-4z" fill="#ffc800"/><circle cx="60" cy="327" r="2.500" fill="#ff4b4b"/>
    <path d="M0 610q100-40 200-12t200-10V700H0z" fill="#10283d"/>
    ${pines([20, 330, 366, 150], 640, '#0b1d2e')}
    <g>
      <rect x="226" y="612" width="6" height="34" fill="#3a2418"/><circle cx="229" cy="602" r="24" fill="#1d5a3c"/><circle cx="216" cy="610" r="15" fill="#256b45"/><circle cx="243" cy="610" r="15" fill="#256b45"/>
      <g fill="#ff5a5f"><circle cx="220" cy="600" r="3"/><circle cx="236" cy="596" r="3"/><circle cx="244" cy="612" r="3"/><circle cx="226" cy="614" r="3"/><circle cx="212" cy="614" r="3"/></g>
      <rect x="92" y="632" width="5" height="26" fill="#3a2418"/><circle cx="94" cy="624" r="18" fill="#1d5a3c"/><circle cx="84" cy="630" r="11" fill="#256b45"/><circle cx="105" cy="630" r="11" fill="#256b45"/>
      <g fill="#ff5a5f"><circle cx="88" cy="622" r="2.600"/><circle cx="100" cy="620" r="2.600"/><circle cx="104" cy="632" r="2.600"/><circle cx="90" cy="634" r="2.600"/></g>
    </g>
    ${lights(3, 70, 620, 695, '#ffc800')}
  `);

  // ---- Астана: Байтерек, Хан Шатыр, небоскрёбы, река Есиль ----
  const astana = wrap(`
    <defs><linearGradient id="skB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1233"/><stop offset=".6" stop-color="#1b3a78"/><stop offset="1" stop-color="#2b7fb5"/></linearGradient>
    <radialGradient id="glowB"><stop offset="0" stop-color="#ffd84a"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="700" fill="url(#skB)"/>
    ${stars(21, 50, 280)}
    <g fill="#14295a" opacity=".9">
      <rect x="10" y="440" width="34" height="260"/><rect x="48" y="400" width="28" height="300"/><rect x="80" y="470" width="40" height="230"/>
      <rect x="300" y="470" width="30" height="230"/><rect x="334" y="420" width="26" height="280"/><rect x="364" y="460" width="40" height="240"/>
    </g>
    ${lights(5, 55, 410, 640, '#ffd84a')}
    <path d="M232 640q56-96 92-250q4 8 8 0q36 154 76 250z" fill="#2f86bd"/>
    <path d="M328 386v-48" stroke="#cfe6f2" stroke-width="3"/>
    <path d="M232 640q56-96 92-250" stroke="#8fd0f2" stroke-width="2" fill="none" opacity=".7"/>
    <circle cx="188" cy="300" r="60" fill="url(#glowB)" opacity=".5"/>
    <path d="M180 640l8-250h24l8 250z" fill="#dff0fa"/>
    <path d="M168 390h64l-10-26h-44z" fill="#cfe6f2"/>
    <circle cx="200" cy="330" r="32" fill="#ffc800"/><circle cx="200" cy="330" r="32" fill="none" stroke="#fff3b0" stroke-width="2"/>
    <path d="M168 330h64M200 298v64M177 307l46 46M223 307l-46 46" stroke="#e0a800" stroke-width="2"/>
    <path d="M200 298v-24" stroke="#dff0fa" stroke-width="3"/>
    <rect x="0" y="640" width="400" height="60" fill="#0e2250"/>
    <g stroke="#7fc4ea" stroke-width="2" opacity=".5" stroke-linecap="round"><path d="M20 662h90M60 678h130M240 660h120M270 680h100M130 668h70"/></g>
    <path d="M200 640v40" stroke="#ffd84a" stroke-width="6" opacity=".35"/>
  `);

  // ---- Шымкент: закат, мечеть с куполами, минареты, тополя ----
  const shymkent = wrap(`
    <defs><linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150f3d"/><stop offset=".5" stop-color="#4a2a78"/><stop offset=".82" stop-color="#d9693f"/><stop offset="1" stop-color="#f6b04a"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skC)"/>
    ${stars(33, 40, 260)}
    <circle cx="86" cy="96" r="26" fill="#f7ecc0"/><circle cx="98" cy="88" r="24" fill="#3a2370"/>
    <path d="M0 600q120-40 220-14t180-20V700H0z" fill="#2b1850"/>
    <g fill="#241446">
      <rect x="120" y="480" width="160" height="130"/>
      <path d="M130 480a70 70 0 0 1 140 0z" transform="translate(0 -6)"/>
      <rect x="196" y="352" width="8" height="28"/><circle cx="200" cy="348" r="5"/>
      <rect x="90" y="400" width="20" height="210"/><path d="M90 400l10-30 10 30z"/>
      <rect x="290" y="400" width="20" height="210"/><path d="M290 400l10-30 10 30z"/>
      <path d="M96 386h8v-14h-8zM296 386h8v-14h-8z"/>
      <path d="M135 480a28 28 0 0 1 56 0zM209 480a28 28 0 0 1 56 0z" transform="translate(0 -4)"/>
    </g>
    <g fill="#f6b04a" opacity=".9">
      <path d="M150 610v-40a12 12 0 0 1 24 0v40zM188 610v-52a12 12 0 0 1 24 0v52zM226 610v-40a12 12 0 0 1 24 0v40z"/>
      <circle cx="100" cy="418" r="2.500"/><circle cx="300" cy="418" r="2.500"/>
    </g>
    <g fill="#1a0f36">
      <ellipse cx="40" cy="560" rx="14" ry="70"/><ellipse cx="66" cy="575" rx="11" ry="55"/>
      <ellipse cx="350" cy="555" rx="15" ry="72"/><ellipse cx="376" cy="580" rx="11" ry="52"/>
    </g>
    <rect y="610" width="400" height="90" fill="#1a0f36"/>
    ${lights(9, 45, 625, 695, '#f6b04a')}
  `);

  // ---- Бурабай: озеро, скалы Окжетпес, сосны ----
  const burabay = wrap(`
    <defs><linearGradient id="skD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#08243a"/><stop offset=".55" stop-color="#1f7a86"/><stop offset="1" stop-color="#a9dcc8"/></linearGradient>
    <linearGradient id="wtD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b7a8a"/><stop offset="1" stop-color="#0a3040"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skD)"/>
    ${stars(41, 30, 220)}
    <circle cx="90" cy="400" r="46" fill="#ffeab0" opacity=".45"/>
    <path d="M0 440q80-70 160-24t160-18 80 30V700H0z" fill="#17606a"/>
    <path d="M232 490l12-86 14 30 14-52 16 62 16-24 12 70z" fill="#274a58"/>
    <path d="M52 495l14-70 14 22 16-48 16 54 16-14 10 56z" fill="#1e3e4c"/>
    <rect y="490" width="400" height="210" fill="url(#wtD)"/>
    <g stroke="#a9dcc8" stroke-width="2" opacity=".4" stroke-linecap="round"><path d="M40 530h80M150 560h100M270 540h90M80 600h120M230 630h110M30 660h70"/></g>
    <path d="M232 490l12 86 14-30 14 52 16-62 16 24 12-70z" fill="#274a58" opacity=".35"/>
    ${pines([14, 52, 346, 380, 320], 560, '#0a2a30')}
  `);

  // ---- Чарын: красные каньоны на закате ----
  const charyn = wrap(`
    <defs><linearGradient id="skE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#241046"/><stop offset=".55" stop-color="#b8483a"/><stop offset="1" stop-color="#f6b25e"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skE)"/>
    ${stars(55, 25, 200)}
    <circle cx="200" cy="330" r="40" fill="#ffd886"/>
    <path d="M110 520l14-60 36-8 22 30 18-26 40 14 20 50z" fill="#9c3a2a"/>
    <path d="M0 330l44 8 26 60-20 52 44 66-26 82 22 102H0z" fill="#7d2a20"/>
    <path d="M400 350l-40 10-30 60 24 56-50 70 28 90-12 64h80z" fill="#7d2a20"/>
    <g stroke="#c8603f" stroke-width="3" opacity=".6" stroke-linecap="round"><path d="M0 420l60 8M0 480l64 6M0 550l50 10M400 440l-56 8M400 510l-54 8M400 580l-44 8"/></g>
    <path d="M0 640q200-50 400 6V700H0z" fill="#3e1620"/>
    <path d="M130 690q70-34 140 0" stroke="#4aa8d8" stroke-width="8" fill="none" opacity=".7"/>
    ${lights(61, 30, 650, 695, '#f6b25e')}
  `);

  // ---- Туркестан: мавзолей Ходжи Ахмеда Ясави (стилизованный силуэт) ----
  const turkistan = wrap(`
    <defs><linearGradient id="skF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070d28"/><stop offset=".7" stop-color="#1f3a80"/><stop offset="1" stop-color="#4a78c0"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skF)"/>
    ${stars(77, 70, 340)}
    <circle cx="320" cy="90" r="24" fill="#f6f1cc"/><circle cx="330" cy="84" r="22" fill="#12275a"/>
    <rect x="96" y="500" width="208" height="150" fill="#c9a66a"/>
    <rect x="152" y="440" width="96" height="210" fill="#dcba7c"/>
    <path d="M176 650v-96a24 24 0 0 1 48 0v96z" fill="#1a2c64"/>
    <path d="M130 440a70 70 0 0 1 140 0z" fill="#2d9bd8"/>
    <path d="M130 440a70 70 0 0 1 140 0" fill="none" stroke="#bfe8fb" stroke-width="3"/>
    <path d="M200 372v-20M193 360h14" stroke="#ffc800" stroke-width="3"/>
    <path d="M200 380v60M170 386l10 54M230 386l-10 54" stroke="#1a78b0" stroke-width="2" opacity=".7"/>
    <path d="M104 500a26 26 0 0 1 52 0z" fill="#2d9bd8"/><path d="M244 500a26 26 0 0 1 52 0z" fill="#2d9bd8"/>
    <g fill="#ffd84a" opacity=".85"><rect x="112" y="540" width="8" height="18" rx="4"/><rect x="132" y="540" width="8" height="18" rx="4"/><rect x="260" y="540" width="8" height="18" rx="4"/><rect x="280" y="540" width="8" height="18" rx="4"/></g>
    <rect y="650" width="400" height="50" fill="#0b1a44"/>
    <path d="M150 650h100l20 50H130z" fill="#16286a" opacity=".7"/>
    ${lights(88, 40, 660, 696, '#ffd84a')}
  `);

  // ---- Кольсай: три озера среди гор и елей ----
  const kolsai = wrap(`
    <defs><linearGradient id="skG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c2a3d"/><stop offset=".55" stop-color="#3a8d93"/><stop offset="1" stop-color="#c3ead8"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skG)"/>
    ${stars(91, 28, 200)}
    <path d="M0 400l90-140 70 80 80-110 90 100 70-50V700H0z" fill="#2b6068"/>
    <path d="M90 260l-22 34 14-6 10 12 12-12 10 8zM240 230l-24 38 16-8 10 12 12-10 12 8z" fill="#eaf8f4"/>
    <path d="M0 470l60-50 60 40 80-60 80 56 60-40 60 30V700H0z" fill="#1d4a52"/>
    ${pines([10, 48, 90, 290, 330, 368, 130, 250], 520, '#0d2f33')}
    <ellipse cx="200" cy="540" rx="150" ry="26" fill="#22b9c9"/><ellipse cx="200" cy="540" rx="150" ry="26" fill="none" stroke="#bff3f6" stroke-width="2" opacity=".6"/>
    <ellipse cx="200" cy="610" rx="120" ry="22" fill="#1aa0b9"/><ellipse cx="200" cy="610" rx="120" ry="22" fill="none" stroke="#bff3f6" stroke-width="2" opacity=".5"/>
    <ellipse cx="200" cy="670" rx="96" ry="18" fill="#1688a8"/>
    <g stroke="#e6fbfb" stroke-width="2" opacity=".5" stroke-linecap="round"><path d="M110 538h50M240 544h40M140 608h60M230 614h40M160 668h50"/></g>
    <path d="M0 690q200-26 400 0V700H0z" fill="#0b2a2e"/>
  `);

  // ---- Бозжыра: белые скалы-клыки Мангистау ----
  const bozzhyra = wrap(`
    <defs><linearGradient id="skH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120f38"/><stop offset=".55" stop-color="#6a3e7e"/><stop offset="1" stop-color="#f0a064"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skH)"/>
    ${stars(103, 45, 280)}
    <circle cx="300" cy="150" r="24" fill="#f9eecb"/>
    <path d="M0 560q100-30 200-6t200-14V700H0z" fill="#b8764a"/>
    <path d="M56 640l22-124q14-52 30 0l32 124z" fill="#eadfca"/><path d="M92 640l16-124q14-52 22 0l10 124z" fill="#c8b394" opacity=".8"/>
    <path d="M176 640l14-170q16-70 32 0l30 170z" fill="#f2e8d4"/><path d="M212 640l10-170q10-40 18 0l20 170z" fill="#cdb898" opacity=".8"/>
    <path d="M286 640l10-100q12-34 24 0l26 100z" fill="#eadfca"/><path d="M314 640l6-100q8-24 14 0l16 100z" fill="#c8b394" opacity=".8"/>
    <path d="M0 640q200-34 400 0V700H0z" fill="#8a4e32"/>
    ${lights(111, 20, 650, 698, '#f6c27a')}
  `);

  // ---- Актау: закат над Каспийским морем, меловые скалы, парусник ----
  const aktau = wrap(`
    <defs><linearGradient id="skI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091e44"/><stop offset=".6" stop-color="#2a6fa8"/><stop offset="1" stop-color="#ffd48a"/></linearGradient>
    <linearGradient id="seI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a79b0"/><stop offset="1" stop-color="#0b2d5a"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skI)"/>
    ${stars(121, 40, 230)}
    <circle cx="240" cy="440" r="54" fill="#ffe6a0"/>
    <rect y="440" width="400" height="260" fill="url(#seI)"/>
    <g stroke="#ffe6a0" stroke-width="3" opacity=".6" stroke-linecap="round"><path d="M200 460h80M210 478h60M220 498h40M214 520h50M226 545h28"/></g>
    <g stroke="#9fd0f0" stroke-width="2" opacity=".4" stroke-linecap="round"><path d="M30 580h90M280 600h100M140 640h110M20 670h70"/></g>
    <path d="M0 410l54-14 48 60-14 70 40 56-40 70 24 78H0z" fill="#d8c7a0"/>
    <path d="M0 470l60 6M0 540l70 4M0 610l56 6" stroke="#b49f78" stroke-width="3" opacity=".7"/>
    <path d="M286 500h64l-12 14h-40z" fill="#1a2a4a"/><path d="M316 497V440l26 50z" fill="#f4f1e6"/><path d="M312 497V452l-22 40z" fill="#d7e2f0"/>
  `);

  // ---- Алтай: двуглавая заснеженная гора, лес, река ----
  const altai = wrap(`
    <defs><linearGradient id="skJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050b24"/><stop offset=".55" stop-color="#1e3f7a"/><stop offset="1" stop-color="#7fb2de"/></linearGradient></defs>
    <rect width="400" height="700" fill="url(#skJ)"/>
    ${stars(133, 80, 340)}
    <path d="M40 560l130-340 36 78 44-130 110 392z" fill="#35568a"/>
    <path d="M170 220l-34 90 28-12 22 26 18-20 4-26zM250 168l-34 94 26-10 20 22 22-20 18 12z" fill="#f4f9ff"/>
    <path d="M206 298l14-24 8 30zM250 168l-10 70 20-8z" fill="#c8def2" opacity=".7"/>
    <path d="M0 520l80-40 100 50 90-60 130 50V700H0z" fill="#1c4a4a"/>
    ${pines([8, 40, 74, 120, 280, 316, 350, 380], 600, '#0d2a2c')}
    <path d="M150 700q30-50 60-70t70-60" stroke="#8fd0f2" stroke-width="12" fill="none" stroke-linecap="round" opacity=".75"/>
    <path d="M0 690q200-20 400 0V700H0z" fill="#08201f"/>
  `);

  window.SCENES = [almaty, astana, shymkent, burabay, charyn, turkistan, kolsai, bozzhyra, aktau, altai];
})();

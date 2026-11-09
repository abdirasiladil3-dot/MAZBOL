// Геймификация: уровни, тексты. Подключается до app.js.
(function () {
  Object.assign(window.I18N.en, {
    // уровни
    'Алғашқы қадам': 'First step', 'Ізденуші': 'Explorer', 'Тіл үйренуші': 'Language learner',
    'Сөз білгірі': 'Word expert', 'Сөз шебері': 'Word master', 'Қазақ тілі шебері': 'Master of Kazakh',
    // прогресс и цель дня
    'Пройдено': 'Completed', 'из': 'of', 'уроков': 'lessons', 'Цель на сегодня': 'Today’s goal',
    'Сегодня нужно пройти': 'Today you need to complete', 'урока': 'lessons', 'Выполнено': 'Done', 'Цель выполнена! Отлично!': 'Goal complete! Great job!',
    'Продолжить урок': 'Continue lesson', 'очков': 'points',
    'Очки даются только за первое прохождение урока': 'Points are given only for the first time you complete a lesson',
    'Зачёт сдан!': 'Exam passed!', 'Повторить': 'Review', 'Пока ошибок нет — так держать!': 'No mistakes yet — keep it up!',
    'Раздел': 'Unit', 'Постер раздела': 'Unit poster', 'Начать урок': 'Start lesson',
    'Сначала посмотрите картинку и слова, потом выполняйте задания.': 'First look at the picture and the words, then do the tasks.',
    'Очки': 'Points', 'Золото': 'Gold', 'Серия дней': 'Day streak'
  });

  const LEVELS = [
    { min: 0, name: 'Алғашқы қадам' }, { min: 150, name: 'Ізденуші' }, { min: 400, name: 'Тіл үйренуші' },
    { min: 800, name: 'Сөз білгірі' }, { min: 1400, name: 'Сөз шебері' }, { min: 2200, name: 'Қазақ тілі шебері' }
  ];

  function levelFor(points) {
    let i = 0;
    LEVELS.forEach((l, k) => { if (points >= l.min) i = k; });
    const cur = LEVELS[i], nx = LEVELS[i + 1];
    return { idx: i, name: cur.name, next: nx ? nx.min : null, pct: nx ? Math.round((points - cur.min) / (nx.min - cur.min) * 100) : 100 };
  }

  // ---------- магазин: покупки за игровое золото (не настоящие деньги) ----------
  const ITEMS = [
    { id: 'frame-gold', kind: 'frame', name: 'Золотая рамка', price: 40 },
    { id: 'frame-blue', kind: 'frame', name: 'Голубое сияние', price: 60 },
    { id: 'frame-royal', kind: 'frame', name: 'Фиолетовая рамка', price: 80 },
    { id: 'color-violet', kind: 'color', name: 'Фиолетовая тема', price: 50 },
    { id: 'color-green', kind: 'color', name: 'Зелёная тема', price: 50 },
    { id: 'color-rose', kind: 'color', name: 'Розовая тема', price: 50 },
    { id: 'bg-stars', kind: 'bg', name: 'Звёздное небо', price: 80 },
    { id: 'bg-steppe', kind: 'bg', name: 'Степной закат', price: 80 },
    { id: 'hat-borik', kind: 'hat', name: 'Меховая шапка (бөрік)', price: 70 },
    { id: 'hat-taqiya', kind: 'hat', name: 'Шапочка (тақия)', price: 60 },
    { id: 'scarf', kind: 'hat', name: 'Шарф', price: 40 }
  ];
  const KIND_TITLE = { frame: 'Рамки профиля', color: 'Цвета сайта', bg: 'Фоны', hat: 'Одежда Барыса' };
  const FRAMES = {
    'frame-gold': 'border-color:#ffc800;box-shadow:0 0 0 3px rgba(255,200,0,.35),0 0 12px rgba(255,200,0,.6)',
    'frame-blue': 'border-color:#7fe3ff;box-shadow:0 0 0 3px rgba(127,227,255,.3),0 0 14px rgba(127,227,255,.7)',
    'frame-royal': 'border-color:#c084fc;box-shadow:0 0 0 3px rgba(192,132,252,.3),0 0 12px rgba(192,132,252,.6)'
  };
  const THEMES = { // [--blue, --blue-d, --blue-bg]
    'color-violet': ['#a78bfa', '#7c5fd6', '#2a2250'],
    'color-green': ['#34d399', '#1f9d73', '#12382c'],
    'color-rose': ['#fb7185', '#d1495b', '#3a1a22']
  };
  const BG_PREVIEW = {
    'bg-stars': 'radial-gradient(circle at 30% 30%,#fff 0 1px,transparent 2px),radial-gradient(circle at 70% 60%,#fff 0 1px,transparent 2px),#0a1124',
    'bg-steppe': 'linear-gradient(#0f1519,#4a2a30)'
  };
  Object.assign(window.I18N.en, {
    'Магазин': 'Shop', 'Золотая рамка': 'Gold frame', 'Голубое сияние': 'Blue glow', 'Фиолетовая рамка': 'Violet frame',
    'Фиолетовая тема': 'Violet theme', 'Зелёная тема': 'Green theme', 'Розовая тема': 'Rose theme', 'Звёздное небо': 'Starry sky',
    'Степной закат': 'Steppe sunset', 'Меховая шапка (бөрік)': 'Fur hat (бөрік)', 'Шапочка (тақия)': 'Cap (тақия)', 'Шарф': 'Scarf',
    'Рамки профиля': 'Profile frames', 'Цвета сайта': 'Site colors', 'Фоны': 'Backgrounds', 'Одежда Барыса': 'Barys’s outfits',
    'Купить': 'Buy', 'Надеть': 'Equip', 'Снять': 'Unequip', 'Надето': 'Equipped', 'Не хватает золота': 'Not enough gold',
    'Золото — это игровая валюта, не настоящие деньги.': 'Gold is in-game currency, not real money.'
  });

  // ---------- Барыс: снежный барс, оригинальный персонаж ----------
  function barysSvg(size, eq) {
    const hat = eq && eq.hat;
    const hatSvg = hat === 'hat-borik'
      ? '<path d="M19 38q31-40 62 0q-31-12-62 0z" fill="#7a4a2a"/><ellipse cx="50" cy="38" rx="31" ry="6" fill="#8d5a34"/>'
      : hat === 'hat-taqiya'
        ? '<path d="M26 34q24-26 48 0z" fill="#1c8fd0"/><path d="M26 34h48" stroke="#ffc800" stroke-width="3"/><circle cx="50" cy="16" r="3" fill="#ffc800"/>'
        : '';
    const scarf = hat === 'scarf' ? '<path d="M24 82q26 14 52 0l-4 12q-22 8-44 0z" fill="#ff5a5f"/><path d="M62 90l6 12h-9z" fill="#ff5a5f"/><path d="M30 86h40" stroke="#fff" stroke-width="2" stroke-dasharray="4 4"/>' : '';
    return `<svg viewBox="0 0 100 104" width="${size}" height="${size}" aria-hidden="true" style="flex:none">
      <circle cx="24" cy="30" r="11" fill="#e4edf5"/><circle cx="76" cy="30" r="11" fill="#e4edf5"/>
      <circle cx="24" cy="31" r="5.500" fill="#8fa3b5"/><circle cx="76" cy="31" r="5.500" fill="#8fa3b5"/>
      <circle cx="50" cy="58" r="35" fill="#e4edf5"/>
      <g fill="#6b7f92"><ellipse cx="38" cy="36" rx="4.500" ry="2.600" transform="rotate(-20 38 36)"/><ellipse cx="50" cy="31" rx="4" ry="2.600"/><ellipse cx="62" cy="36" rx="4.500" ry="2.600" transform="rotate(20 62 36)"/>
      <ellipse cx="22" cy="60" rx="3.500" ry="2.200"/><ellipse cx="78" cy="60" rx="3.500" ry="2.200"/><ellipse cx="26" cy="70" rx="3" ry="2"/><ellipse cx="74" cy="70" rx="3" ry="2"/></g>
      <ellipse cx="37" cy="54" rx="6" ry="7" fill="#fff"/><ellipse cx="63" cy="54" rx="6" ry="7" fill="#fff"/>
      <circle cx="37" cy="55" r="4" fill="#5fc4e8"/><circle cx="63" cy="55" r="4" fill="#5fc4e8"/>
      <circle cx="37" cy="55" r="2.200" fill="#16242f"/><circle cx="63" cy="55" r="2.200" fill="#16242f"/>
      <circle cx="38.500" cy="53.500" r=".9" fill="#fff"/><circle cx="64.500" cy="53.500" r=".9" fill="#fff"/>
      <path d="M44.500 65h11l-5.500 6z" fill="#f08ea0"/>
      <path d="M50 71v4M43 77q7 5 14 0" stroke="#4a5a68" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M30 68l-14-3M30 72l-14 3M70 68l14-3M70 72l14 3" stroke="#9fb2c4" stroke-width="1.500" stroke-linecap="round"/>
      ${scarf}${hatSvg}</svg>`;
  }

  // Короткие реплики Барыса: казахская фраза + перевод
  const PLACE_MSG = {
    'Алматы': ['Алматы бойынша саяхатымызды бастайық!', 'Начнём путешествие по Алматы!'],
    'Астана': ['Астанаға саяхатымыз жалғасады!', 'Наше путешествие в Астану продолжается!'],
    'Шымкент': ['Енді Шымкентке бет алайық!', 'Теперь отправимся в Шымкент!'],
    'Бурабай': ['Бурабайдың әдемі табиғатын көрейік!', 'Посмотрим на красивую природу Бурабая!'],
    'Чарын': ['Шарын шатқалына барамыз!', 'Отправляемся в Чарынский каньон!'],
    'Туркестан': ['Түркістанға жол ашық!', 'Дорога в Туркестан открыта!'],
    'Кольсай': ['Көлсай көлдері бізді күтіп тұр!', 'Озёра Кольсая ждут нас!'],
    'Бозжыра': ['Бозжыраның ақ жартастарына қарайық!', 'Посмотрим на белые скалы Бозжыры!'],
    'Актау': ['Ақтауда теңіз жағасына барайық!', 'Пойдём на берег моря в Актау!'],
    'Алтай': ['Алтай тауларына қарай жүрейік!', 'Отправимся к горам Алтая!']
  };
  Object.assign(window.I18N.en, {
    'Начнём путешествие по Алматы!': 'Let’s begin our trip around Almaty!', 'Наше путешествие в Астану продолжается!': 'Our trip to Astana goes on!',
    'Теперь отправимся в Шымкент!': 'Now let’s head to Shymkent!', 'Посмотрим на красивую природу Бурабая!': 'Let’s see the beautiful nature of Burabay!',
    'Отправляемся в Чарынский каньон!': 'We are off to Charyn Canyon!', 'Дорога в Туркестан открыта!': 'The road to Turkistan is open!',
    'Озёра Кольсая ждут нас!': 'The Kolsai lakes are waiting for us!', 'Посмотрим на белые скалы Бозжыры!': 'Let’s look at the white rocks of Bozzhyra!',
    'Пойдём на берег моря в Актау!': 'Let’s go to the seashore in Aktau!', 'Отправимся к горам Алтая!': 'Let’s head to the Altai mountains!',
    'Я Барыс. Вместе выучим казахский!': 'I am Barys. Let’s learn Kazakh together!',
    'Отлично! Без единой ошибки!': 'Great! Not a single mistake!', 'Почти идеально. Так держать!': 'Almost perfect. Keep it up!',
    'Повтори урок, и получится лучше.': 'Repeat the lesson and you will do better.', 'Ты прошёл все уроки! Керемет!': 'You finished all the lessons! Керемет!'
  });

  window.GAMIFY = { LEVELS, levelFor, ITEMS, KIND_TITLE, FRAMES, THEMES, BG_PREVIEW, barysSvg, PLACE_MSG };
})();

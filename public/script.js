/* Сайт Насти Лиходиевской: пересборка запроса, пиксельные фигурки, аккордеон, кнопка «Наверх» */
(function () {
  'use strict';
  var SHOW_REVIEWS = false; // включить, когда будут 2-3 отзыва
  var TG = 'https://t.me/liho100';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PAL = { k: '#12183A', b: '#2B4BFF', l: '#8FA4FF', p: '#FF5FA8', q: '#FF9CC9', y: '#FFD23F', o: '#D9AE1E', w: '#FFFFFF', g: '#9FA29A', m: '#A0682F', n: '#6B4220', r: '#FF7A33' };
  var FIGS = {
    envelope: ['', '', 'kkkkkkkkkkkk', 'kkwwwwwwwwkk', 'kwkwwwwwwkwk', 'kwwkwwwwkwwk', 'kwwwkppkwwwk', 'kwwwwkkwwwwk', 'kwwwwwwwwwwk', 'kwwwwwwwwwwk', 'kkkkkkkkkkkk', ''],
    shovel: ['....kkkk....', '....mmmm....', '.....mn.....', '.....mn.....', '.....mn.....', '.....mn.....', '....kmnk....', '...kgwggk...', '...kgwggk...', '...kgwggk...', '....kggk....', '.....kk.....'],
    tired: ['........bbbb', '..........b.', '.........b..', '........bbbb', '.kkkkkkk....', 'kyyyyyyyk...', 'kykkykkyk...', 'kyqqyqqyk...', 'kyyyyyyyk...', 'kyykkkyyk...', 'kyyyyyyyk...', '.kkkkkkk....'],
    diamond: ['', '...kkkkkk...', '..kwllllbk..', '.kwllllllbk.', 'kkkkkkkkkkkk', '.kllllllbbk.', '..klllllbk..', '...kllbbk...', '....klbk....', '.....kk.....', '', ''],
    battery: ['', '', '', '.kkkkkkkkkk.', '.kwwwwwwwwk.', '.kpwwwwwwwkk', '.kpwwwwwwwkk', '.kpwwwwwwwkk', '.kwwwwwwwwk.', '.kkkkkkkkkk.', '', ''],
    signpost: ['', '.....nm.....', '.nnnnnnnn...', '.mmmmmmmmm..', '.mmmmmmmmmm.', '.mmmmmmmmm..', '.....nm.....', '..mmmmmmmmm.', '.mmmmmmmmmm.', '..mmmmmmmmm.', '.....nm.....', '...gggggg...'],
    bulb: ['.y..kkkk..y.', '...kyyyyk...', '..kywyyyyk..', 'y.kwyyyyyk.y', '..kyyyyyyk..', '...kyyyyk...', '.y..kyyk..y.', '....gggg....', '....kkkk....', '....gggg....', '.....kk.....', ''],
    bubble: ['', '.kkkkkkkkkk.', 'kqqqqqqqqqqk', 'kqqqqqqqqqqk', 'kqkkqkkqkkqk', 'kqkkqkkqkkqk', 'kqqqqqqqqqqk', '.kqkkkkkkkk.', '.kk.........', '.k..........', '', ''],
    ladder: ['..oy....oy..', '..oyyyyyyy..', '..oy....oy..', '..oy....oy..', '..oyyyyyyy..', '..oy....oy..', '..oy....oy..', '..oyyyyyyy..', '..oy....oy..', '..oy....oy..', '..oyyyyyyy..', '..oy....oy..'],
    campfire: ['.....g......', '......g.....', '.....r......', '....rry.....', '...rryyr....', '...ryyyyr...', '..rrywwyrr..', '..ryyyyyyr..', '.nmm.rr.mmn.', '..nmmmmmmn..', '.mmmnnnnmmm.', '.gg......gg.'],
    brokenheart: ['', '', '.kkk....kkk.', 'kqppk..kpppk', 'kqpppkkppppk', 'kppppkpppppk', '.kppppkpppk.', '..kppkpppk..', '...kppkpk...', '....kkpk....', '.....kk.....', ''],
    flag: ['..w.........', '..wbbbbb....', '..wbbbbbb...', '..wbbbbbbb..', '..wllllll...', '..wlllll....', '..w.........', '..w.........', '..w.........', '..w.........', '..w.........', '.www........'],
    flagpink: ['..w.........', '..wppppp....', '..wpppppp...', '..wppppppp..', '..wqqqqqq...', '..wqqqqq....', '..w.........', '..w.........', '..w.........', '..w.........', '..w.........', '.www........'],
    pin: ['...yyyyyy...', '..yyyyyyyy..', '.yyyywwyyyo.', '.yyywwwwyyo.', '.yyywwwwyyo.', '.yyyywwyyyo.', '..yyyyyyyo..', '...yyyyyo...', '....yyyo....', '.....yo.....', '............', '...llllll...'],
    hourglass: ['.kkkkkkkkkk.', '..kwwwwwwk..', '..kyyyyyyk..', '...kyyyyk...', '....kyyk....', '.....kk.....', '.....ky.....', '....kwyk....', '...kwwyyk...', '..kwyyyyyk..', '..kyyyyyyk..', '.kkkkkkkkkk.'],
    magnifier: ['', '..kkkk......', '.kwwllk.....', 'kwlllllk....', 'kllllllk....', 'kllllllk....', '.kllllk.....', '..kkkkkmm...', '.......mmn..', '........mmn.', '.........mmn', '..........nn'],
    heart: ['', '', '.kkk....kkk.', 'kqppk..kpppk', 'kqpppkkppppk', 'kppppppppppk', '.kppppppppk.', '..kppppppk..', '...kppppk...', '....kppk....', '.....kk.....', ''],
    wheel: ['....kkkk....', '..kkbbppkk..', '.kbbbbppppk.', '.kbbbbppppk.', 'kbbbbbpppppk', 'kbbbbkkppppk', 'kyyyykkllllk', 'kyyyyylllllk', '.kyyyyllllk.', '.kyyyyllllk.', '..kkyyllkk..', '....kkkk....']
  };
  var DATA = [
    { text: 'Шлю резюме, а ответов нет', fig: 'envelope', cap: 'письма в пустоту', br: [
      { t: 'резюме не показывает, что вы умеете', fig: 'diamond', cap: 'ценность, которую не видно', f: 'Находим и формулируем ваши результаты' },
      { t: 'сил на поиск почти не осталось', fig: 'battery', cap: 'батарейка на нуле', f: 'Сначала состояние, потом поиск' },
      { t: 'ищу совсем не то, чего хочу', fig: 'signpost', cap: 'указатели в разные стороны', f: 'Разбираемся, куда вы на самом деле идёте' }] },
    { text: 'Пашу за двоих, а повышают других', fig: 'shovel', cap: 'лопата и работа за двоих', br: [
      { t: 'ваш вклад никто не видит', fig: 'bulb', cap: 'вклад, который надо подсветить', f: 'Учимся показывать свои результаты' },
      { t: 'неловко просить за себя', fig: 'bubble', cap: 'несказанные слова', f: 'Работаем с тем, что мешает говорить о себе' },
      { t: 'не уверены, что хотите выше', fig: 'ladder', cap: 'а нужна ли эта лестница', f: 'Проверяем, ваша ли это цель' }] },
    { text: 'Сил нет, и непонятно почему', fig: 'tired', cap: 'просто усталость', br: [
      { t: 'это выгорание', fig: 'campfire', cap: 'горит, пока не сгорит', f: 'Возвращаем силы и смотрим, что их забирает' },
      { t: 'работа перестала быть про вас', fig: 'brokenheart', cap: 'сердце больше не лежит', f: 'Ищем, что для вас важно в работе' },
      { t: 'дело вообще не в работе', fig: 'wheel', cap: 'работа только часть колеса баланса', f: 'Смотрим на всю картину, а не только на карьеру' }] }
  ];
  var FAQ = [
    ['С какими запросами вы работаете?', 'Со всем, что касается работы и карьеры: поиск работы, смена сферы, рост в текущей роли, отношения с руководителем и командой, усталость и выгорание, связанные с работой, и вопрос «а чего я вообще хочу».'],
    ['С чем вы не работаете?', 'Не работаю с зависимостями и там, где нужна помощь врача. А вот кризисы, в том числе острые, это нормально: с ними я работаю.'],
    ['Вы гарантируете, что я найду работу?', 'Нет. Оффер зависит не только от нас с вами. Я гарантирую свою квалификацию, внимание к вашему запросу и честность в том, что вижу.'],
    ['Я не знаю, с чем прийти. Это нормально?', 'Да. Встреча-знакомство как раз для этого. В том числе может оказаться, что моя помощь вам не нужна, и тогда мы спокойно разойдёмся.'],
    ['Как подготовиться к встрече-знакомству?', 'Специально готовиться не нужно. Можно попробовать своими словами сформулировать, что вас беспокоит, что хотели бы получить и какой помощи ждёте от меня или похожего специалиста.'],
    ['Сколько встреч обычно нужно?', 'Зависит от запроса. Тренерский формат, когда нужно подготовиться к конкретному собеседованию или разговору: обычно 1-2 встречи. Коучинговый, когда ищем точку Б: 4-8 встреч. Психологический, когда мешают страхи и самосаботаж: обычно 8-10, но тут сложно запланировать заранее. Встречаемся, как правило, раз в неделю.'],
    ['Сколько стоит?', 'Встреча-знакомство бесплатная. Сессия (55 минут) стоит 6 000 ₽ или 75 €.'],
    ['Это конфиденциально?', 'Да. Всё, о чём мы говорим на встречах, остаётся строго между нами.']
  ];

  function rnd(i, s) { var x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return x - Math.floor(x); }
  function cellsOf(name) {
    var rows = FIGS[name], H = rows.length, W = 0, out = [];
    rows.forEach(function (r) { W = Math.max(W, r.length); });
    if (H === 12) W = Math.max(W, 12);
    for (var r = 0; r < H; r++) {
      var row = (rows[r] || ''); while (row.length < W) row += '.';
      for (var c = 0; c < W; c++) { var col = PAL[row[c]]; if (col) out.push({ col: c, row: r, color: col }); }
    }
    return { cells: out, W: W, H: H };
  }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  /* ---------- пересборка ---------- */
  var st = { p: -1, b: -1, scatter: true, seed: 1 };
  var POOL = 120, CHAOS = ['#2B4BFF', '#FF5FA8', '#FFD23F', '#12183A', '#8FA4FF', '#9FA29A'];
  var L1 = [{ x: 4, y: 105 }, { x: 52, y: 180 }, { x: 96, y: 115 }];
  var L2 = [{ x: 6, y: 395 }, { x: 50, y: 465 }, { x: 94, y: 385 }];
  var F = { x: 50, y: 730 };
  var $ = function (id) { return document.getElementById(id); };
  var box = $('figbox'), pool = [];
  for (var i = 0; i < POOL; i++) {
    var s = el('span', 'px');
    s.style.width = 'calc(' + (100 / 12) + '% + 0.5px)'; s.style.height = s.style.width;
    s.style.setProperty('--dl', Math.round(rnd(i, 9) * 240) + 'ms');
    box.appendChild(s); pool.push(s);
  }
  var labels = [[18, 'Шаг 1. Снаружи: ваша фраза'], [290, 'Шаг 2. А может, дело в том, что'], [555, 'Шаг 3. С этим будем работать']].map(function (l) {
    var d = el('div', 'lbl'); d.style.top = l[0] + 'px';
    var b = el('span', 'blink'); b.setAttribute('aria-hidden', 'true');
    d.appendChild(b); d.appendChild(el('span', null, l[1])); $('labels').appendChild(d); return { d: d, b: b };
  });
  var b1 = DATA.map(function (n, i) {
    var b = el('button', 'node l1', '«' + n.text + '»'); b.type = 'button';
    b.style.left = L1[i].x + '%'; b.style.top = L1[i].y + 'px'; b.style.transform = 'translate(-' + L1[i].x + '%,-50%)';
    b.addEventListener('click', function () { go({ p: i, b: -1 }, 2); });
    $('l1').appendChild(b); return b;
  });
  var b2 = [0, 1, 2].map(function (i) {
    var b = el('button', 'node l2'); b.type = 'button';
    b.style.left = L2[i].x + '%'; b.style.top = L2[i].y + 'px'; b.style.transform = 'translate(-' + L2[i].x + '%,-50%)';
    b.addEventListener('click', function () { if (st.p >= 0) go({ b: i }, 3); });
    $('l2').appendChild(b); return b;
  });

  var tGlide;
  function go(next, target, scatter) {
    clearTimeout(tGlide);
    if (next.p != null) st.p = next.p;
    st.b = next.b;
    st.scatter = !!scatter;
    if (scatter) st.seed++;
    render();
    if (target) tGlide = setTimeout(function () { glide(target === 2 ? $('l2anchor') : $('l3anchor')); }, 500);
  }
  function glide(target) {
    var vh = window.innerHeight || 800, top = target.getBoundingClientRect().top;
    if (top < vh * 0.62) return;
    var se = document.scrollingElement || document.documentElement, from = se.scrollTop, dist = top - vh * 0.6;
    if (reduce) { se.scrollTop = from + dist; return; }
    var t0 = performance.now(), dur = 1100;
    var ease = function (x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
    (function step(now) { var k = Math.min(1, (now - t0) / dur); se.scrollTop = from + dist * ease(k); if (k < 1) requestAnimationFrame(step); })(t0);
  }

  function render() {
    var p = st.p, b = st.b, fig = null, layer = 'хаос', cap = 'выберите фразу';
    if (p >= 0 && b < 0) { fig = DATA[p].fig; layer = 'снаружи'; cap = DATA[p].cap; }
    if (p >= 0 && b >= 0) { fig = DATA[p].br[b].fig; layer = 'внутри'; cap = DATA[p].br[b].cap; }
    var target = fig ? cellsOf(fig).cells : [];
    pool.forEach(function (s, i) {
      var t = target[i], on = t && !st.scatter;
      var col = on ? t.col : 0.5 + rnd(i, st.seed * 3 + 1) * 11, row = on ? t.row : 0.5 + rnd(i, st.seed * 3 + 2) * 11;
      var rot = on ? 0 : (rnd(i, st.seed * 3 + 3) - 0.5) * 140;
      s.style.left = (col * 100 / 12) + '%'; s.style.top = (row * 100 / 12) + '%';
      s.style.background = t ? t.color : CHAOS[i % CHAOS.length];
      s.style.opacity = (fig ? !!t : i < 64) ? '1' : '0';
      s.style.transform = 'rotate(' + rot + 'deg) scale(' + (on ? 1 : 0.7) + ')';
    });
    $('layer').textContent = layer; $('caption').textContent = cap;

    var step = p < 0 ? 1 : (b < 0 ? 2 : 3);
    labels.forEach(function (l, i) { l.d.classList.toggle('on', i + 1 === step); l.d.classList.toggle('done', i + 1 <= step); l.b.hidden = i + 1 !== step; });
    b1.forEach(function (btn, i) { btn.setAttribute('aria-pressed', i === p ? 'true' : 'false'); btn.classList.toggle('dim', p >= 0 && i !== p); });
    b2.forEach(function (btn, i) {
      var n = p >= 0 ? DATA[p].br[i] : null;
      btn.textContent = n ? n.t : '?'; btn.disabled = !n;
      btn.classList.toggle('empty', !n);
      btn.setAttribute('aria-pressed', i === b ? 'true' : 'false');
      btn.classList.toggle('dim', !!n && b >= 0 && i !== b);
      if (!n) btn.setAttribute('aria-label', 'Сначала выберите фразу'); else btn.removeAttribute('aria-label');
    });

    var g = $('dash'); g.textContent = '';
    function line(x1, y1, x2, y2, c, dash) {
      var l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      [['x1', x1], ['y1', y1], ['x2', x2], ['y2', y2], ['stroke', c], ['stroke-width', 1.5], ['stroke-dasharray', dash], ['vector-effect', 'non-scaling-stroke']].forEach(function (a) { l.setAttribute(a[0], a[1]); });
      g.appendChild(l);
    }
    if (p >= 0) L2.forEach(function (pt, i) { if (i !== b) line(L1[p].x, L1[p].y, pt.x, pt.y, '#12183A', '6 6'); });
    if (p >= 0 && b < 0) L2.forEach(function (pt) { line(pt.x, pt.y, F.x, F.y, '#9FA29A', '4 8'); });
    var rp = [[3, 0]];
    rp.push(p >= 0 ? [L1[p].x, L1[p].y] : [12, 70]);
    if (b >= 0) { rp.push([L2[b].x, L2[b].y], [F.x, F.y], [30, 870]); }
    $('route').setAttribute('points', rp.map(function (q) { return q[0] + ',' + q[1]; }).join(' '));

    var fin = $('final'); fin.textContent = '';
    if (b >= 0) {
      fin.className = 'final full';
      fin.appendChild(el('span', 'cap', 'пересборка'));
      fin.appendChild(el('span', 'big', DATA[p].br[b].f));
      var row = el('div', 'row');
      var a = el('a', 'go', 'Разобрать на бесплатной встрече'); a.href = TG; a.target = '_blank'; a.rel = 'noopener';
      var again = el('button', 'again', 'Рассыпать заново'); again.type = 'button';
      again.addEventListener('click', function () { go({ p: -1, b: -1 }, 0, true); });
      row.appendChild(a); row.appendChild(again); fin.appendChild(row);
    } else {
      fin.className = 'final wait';
      fin.textContent = 'Здесь соберётся то, с чем мы будем работать';
    }
  }
  render();

  /* ---------- фигурки ниже: собираются при входе в экран, рассыпаются при выходе ---------- */
  var sprites = [].slice.call(document.querySelectorAll('.spr[data-fig]')).map(function (host) {
    var f = cellsOf(host.dataset.fig), salt = +host.dataset.salt;
    var spans = f.cells.map(function (c, i) {
      var s = el('span', 'px');
      s.style.width = 'calc(' + (100 / f.W) + '% + 0.5px)'; s.style.height = 'calc(' + (100 / f.H) + '% + 0.5px)';
      s.style.background = c.color; s.style.setProperty('--dl', Math.round(rnd(i, salt + 11) * 450) + 'ms');
      host.appendChild(s); return s;
    });
    function set(done) {
      f.cells.forEach(function (c, i) {
        var s = spans[i];
        var col = done ? c.col : -2 + rnd(i, salt) * (f.W + 3), row = done ? c.row : -2 + rnd(i, salt + 7) * (f.H + 3);
        s.style.left = (col * 100 / f.W) + '%'; s.style.top = (row * 100 / f.H) + '%';
        s.style.opacity = done ? '1' : '0.85';
        s.style.transform = 'rotate(' + (done ? 0 : (rnd(i, salt + 3) - 0.5) * 160) + 'deg) scale(' + (done ? 1 : 0.7) + ')';
      });
    }
    set(reduce || !('IntersectionObserver' in window));
    return { host: host, set: set };
  });
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var sp = sprites.filter(function (x) { return x.host === e.target; })[0]; if (sp) sp.set(e.isIntersecting); });
    }, { threshold: 0.35 });
    sprites.forEach(function (sp) { io.observe(sp.host); });
  }

  /* ---------- форматы ---------- */
  $('many').addEventListener('click', function () {
    var open = this.getAttribute('aria-expanded') !== 'true';
    this.setAttribute('aria-expanded', open ? 'true' : 'false'); $('fmts').hidden = !open;
  });

  /* ---------- вопрос-ответ ---------- */
  var shifts = ['0', '6%', '2%', '9%', '4%', '7%', '1%', '5%'], items = [];
  FAQ.forEach(function (x, i) {
    var it = el('div', 'it'); it.style.marginLeft = shifts[i];
    var btn = el('button'); btn.type = 'button'; btn.id = 'q' + i; btn.setAttribute('aria-controls', 'a' + i);
    btn.appendChild(el('span', null, x[0]));
    var m = el('span', 'sqm'); m.setAttribute('aria-hidden', 'true'); btn.appendChild(m);
    var ans = el('p', null, x[1]); ans.id = 'a' + i;
    it.appendChild(btn); it.appendChild(ans); $('qa').appendChild(it);
    btn.addEventListener('click', function () { openFaq(it.classList.contains('open') ? -1 : i); });
    items.push({ it: it, btn: btn, ans: ans });
  });
  function openFaq(k) { items.forEach(function (x, i) { var o = i === k; x.it.classList.toggle('open', o); x.btn.setAttribute('aria-expanded', o ? 'true' : 'false'); x.ans.hidden = !o; }); }
  openFaq(0);

  /* ---------- отзывы ---------- */
  if (SHOW_REVIEWS) $('reviews').hidden = false;

  /* ---------- наверх ---------- */
  var arrow = ['...w...', '..www..', '.w.w.w.', 'w..w..w', '...w...', '...w...', '...w...'];
  arrow.forEach(function (row, r) { row.split('').forEach(function (ch, c) { if (ch === 'w') { var d = el('i'); d.style.left = c * 3 + 'px'; d.style.top = r * 3 + 'px'; $('arrow').appendChild(d); } }); });
  var top = $('totop');
  addEventListener('scroll', function () { top.classList.toggle('on', (document.scrollingElement || document.documentElement).scrollTop > 500); }, { passive: true });
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
})();

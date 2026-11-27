/* 年表（鴻山／北斎の2段）と日本地図。データは「追加素材と視覚設計」メモの年表から。年齢は数え年 */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* 区分：学ぶ／救う／支援／献金／教える。家・生涯・晩年は灰色 */
  var CATS = {
    learn:   { c: '#6f9ad8', ja: '学ぶ', en: 'Learn' },
    save:    { c: '#7cc3ad', ja: '救う', en: 'Relief' },
    support: { c: '#ffffff', ja: '支援', en: 'Patronage' },
    gift:    { c: '#d8452f', ja: '献金', en: 'Gifts' },
    teach:   { c: '#b79be3', ja: '教える', en: 'Teach' },
    life:    { c: '#7d8594', ja: '', en: '' }
  };
  var K = [ // 鴻山の段
    { y: 1783, cat: 'save', ja: '祖父が天明の飢饉で蔵を開く。404両あまりを献じ、600両を無利子で貸す', en: 'Famine: his grandfather gives 404 ryō and lends 600 without interest' },
    { y: 1806, a: 1, cat: 'life', ja: '3月15日、小布施村に生まれる（北斎47歳）', en: 'Born in Obuse, 15 March (Hokusai is 47)' },
    { y: 1820, a: 15, cat: 'learn', ja: '京都に遊学（書・絵・和歌・儒学）', en: 'Leaves to study in Kyoto' },
    { y: 1827, a: 22, cat: 'learn', ja: '再び京都へ。梁川星巌に漢詩を学ぶ', en: 'Kyoto again: Chinese verse with Yanagawa Seigan' },
    { y: 1833, a: 28, cat: 'learn', ja: '江戸で佐藤一斎に学ぶ。北斎と知り合ったとされる', en: 'Edo, under Satō Issai; said to meet Hokusai' },
    { y: 1836, a: 31, cat: 'save', ja: '天保の大飢饉。帰郷して父と倉を開き、窮民を救う', en: 'Great Tenpō Famine: opens the storehouses with his father' },
    { y: 1840, a: 35, cat: 'life', ja: '父が没し、当主になる', en: 'His father dies; he heads the house' },
    { y: 1842, a: 37, cat: 'support', ja: '北斎（83歳）が小布施に来て、鴻山宅に滞在', en: 'Hokusai, 83, comes to Obuse and stays with him' },
    { y: 1844, a: 39, cat: 'support', ja: '北斎が再び来る。東町祭屋台の天井絵', en: 'Hokusai returns: the Higashimachi float ceiling' },
    { y: 1845, a: 40, cat: 'support', ja: '上町祭屋台を私財で建造。天井絵は北斎（86歳）', en: 'Pays for the Kanmachi float; Hokusai, 86, paints its ceiling' },
    { y: 1847, a: 42, cat: 'save', ja: '善光寺大地震で救恤金500両。九條家に100両', en: 'Zenkōji earthquake: 500 ryō in relief; 100 ryō to the Kujō family' },
    { y: 1848, a: 43, cat: 'support', ja: '岩松院の天井絵「鳳凰図」（北斎89歳）が完成したとされる', en: 'Ganshō-in Phoenix ceiling said to be finished (Hokusai, 89)' },
    { y: 1853, a: 48, cat: 'gift', ja: 'ペリー来航。品川台場の築造に籾を献上', en: 'After Perry: rice for the Shinagawa forts' },
    { y: 1860, a: 55, cat: 'gift', ja: '和宮の降嫁に献金', en: 'A gift for Princess Kazu’s wedding' },
    { y: 1866, a: 61, cat: 'gift', ja: '幕府に1万両の献金を約束', en: 'Promises the shogunate 10,000 ryō' },
    { y: 1869, a: 64, cat: 'gift', ja: '新政府から「献金は不要、税を納めよ」。実際の額は不明', en: 'New government: “no gift, pay tax.” Amount paid unknown' },
    { y: 1871, a: 66, cat: 'life', ja: '文部省・東京府に出仕（家族を養うため）', en: 'Takes a government post to support his family' },
    { y: 1876, a: 71, cat: 'life', ja: '東京で私塾を開くが、生活が切迫して閉校', en: 'Opens a school in Tokyo; closes it for lack of money' },
    { y: 1878, a: 73, cat: 'life', ja: '自宅火災。蔵書・家宝の大部分を焼失', en: 'House fire: most books and heirlooms lost' },
    { y: 1879, a: 74, cat: 'teach', ja: '長野に私塾「高矣義塾」を開く', en: 'Opens a private school in Nagano, Takai Gijuku' },
    { y: 1883, a: 78, cat: 'life', ja: '2月6日没。葬儀に236名', en: 'Dies 6 February; 236 people at his funeral' }
  ];
  var HK = [ // 北斎の段
    { y: 1806, a: 47, ja: '北斎47歳', en: 'Hokusai, 47' },
    { y: 1831, a: 72, ja: '冨嶽三十六景（1831年頃）', en: 'Thirty-six Views of Mt Fuji (c. 1831)' },
    { y: 1834, a: 75, ja: '『富嶽百景』で「画狂老人卍」と名乗る', en: 'Signs himself “old man mad about painting”' },
    { y: 1842, a: 83, ja: '83歳。初めて小布施へ', en: 'At 83, first visit to Obuse' },
    { y: 1845, a: 86, ja: '86歳。上町祭屋台の天井絵', en: 'At 86, the Kanmachi float ceiling' },
    { y: 1848, a: 89, ja: '89歳。岩松院「鳳凰図」とされる', en: 'At 89, the Ganshō-in Phoenix (attributed)' },
    { y: 1849, a: 90, ja: '90歳で没。絶筆『富士越龍』', en: 'Dies at 90. Last work: Dragon over Mt Fuji' }
  ];
  var Y0 = 1780, Y1 = 1886;

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, ja, en, cls, anchor) {
    var g = el('g', { 'class': cls || '' }, parent);
    [['ja', ja], ['en', en == null ? ja : en]].forEach(function (p) {
      var t = el('text', { x: x, y: y, 'class': p[0], 'text-anchor': anchor || 'middle' }, g);
      t.textContent = p[1];
    });
    return g;
  }

  /* ---------- 年表 ---------- */
  function build(box) {
    var mini = box.classList.contains('tl-mini');
    var W = 1920, H = mini ? 230 : 860, L = mini ? 150 : 230, R = mini ? 1860 : 1800;
    var X = function (y) { return L + (y - Y0) / (Y1 - Y0) * (R - L); };
    var yk = mini ? 82 : 300, yh = mini ? 168 : 600;
    var hl = (box.dataset.hl || '').split('-').map(Number);
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'tl-svg', preserveAspectRatio: 'xMidYMid meet' }, null);

    if (hl[0]) {
      var a = X(hl[0]) - 16, b = X(hl[1] || hl[0]) + 16;
      el('rect', { x: a, y: 6, width: b - a, height: H - (mini ? 34 : 120), rx: 10, 'class': 'tl-hl' }, svg);
    }
    for (var y = 1790; y <= 1880; y += 10) {
      el('line', { x1: X(y), x2: X(y), y1: yk - (mini ? 26 : 70), y2: yh + (mini ? 20 : 60), 'class': 'tl-grid' }, svg);
      if (!mini || y % 20 === 0) { var t = el('text', { x: X(y), y: H - (mini ? 4 : 70), 'class': 'tl-year', 'text-anchor': 'middle' }, svg); t.textContent = y; }
    }
    txt(svg, L - 30, yk + 10, '鴻山', 'Kōzan', 'tl-lane', 'end');
    txt(svg, L - 30, yh + 10, '北斎', 'Hokusai', 'tl-lane', 'end');
    el('line', { x1: X(1806), x2: X(1883), y1: yk, y2: yk, 'class': 'tl-life k' }, svg);
    el('line', { x1: L - 6, x2: X(1849), y1: yh, y2: yh, 'class': 'tl-life h' }, svg);
    el('line', { x1: X(1842), x2: X(1842), y1: yk, y2: yh, 'class': 'tl-link' }, svg);

    var tip = box.querySelector('.tl-tip');
    function dot(ev, cy, cls, color, i) {
      var inHl = hl[0] && ev.y >= hl[0] && ev.y <= (hl[1] || hl[0]);
      var g = el('g', { 'class': 'tl-ev ' + cls + (hl[0] ? (inHl ? ' on' : ' off') : ''), 'data-year': ev.y, style: '--i:' + i }, svg);
      el('circle', { cx: X(ev.y), cy: cy, r: mini ? 22 : 26, 'class': 'tl-hit' }, g);
      el('circle', { cx: X(ev.y), cy: cy, r: mini ? 8 : 11, fill: color, 'class': 'tl-dot' }, g);
      g.addEventListener('mouseenter', function () { show(ev, X(ev.y), cy); });
      g.addEventListener('mouseleave', hide);
      g.addEventListener('click', function (e) { e.stopPropagation(); show(ev, X(ev.y), cy); });
      return g;
    }
    function show(ev, x, y) {
      if (!tip) return;
      var r = svg.getBoundingClientRect(), bx = box.getBoundingClientRect();
      var s = r.width / W;
      tip.innerHTML = '<b>' + ev.y + (ev.a ? '<span class="ja">　' + (ev.h ? '北斎' : '鴻山') + ev.a + '歳</span><span class="en"> · ' + (ev.h ? 'Hokusai' : 'Kōzan') + ' ' + ev.a + '</span>' : '') +
        '</b><span class="ja">' + ev.ja + '</span><span class="en">' + ev.en + '</span>';
      tip.style.left = (r.left - bx.left + x * s) + 'px';
      tip.style.top = (r.top - bx.top + y * s) + 'px';
      tip.classList.add('on');
    }
    function hide() { if (tip) tip.classList.remove('on'); }

    K.forEach(function (ev, i) { dot(ev, yk, 'k c-' + ev.cat, CATS[ev.cat].c, i); });
    HK.forEach(function (ev, i) { var e2 = { y: ev.y, a: ev.a, ja: ev.ja, en: ev.en, h: 1 }; dot(e2, yh, 'h', '#6f9ad8', K.length + i); });

    if (!mini) {
      [[1806, '誕生', 'Born'], [1836, '31歳', '31'], [1842, '37歳', '37'], [1866, '61歳', '61'], [1879, '74歳', '74']].forEach(function (p) {
        txt(svg, X(p[0]), yk - 44, p[1], p[2], 'tl-age');
      });
      var lx = L, ly = H - 8;
      ['learn', 'save', 'support', 'gift', 'teach'].forEach(function (k, i) {
        var gx = lx + i * 250;
        el('circle', { cx: gx, cy: ly - 10, r: 10, fill: CATS[k].c }, svg);
        txt(svg, gx + 22, ly, CATS[k].ja, CATS[k].en, 'tl-leg', 'start');
      });
    }
    box.insertBefore(svg, box.firstChild);
  }

  /* ---------- 日本地図 ---------- */
  var P = { obuse: [138.31, 36.70], edo: [139.77, 35.69], kyoto: [135.77, 35.01], osaka: [135.50, 34.69] };
  function xy(ll) { var M = window.KOZAN_MAP; return [(ll[0] - M.lon0) * M.kx, (M.lat1 - ll[1]) * M.ky]; }
  function curve(a, b, bend) {
    var p = xy(a), q = xy(b), mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    var dx = q[0] - p[0], dy = q[1] - p[1];
    return 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' Q' + (mx - dy * bend).toFixed(1) + ' ' + (my + dx * bend).toFixed(1) + ' ' + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
  }
  function buildMap(box) {
    var M = window.KOZAN_MAP; if (!M) return;
    var portrait = window.matchMedia('(orientation: portrait)');
    var svg = el('svg', { viewBox: '0 0 1920 1080', 'class': 'jp' }, null);
    var fitMode = function () { svg.setAttribute('preserveAspectRatio', portrait.matches ? 'xMidYMid meet' : 'xMidYMid slice'); };
    fitMode();
    if (portrait.addEventListener) portrait.addEventListener('change', fitMode);
    el('path', { d: M.d, 'class': 'jp-land' }, svg);
    var kind = box.dataset.map;
    var city = function (key, ja, en, dx, dy, anchor, b, d) {
      var p = xy(P[key]);
      var g = el('g', { 'class': 'bd fade', 'data-b': b, style: '--d:' + d + 's' }, svg);
      el('circle', { cx: p[0], cy: p[1], r: 11, 'class': 'jp-dot' }, g);
      txt(g, p[0] + dx, p[1] + dy, ja, en, 'jp-city', anchor);
    };
    var line = function (d, b, delay, cls) {
      el('path', { d: d, pathLength: 1, 'class': 'ln bd fade ' + (cls || ''), 'data-b': b, style: '--d:' + delay + 's' }, svg);
    };
    if (kind === 'trade') {
      var river = [[138.25, 36.40], [138.29, 36.62], [138.31, 36.70], [138.36, 36.85], [138.62, 37.02], [138.75, 37.13], [138.80, 37.31], [138.85, 37.45], [138.95, 37.70], [139.04, 37.92]]
        .map(function (ll, i) { var p = xy(ll); return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      el('path', { d: river, pathLength: 1, 'class': 'ln river bd fade', 'data-b': 0, style: '--d:.4s' }, svg);
      var rp = xy([138.95, 37.25]);
      txt(el('g', { 'class': 'bd fade', 'data-b': 0, style: '--d:1.6s' }, svg), rp[0] + 40, rp[1], '千曲川の舟運', 'Chikuma River boats', 'jp-note', 'start');
      line(curve(P.obuse, P.edo, -0.18), 2, 0.1);
      line(curve(P.obuse, P.kyoto, 0.16), 2, 0.4);
      line(curve(P.kyoto, P.osaka, 0.2), 2, 1.4);
      city('edo', '江戸', 'Edo', 26, 16, 'start', 2, 1.6);
      city('kyoto', '京都', 'Kyoto', -26, -18, 'end', 2, 1.9);
      city('osaka', '大坂', 'Osaka', -26, 46, 'end', 2, 2.2);
    } else if (kind === 'study') {
      line(curve(P.obuse, P.kyoto, 0.2), 1, 0.1);
      line(curve(P.obuse, P.kyoto, -0.05), 2, 0.1);
      line(curve(P.obuse, P.edo, -0.22), 3, 0.1);
      line(curve(P.edo, P.obuse, -0.22), 4, 0.1, 'home');
      city('kyoto', '京都', 'Kyoto', -26, -18, 'end', 1, 1.2);
      city('edo', '江戸', 'Edo', 26, 16, 'start', 3, 1.2);
      var k = xy(P.kyoto), e = xy(P.edo), o = xy(P.obuse);
      txt(el('g', { 'class': 'bd fade', 'data-b': 1, style: '--d:.9s' }, svg), (k[0] + o[0]) / 2 - 150, (k[1] + o[1]) / 2 + 40, '1820', '1820', 'jp-yr');
      txt(el('g', { 'class': 'bd fade', 'data-b': 2, style: '--d:.9s' }, svg), (k[0] + o[0]) / 2 + 30, (k[1] + o[1]) / 2 - 20, '1827', '1827', 'jp-yr');
      txt(el('g', { 'class': 'bd fade', 'data-b': 3, style: '--d:.9s' }, svg), (e[0] + o[0]) / 2 + 120, (e[1] + o[1]) / 2 - 10, '1833', '1833', 'jp-yr');
      txt(el('g', { 'class': 'bd fade', 'data-b': 4, style: '--d:.9s' }, svg), (e[0] + o[0]) / 2 - 60, (e[1] + o[1]) / 2 + 60, '1836 帰郷', '1836 home', 'jp-yr home');
    } else if (kind === 'where') {
      // 東京との距離：小布施（36.70N 138.31E）と日本橋（35.69N 139.77E）の直線距離は約173km
      var o1 = xy(P.obuse), t1 = xy(P.edo);
      line('M' + o1[0].toFixed(1) + ' ' + o1[1].toFixed(1) + ' L' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1), 0, .6, 'home');
      city('edo', '東京', 'Tokyo', 26, 16, 'start', 0, 1.4);
      txt(el('g', { 'class': 'bd fade', 'data-b': 0, style: '--d:1.8s' }, svg), (o1[0] + t1[0]) / 2 + 36, (o1[1] + t1[1]) / 2 - 10, '直線で約170km', '170 km in a straight line', 'jp-note', 'start');
    } else if (kind === 'journey') {
      line(curve(P.edo, P.obuse, 0.18), 0, .8);
      city('edo', '江戸', 'Edo', 26, 16, 'start', 0, .2);
    }
    var o2 = xy(P.obuse);
    el('circle', { cx: o2[0], cy: o2[1], r: 15, 'class': 'jp-pulse' }, svg);
    el('circle', { cx: o2[0], cy: o2[1], r: 13, 'class': 'jp-home' }, svg);
    txt(svg, o2[0] + 30, o2[1] - 18, '小布施', 'Obuse', 'jp-obuse', 'start');
    box.appendChild(svg);
  }

  window.KOZAN_TL = { build: build, buildMap: buildMap, CATS: CATS };
  document.querySelectorAll('.tlx').forEach(build);
  document.querySelectorAll('[data-map]').forEach(buildMap);
})();

/* 小布施の地形図：標高画像の上に、川・町境・地点・模式線を重ねる（データは obuse-map.js）
   各 .terra の data-crop（wide / town）と、svg の中の <g data-draw="..."> で描くものを決める。
   「かつての流れ」「千両堤」「谷街道」の線は位置を示す模式図で、測量に基づく線ではない。 */
(function () {
  'use strict';
  var M = window.OBUSE_MAP;
  if (!M) return;
  var NS = 'http://www.w3.org/2000/svg';
  var T = Math.pow(2, M.z) * 256;
  function GX(lon) { return (lon + 180) / 360 * T; }
  function GY(lat) { var r = lat * Math.PI / 180; return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * T; }
  function P(c, lon, lat) {
    return [(GX(lon) - GX(c.lonW)) / (GX(c.lonE) - GX(c.lonW)) * c.w, (GY(lat) - GY(c.latN)) / (GY(c.latS) - GY(c.latN)) * c.h];
  }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function pathD(c, flat, close) {
    var s = '';
    for (var i = 0; i < flat.length; i += 2) {
      var p = P(c, flat[i], flat[i + 1]);
      s += (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    }
    return s + (close ? 'Z' : '');
  }
  function label(g, c, lon, lat, ja, en, cls, anchor, dx, dy) {
    var p = P(c, lon, lat), t = el('g', { 'class': 't-lab ' + (cls || '') }, g);
    [['ja', ja], ['en', en]].forEach(function (q) {
      var e = el('text', { x: (p[0] + (dx || 0)).toFixed(1), y: (p[1] + (dy || 0)).toFixed(1), 'text-anchor': anchor || 'start', 'class': q[0] }, t);
      e.textContent = q[1];
    });
    return t;
  }
  function arrowHead(g, c, a, b, size, cls) {
    var p = P(c, a[0], a[1]), q = P(c, b[0], b[1]);
    var ang = Math.atan2(q[1] - p[1], q[0] - p[0]), s = size || 26;
    var x1 = q[0] - s * Math.cos(ang - 0.45), y1 = q[1] - s * Math.sin(ang - 0.45);
    var x2 = q[0] - s * Math.cos(ang + 0.45), y2 = q[1] - s * Math.sin(ang + 0.45);
    el('path', { d: 'M' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + 'L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + 'Z', 'class': cls || 't-arrow' }, g);
  }
  // 川の線の上で、ある経度（または緯度）にいちばん近い点
  function riverPoint(key, lon, lat) {
    var best = null, bd = 1e9;
    M.rivers[key].forEach(function (part) {
      for (var i = 0; i < part.length; i += 2) {
        var d = lat == null ? Math.abs(part[i] - lon) : (lon == null ? Math.abs(part[i + 1] - lat) : Math.abs(part[i] - lon) + Math.abs(part[i + 1] - lat));
        if (d < bd) { bd = d; best = [part[i], part[i + 1]]; }
      }
    });
    return best;
  }

  /* 模式線（[経度, 緯度] の並び） */
  var SCHEM = {
    // 町の資料：かつての松川は町の中心部を通り、北西（松村・六川・中条・清水）へ流れた
    old: [138.3445, 36.6800, 138.3335, 36.6858, 138.3245, 36.6912, 138.3172, 36.6950, 138.3085, 36.7008, 138.2992, 36.7080],
    // 町の資料：千両堤は町の南東部に築かれた（いまの松川の北岸に沿わせて描く）
    levee: [138.3400, 36.6830, 138.3332, 36.6830, 138.3292, 36.6843, 138.3254, 36.6862, 138.3212, 36.6890],
    // 谷街道：須坂（南）から町の中心を通り、中野（北東）へ
    road: [138.3108, 36.6795, 138.3150, 36.6898, 138.3172, 36.6950, 138.3212, 36.7035, 138.3270, 36.7108]
  };

  var DRAW = {
    'river:chikuma': function (g, c) { M.rivers.chikuma.forEach(function (p) { el('path', { d: pathD(c, p), 'class': 'r-ck' }, g); }); },
    'river:shinoi': function (g, c) { M.rivers.shinoi.forEach(function (p) { el('path', { d: pathD(c, p), 'class': 'r-sh' }, g); }); },
    'river:matsukawa': function (g, c) {
      M.rivers.matsukawa.forEach(function (p) { el('path', { d: pathD(c, p), 'class': 'r-mk' }, g); });
      if (g.classList.contains('hot')) M.rivers.matsukawa.forEach(function (p) { el('path', { d: pathD(c, p), 'class': 'r-flow' }, g); });
    },
    'label:chikuma': function (g, c, k) {
      var p = riverPoint('chikuma', null, k === 'wide' ? 36.728 : 36.705);
      label(g, c, p[0], p[1], '千曲川', 'Chikuma River', 'river', 'end', -30, 0);
    },
    'label:matsukawa': function (g, c, k) {
      var p = riverPoint('matsukawa', k === 'wide' ? 138.392 : 138.356, null);
      label(g, c, p[0], p[1], '松川', 'Matsukawa', 'river', 'middle', 0, -30);
    },
    'label:fan': function (g, c) {
      label(g, c, 138.3320, 36.6765, '扇状地', 'Alluvial fan', 'big', 'middle', 0, 0);
      label(g, c, 138.3320, 36.6765, '水はけのよい砂と石の土', 'Sand and gravel that drain fast', 'small', 'middle', 0, 48);
    },
    'peak:kariya': function (g, c) {
      var p = P(c, 138.33994, 36.68901), s = 18;
      el('path', { d: 'M' + p[0].toFixed(1) + ' ' + (p[1] - s).toFixed(1) + 'l' + s + ' ' + (s * 1.7).toFixed(1) + 'h' + (-2 * s) + 'Z', 'class': 't-peak' }, g);
      label(g, c, 138.33994, 36.68901, '雁田山', 'Mt Kariya', 'small', 'start', 26, -14);
    },
    'poi:zenkoji': function (g, c) {
      var p = P(c, 138.18753, 36.65748);
      el('circle', { cx: p[0], cy: p[1], r: 10, 'class': 't-dot' }, g);
      label(g, c, 138.18753, 36.65748, '長野・善光寺', 'Nagano (Zenkōji)', 'small', 'start', 22, 10);
    },
    'poi:center': function (g, c, k) {
      var lon = 138.31703, lat = 36.69476, p = P(c, lon, lat);
      el('circle', { cx: p[0], cy: p[1], r: 13, 'class': 't-dot' }, g);
      if (k === 'wide') label(g, c, lon, lat, '小布施', 'Obuse', 'big', 'start', 26, -14);
      else {
        label(g, c, lon, lat, '町の中心', 'Town centre', '', 'start', 26, -14);
        label(g, c, lon, lat, '北斎館・高井鴻山記念館', 'Hokusai Museum, Kōzan Museum', 'small sub2', 'start', 26, 26);
      }
    },
    'poi:gansho': function (g, c) {
      var p = P(c, 138.33388, 36.69846);
      el('circle', { cx: p[0], cy: p[1], r: 11, 'class': 't-dot' }, g);
      label(g, c, 138.33388, 36.69846, '岩松院', 'Ganshō-in', 'small', 'start', 22, -12);
    },
    'apex': function (g, c) {
      var p = P(c, 138.3445, 36.6800);
      el('circle', { cx: p[0], cy: p[1], r: 22, 'class': 't-apex' }, g);
      label(g, c, 138.3445, 36.6800, '扇のかなめ', 'Fan apex', 'small', 'start', 34, 44);
    },
    'boundary': function (g, c) {
      el('path', { d: pathD(c, M.boundary, true), 'class': 't-bnd' }, g);
      var sx = 0, sy = 0, n = M.boundary.length / 2;
      for (var i = 0; i < M.boundary.length; i += 2) { sx += M.boundary[i]; sy += M.boundary[i + 1]; }
      label(g, c, sx / n, sy / n, '小布施町', 'Obuse town', 'big', 'middle', -40, 0);
      label(g, c, sx / n, sy / n, '19.12km²', '19.12 km²', 'small', 'middle', -40, 46);
    },
    'upstream': function (g, c) {
      var a = [138.3452, 36.6807], b = [138.3600, 36.6837];
      el('path', { d: pathD(c, [a[0], a[1], b[0], b[1]]), 'class': 't-old', style: 'stroke-dasharray:none;stroke-width:6' }, g);
      arrowHead(g, c, a, b, 30);
      label(g, c, b[0], b[1], '上流：硫黄を掘った山へ', 'Upstream: old sulphur mines', 'small', 'end', -10, -34);
      label(g, c, b[0], b[1], '酸性の強い水', 'Strongly acidic water', 'small', 'end', -10, 52);
    },
    'old': function (g, c) {
      var s = SCHEM.old;
      el('path', { d: pathD(c, s), 'class': 't-old' }, g);
      arrowHead(g, c, [s[s.length - 4], s[s.length - 3]], [s[s.length - 2], s[s.length - 1]], 28);
      label(g, c, s[s.length - 2], s[s.length - 1], 'かつての松川（模式）', 'Old course (schematic)', 'small', 'start', 30, -6);
    },
    'levee': function (g, c) {
      el('path', { d: pathD(c, SCHEM.levee), 'class': 't-levee' }, g);
      label(g, c, SCHEM.levee[0], SCHEM.levee[1], '千両堤', 'Senryō levee', '', 'start', 30, 54);
    },
    'road': function (g, c) {
      var s = SCHEM.road;
      el('path', { d: pathD(c, s), 'class': 't-road' }, g);
      arrowHead(g, c, [s[2], s[3]], [s[0], s[1]], 26);
      arrowHead(g, c, [s[s.length - 4], s[s.length - 3]], [s[s.length - 2], s[s.length - 1]], 26);
      label(g, c, s[s.length - 2], s[s.length - 1], '谷街道　北へ：中野・飯山・越後', 'North to Iiyama and Echigo', 'small', 'start', 30, 10);
      label(g, c, 138.3130, 36.6850, '南へ：須坂・松代', 'South to Suzaka, Matsushiro', 'small', 'start', 30, 10);
      label(g, c, 138.3172, 36.6950, '道の結び目', 'Where the roads met', '', 'end', -30, 50);
    }
  };

  var portrait = window.matchMedia('(orientation: portrait)');
  var boxes = [];
  function layout(box) {
    var c = M.crops[box.dataset.crop], W = innerWidth, H = innerHeight;
    var z = +(box.dataset.zoom || 1);
    var s = Math.max(W / c.w, H / c.h) * z;
    var dw = c.w * s, dh = c.h * s, f = box._focus;
    var tx = (portrait.matches ? 0.5 : +(box.dataset.tx || 0.5)) * W;
    var ty = (portrait.matches ? +(box.dataset.typ || 0.34) : +(box.dataset.ty || 0.5)) * H;
    var left = Math.min(0, Math.max(W - dw, tx - f[0] * s));
    var top = Math.min(0, Math.max(H - dh, ty - f[1] * s));
    box.style.width = dw.toFixed(1) + 'px'; box.style.height = dh.toFixed(1) + 'px';
    box.style.left = left.toFixed(1) + 'px'; box.style.top = top.toFixed(1) + 'px';
    box.style.setProperty('--fo', (f[0] * s).toFixed(0) + 'px ' + (f[1] * s).toFixed(0) + 'px');
  }
  function build(box) {
    var k = box.dataset.crop, c = M.crops[k];
    if (!c) return;
    var fo = (box.dataset.focus || '138.317,36.6948').split(',').map(Number);
    box._focus = P(c, fo[0], fo[1]);
    var svg = box.querySelector('svg.t-svg');
    svg.setAttribute('viewBox', '0 0 ' + c.w + ' ' + c.h);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.querySelectorAll('[data-draw]').forEach(function (g) {
      var f = DRAW[g.dataset.draw];
      if (f) f(g, c, k);
    });
    boxes.push(box);
    layout(box);
  }
  document.querySelectorAll('.terra').forEach(build);
  function relayout() { boxes.forEach(layout); }
  window.addEventListener('resize', relayout);
  if (portrait.addEventListener) portrait.addEventListener('change', relayout);
})();

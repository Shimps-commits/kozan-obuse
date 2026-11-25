/* ウェブ公開用のインタラクション：操作バー・一覧・ヘルプ・スワイプ・ホイール・視差・絵の拡大 */
(function () {
  'use strict';
  var H = document.documentElement;
  var Q = new URLSearchParams(location.search);
  if (Q.has('thumb') || Q.has('snap')) return;

  var TITLES = {
    ryo: ['10,000両', '10,000 ryō'], village: ['村に、世界を連れてきた男', 'He brought the world to Obuse'],
    kozan: ['高井鴻山', 'Takai Kōzan'], waves: ['神奈川沖浪裏・凱風快晴', 'The Great Wave · Red Fuji'],
    'obuse-hokusai': ['小布施にある北斎', 'Hokusai, still in Obuse'], map: ['人と物と知恵が交わる町', 'Where roads crossed'],
    market: ['六斎市', 'Market days'], house: ['高井家', 'The Takai house'], grandpa: ['祖父・長救', 'His grandfather'],
    timeline: ['鴻山と北斎の年表', 'Two lives, side by side'], study: ['16年', '16 years'], kura: ['蔵を開く', 'The storehouses'],
    age: ['37と83', '37 and 83'], shizai: ['私財で', 'Out of his own pocket'], 'fuji-ryu': ['北斎、90歳', 'Hokusai at 90'],
    gave: ['差し出した順', 'What he gave'], cost: ['1万両はいくらか', 'What 10,000 ryō means'],
    depleted: ['資産が底をついた', 'His fortune ran out'], teach: ['それでも、教えた', 'Still, he taught'],
    days: ['この2日間', 'Your two days'], why: ['なぜ差し出したのか', 'Why give it all?'], journey: ['旅の問い', 'The question to carry']
  };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (touch) H.classList.add('touch');
  if (!H.requestFullscreen) H.classList.add('ios');

  var D = null, S = { i: 0, step: 0, steps: [], N: 0, id: '' }, firstChange = true;
  var $ = function (s) { return document.querySelector(s); };
  var hud = $('#hud'), ov = $('#ov'), help = $('#help'), grid = $('#ovGrid');
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var lang = function () { return D ? D.lang() : H.lang; };

  /* ---------- 操作バーの表示／非表示 ---------- */
  var uiT;
  function showUI(ms) {
    H.classList.add('ui');
    clearTimeout(uiT);
    uiT = setTimeout(function () {
      if (hud.matches(':hover') || anyOpen()) return showUI(1500);
      H.classList.remove('ui');
    }, ms || 2600);
  }
  document.addEventListener('mousemove', function (e) {
    showUI();
    var x = e.clientX / innerWidth;
    H.classList.toggle('hov-l', x < 0.22 && !anyOpen());
    H.classList.toggle('hov-r', x > 0.78 && !anyOpen());
    target.x = (x - 0.5) * 2; target.y = (e.clientY / innerHeight - 0.5) * 2;
    if (H.classList.contains('inspect')) aimZoom(e.clientX, e.clientY);
  });
  document.addEventListener('mouseleave', function () { H.classList.remove('hov-l', 'hov-r'); target.x = target.y = 0; });

  /* ---------- 初回ヒント ---------- */
  var hintOn = !store.get('kozan.hinted');
  if (hintOn) setTimeout(function () { if (hintOn) H.classList.add('hint'); }, 1800);
  function dropHint() { if (!hintOn) return; hintOn = false; H.classList.remove('hint'); store.set('kozan.hinted', '1'); }

  /* ---------- 画面の変化に合わせる ---------- */
  document.addEventListener('deck:ready', function () { D = window.__deck; buildGrid(); });
  document.addEventListener('deck:change', function (e) {
    var d = e.detail;
    S = d;
    if (firstChange) firstChange = false; else dropHint();
    var l = lang() === 'en' ? 1 : 0, t = TITLES[d.id] || ['', ''];
    $('#count').innerHTML = '<b>' + pad(d.i + 1) + '</b><span>/ ' + d.N + '</span>';
    $('#title').textContent = t[l];
    var total = 0, done = 0;
    d.steps.forEach(function (s, k) { total += s + 1; if (k < d.i) done += s + 1; });
    done += d.step + 1;
    $('#prog i').style.width = (done / total * 100) + '%';
    var art = d.id === 'waves';
    H.classList.toggle('art', art);
    if (d.entered || !art) setInspect(false);
    markCur();
  });
  document.addEventListener('deck:lang', function () {
    var t = TITLES[S.id] || ['', ''];
    $('#title').textContent = t[lang() === 'en' ? 1 : 0];
    refreshGrid();
  });

  /* ---------- ボタン ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    e.stopPropagation();
    var a = b.dataset.act;
    if (a === 'lang') D.setLang(lang() === 'ja' ? 'en' : 'ja');
    else if (a === 'overview') toggle(ov);
    else if (a === 'help') toggle(help);
    else if (a === 'full') D.toggleFull();
    else if (a === 'presenter') D.openPresenter();
    else if (a === 'inspect') setInspect(!H.classList.contains('inspect'));
    else if (a === 'close') closeAll();
    showUI();
  }, true);

  /* ---------- 重ね画面 ---------- */
  function isOpen(el) { return el.classList.contains('open'); }
  function anyOpen() { return isOpen(ov) || isOpen(help); }
  function open(el) {
    closeAll();
    el.hidden = false;
    void el.offsetWidth;
    el.classList.add('open');
    if (el === ov) {
      markCur();
      var c = grid.querySelector('.cur');
      if (c) { c.focus({ preventScroll: true }); c.scrollIntoView({ block: 'center' }); }
    }
  }
  function close(el) {
    if (!isOpen(el)) return;
    el.classList.remove('open');
    setTimeout(function () { if (!isOpen(el)) el.hidden = true; }, 300);
  }
  function closeAll() { close(ov); close(help); }
  function toggle(el) { if (isOpen(el)) close(el); else open(el); }
  help.addEventListener('click', function () { close(help); });
  ov.addEventListener('click', function (e) { if (e.target === ov || e.target === grid) close(ov); });

  function buildGrid() {
    grid.innerHTML = '';
    for (var k = 0; k < D.N; k++) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ov-card'; b.dataset.i = k; b.style.setProperty('--i', k);
      b.innerHTML = '<div class="im"><img loading="lazy" alt=""></div><div class="lb"><b>' + pad(k + 1) + '</b><span></span></div>';
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        D.go(+this.dataset.i, 0, true);
        close(ov);
      });
      grid.appendChild(b);
    }
    refreshGrid();
  }
  function refreshGrid() {
    if (!D) return;
    var l = lang(), ids = D.state().ids;
    grid.querySelectorAll('.ov-card').forEach(function (b, k) {
      b.querySelector('img').src = 'thumbs/' + l + '-' + pad(k + 1) + '.jpg';
      var t = TITLES[ids[k]] || ['', ''];
      b.querySelector('span').textContent = t[l === 'en' ? 1 : 0];
      b.setAttribute('aria-label', (k + 1) + ' ' + t[l === 'en' ? 1 : 0]);
    });
  }
  function markCur() {
    grid.querySelectorAll('.ov-card').forEach(function (b, k) { b.classList.toggle('cur', k === S.i); });
  }
  function gridMove(dx, dy) {
    var cards = [].slice.call(grid.querySelectorAll('.ov-card'));
    var i = cards.indexOf(document.activeElement); if (i < 0) i = S.i;
    var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    var j = Math.max(0, Math.min(cards.length - 1, i + dx + dy * cols));
    cards[j].focus(); cards[j].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  /* ---------- キー（deck.js より先に処理） ---------- */
  window.__uiKey = function (e) {
    var k = e.key;
    showUI();
    if (isOpen(ov)) {
      if (k === 'Escape' || k === 'o' || k === 'O') { close(ov); return true; }
      if (k === 'ArrowRight') { gridMove(1, 0); e.preventDefault(); return true; }
      if (k === 'ArrowLeft') { gridMove(-1, 0); e.preventDefault(); return true; }
      if (k === 'ArrowDown') { gridMove(0, 1); e.preventDefault(); return true; }
      if (k === 'ArrowUp') { gridMove(0, -1); e.preventDefault(); return true; }
      if (k === 'Enter' || k === ' ') { if (document.activeElement.classList.contains('ov-card')) { document.activeElement.click(); e.preventDefault(); } return true; }
      if (k === 'Tab') return true;
      return true;
    }
    if (isOpen(help)) { if (k !== 'Tab') close(help); return true; }
    if (k === 'Escape') { if (H.classList.contains('inspect')) { setInspect(false); return true; } return false; }
    if (k === 'o' || k === 'O' || k === 'g' || k === 'G') { open(ov); return true; }
    if (k === '?' || k === '/' || k === 'h' || k === 'H') { open(help); return true; }
    if (k === 'z' || k === 'Z') { if (H.classList.contains('art')) setInspect(!H.classList.contains('inspect')); return true; }
    if (H.classList.contains('inspect') && (k === 'ArrowRight' || k === 'ArrowLeft' || k === ' ' || k === 'PageDown' || k === 'PageUp')) setInspect(false);
    return false;
  };

  /* ---------- クリック（deck.js より先に処理） ---------- */
  var swallowClick = 0;
  window.__uiClick = function (e) {
    if (Date.now() < swallowClick) return true;
    if (H.classList.contains('inspect')) { setInspect(false); return true; }
    var dot = e.target.closest('.pt .dot');
    if (dot) {
      var pts = [].slice.call(document.querySelectorAll('[data-id="days"] .pt'));
      D.go(S.i, pts.indexOf(dot.parentElement) + 1, true);
      return true;
    }
    return false;
  };

  /* ---------- 絵の拡大 ---------- */
  function activeFit() {
    var s = document.querySelector('.slide.active');
    if (!s) return null;
    var fits = s.querySelectorAll('.layer.vis .fit');
    return fits.length ? fits[fits.length - 1] : s.querySelector('.fit');
  }
  function setInspect(on) {
    H.classList.toggle('inspect', !!on);
    var b = document.querySelector('[data-act="inspect"]');
    if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    var f = activeFit();
    if (f) {
      if (on) {
        var nat = f.naturalWidth / f.getBoundingClientRect().width;
        f.style.setProperty('--zs', Math.max(1.6, Math.min(3, nat * 1.6)).toFixed(2));
        f.style.transformOrigin = '50% 50%';
      } else f.style.transformOrigin = '';
    }
  }
  function aimZoom(x, y) {
    var f = activeFit(); if (!f) return;
    var px = Math.max(0, Math.min(1, x / innerWidth)), py = Math.max(0, Math.min(1, y / innerHeight));
    f.style.transformOrigin = (px * 100).toFixed(1) + '% ' + (py * 100).toFixed(1) + '%';
  }

  /* ---------- スワイプ ---------- */
  var t0 = null;
  document.addEventListener('touchstart', function (e) {
    if (anyOpen() || e.touches.length > 1) { t0 = null; return; }
    var p = e.touches[0]; t0 = { x: p.clientX, y: p.clientY, t: Date.now() };
    showUI(3200);
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (H.classList.contains('inspect') && e.touches.length === 1) aimZoom(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (!t0 || H.classList.contains('inspect')) return;
    var p = e.changedTouches[0], dx = p.clientX - t0.x, dy = p.clientY - t0.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3 && Date.now() - t0.t < 800) {
      swallowClick = Date.now() + 450;
      if (dx < 0) D.next(); else D.prev();
    } else if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.3) {
      swallowClick = Date.now() + 450;
      if (dy < 0) D.next(); else D.prev();
    }
    t0 = null;
  }, { passive: true });

  /* ---------- ホイール・トラックパッド（慣性で進みすぎない） ---------- */
  var lockUntil = 0, acc = 0;
  window.addEventListener('wheel', function (e) {
    if (anyOpen() || !D) return;
    if (e.ctrlKey) return;
    e.preventDefault();
    var now = Date.now();
    if (now < lockUntil) { lockUntil = Math.max(lockUntil, now + 160); return; }
    acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(acc) > 36) {
      if (acc > 0) D.next(); else D.prev();
      acc = 0; lockUntil = now + 700;
    }
  }, { passive: false });

  /* ---------- 視差 ---------- */
  var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  (function loop() {
    if (!touch && !reduced.matches) {
      cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06;
      H.style.setProperty('--px', cur.x.toFixed(4));
      H.style.setProperty('--py', cur.y.toFixed(4));
    }
    requestAnimationFrame(loop);
  })();

  showUI(4000);
})();

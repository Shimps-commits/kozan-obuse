/* 投影画面のエンジン（外部ライブラリなし・オフライン動作） */
(function () {
  'use strict';
  var Q = new URLSearchParams(location.search);
  var MODE = Q.has('thumb') ? 'thumb' : 'main';
  var SNAP = Q.has('snap');
  var H = document.documentElement;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  function still() { return RM.matches || SNAP; }
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var lang = Q.get('lang') || store.get('kozan.lang') || 'ja';
  if (lang !== 'en') lang = 'ja';
  H.lang = lang;
  if (SNAP) H.classList.add('snap');
  if (MODE === 'thumb') H.classList.add('thumb');

  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var N = slides.length, cur = -1, step = 0, steps = [];
  var chan = null;
  try { if ('BroadcastChannel' in window && MODE === 'main') chan = new BroadcastChannel('kozan-deck'); } catch (e) {}
  var presenter = null;
  var seen = {};
  var costMode = 'rice';

  /* ---------- 文字を一字（英語は一語）ずつに分ける ---------- */
  function splitReveal() {
    document.querySelectorAll('.rv').forEach(function (el) {
      var i = 0;
      (function walk(node) {
        [].slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var t = c.textContent;
            if (!t.trim()) return;
            var isEn = c.parentElement.closest('.en');
            var parts = isEn ? t.split(/(\s+)/) : Array.from(t);
            var frag = document.createDocumentFragment();
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
              var s = document.createElement('span');
              s.className = 'ch'; s.style.setProperty('--i', i++); s.textContent = p;
              frag.appendChild(s);
            });
            c.parentNode.replaceChild(frag, c);
          } else if (c.nodeType === 1 && !c.classList.contains('noreveal') && c.tagName !== 'BR') {
            if (c.classList.contains('ja') || c.classList.contains('en')) i = 0;
            walk(c);
          }
        });
      })(el);
    });
  }

  /* ---------- 絵：拡大の上限つきで収める ---------- */
  function fitAll() {
    document.querySelectorAll('img.fit').forEach(fitOne);
  }
  function fitOne(img) {
    if (!img.naturalWidth) { img.addEventListener('load', function () { fitOne(img); }, { once: true }); return; }
    var nw = img.naturalWidth, nh = img.naturalHeight;
    var W, Hh, fw = +(img.dataset.fw || 1), fh = +(img.dataset.fh || 1);
    if (img.dataset.box === 'parent') { W = img.parentElement.clientWidth; Hh = img.parentElement.clientHeight; }
    else { W = innerWidth; Hh = innerHeight; }
    var k = +(img.dataset.k || 2);
    var s = img.dataset.mode === 'cover' ? Math.max(W / nw, Hh / nh) : Math.min(fw * W / nw, fh * Hh / nh);
    s = Math.min(s, k);
    img.style.width = Math.round(nw * s) + 'px';
    img.style.height = Math.round(nh * s) + 'px';
  }

  /* ---------- カウントアップ ---------- */
  function fmt(v) { return Math.round(v).toLocaleString('en-US'); }
  function sizeCounters() {
    document.querySelectorAll('.cnt').forEach(function (el) {
      var keep = el.textContent; el.style.minWidth = '';
      el.textContent = fmt(+el.dataset.to);
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
      el.textContent = keep;
    });
  }
  function count(el, to, anim, dur, delay) {
    cancelAnimationFrame(el._raf); clearTimeout(el._t);
    var from = +el.dataset.from;
    if (!anim) { el.textContent = fmt(to); return; }
    el.textContent = fmt(from);
    el._t = setTimeout(function () {
      var t0 = performance.now();
      (function f(t) {
        var p = Math.min(1, (t - t0) / dur);
        var e = p === 1 ? 1 : 1 - Math.pow(2, -9 * p);
        el.textContent = fmt(from + (to - from) * e);
        if (p < 1) el._raf = requestAnimationFrame(f);
      })(t0);
    }, delay || 0);
  }

  /* ---------- ステップ ---------- */
  function initSteps() {
    slides.forEach(function (s, k) {
      var m = +(s.dataset.steps || 0);
      s.querySelectorAll('[data-b],[data-x]').forEach(function (e) {
        e.classList.add('bd');
        if (e.dataset.b) m = Math.max(m, +e.dataset.b);
        if (e.dataset.x) m = Math.max(m, +e.dataset.x);
      });
      steps[k] = m;
    });
  }
  function apply(s, st) {
    s.dataset.step = st;
    s.querySelectorAll('[data-b],[data-x]').forEach(function (e) {
      var b = e.dataset.b, x = e.dataset.x;
      var v = (b == null || st >= +b) && (x == null || st < +x);
      e.classList.toggle('vis', v);
    });
  }

  /* 画面ごとの追加演出 */
  var HOOKS = {
    ryo: function (s, st, o) {
      var c = s.querySelector('.cnt');
      if (st === 0) { count(c, 0, false); c.dataset.from = 0; return; }
      count(c, 10000, o.fwd, 2600, 250);
    },
    study: function (s, st, o) {
      var c = s.querySelector('.cnt');
      if (st === 0) { c.textContent = '15'; return; }
      count(c, 31, o.fwd, 1700, 350);
    },
    market: function (s, st) { s.classList.toggle('lit', st >= 1); },
    wave: function (s, st) {
      var sh = s.querySelector('.shizai [data-b]');
      s.classList.toggle('dim', st >= +sh.dataset.b);
    },
    cost: function (s, st) { s.classList.toggle('bust', st >= 3); renderCost(); },
    days: function (s, st) {
      s.querySelectorAll('.pt').forEach(function (p, k) {
        p.classList.toggle('seen', k + 1 <= st);
        p.classList.toggle('now', k + 1 === st);
      });
    }
  };

  function renderCost() {
    var rice = costMode === 'rice';
    var s = document.querySelector('[data-id="cost"]');
    s.querySelector('.amt-ja').textContent = rice ? '4億' : '12.5億';
    s.querySelector('.amt-en').textContent = rice ? '400 million' : '1.25 billion';
    s.querySelector('.rate-ja').textContent = rice ? '1両＝米で約4万円　江戸中〜後期' : '1両＝そばで約12.5万円　江戸中〜後期';
    s.querySelector('.rate-en').textContent = rice ? '1 ryō ≈ ¥40,000 in rice · mid–late Edo' : '1 ryō ≈ ¥125,000 in soba · mid–late Edo';
    s.querySelectorAll('.tg button').forEach(function (b) { b.classList.toggle('on', b.dataset.m === costMode); });
  }
  function toggleCost() { costMode = costMode === 'rice' ? 'soba' : 'rice'; renderCost(); }

  function go(n, st, fwd) {
    n = Math.max(0, Math.min(N - 1, n));
    st = Math.max(0, Math.min(steps[n], st));
    var entered = n !== cur;
    if (entered) {
      slides.forEach(function (s, k) {
        s.classList.toggle('active', k === n);
        s.classList.toggle('before', k < n);
      });
    }
    cur = n; step = st;
    apply(slides[n], st);
    var h = HOOKS[slides[n].dataset.id];
    if (h) h(slides[n], st, { fwd: !!fwd && !still(), entered: entered });
    if (MODE === 'main') {
      try { history.replaceState(null, '', location.pathname + location.search + '#' + (n + 1) + '.' + st); } catch (e) {}
      broadcast();
    }
    document.dispatchEvent(new CustomEvent('deck:change', { detail: { i: n, step: st, steps: steps, N: N, entered: entered, id: slides[n].dataset.id } }));
  }
  function next() {
    if (step < steps[cur]) go(cur, step + 1, true);
    else if (cur < N - 1) go(cur + 1, 0, true);
  }
  function prev() {
    if (step > 0) go(cur, step - 1, false);
    else if (cur > 0) go(cur - 1, steps[cur - 1], false);
  }

  function parseHash() {
    var m = /^#(\d+)(?:\.(\d+|e))?/.exec(location.hash);
    if (!m) return [0, 0];
    var n = Math.max(0, Math.min(N - 1, (+m[1] || 1) - 1));
    var st = m[2] === 'e' ? steps[n] : +(m[2] || 0);
    return [n, st];
  }

  /* ---------- 言語 ---------- */
  function setLang(l) {
    lang = l; H.lang = l; store.set('kozan.lang', l);
    sizeCounters();
    broadcast();
    document.dispatchEvent(new CustomEvent('deck:lang', { detail: { lang: l } }));
  }

  /* ---------- 発表者画面との同期 ---------- */
  function state() {
    return { type: 'state', i: cur, step: step, n: N, steps: steps, lang: lang,
      ids: slides.map(function (s) { return s.dataset.id; }) };
  }
  function broadcast() {
    if (MODE !== 'main') return;
    var m = state();
    if (chan) try { chan.postMessage(m); } catch (e) {}
    if (presenter && !presenter.closed) try { presenter.postMessage(m, '*'); } catch (e) {}
  }
  function handle(d, src) {
    if (!d || typeof d !== 'object') return;
    if (d.mid) { if (seen[d.mid]) return; seen[d.mid] = 1; }
    if (d.type === 'hello') { if (src && src !== window) presenter = src; broadcast(); return; }
    if (d.type !== 'cmd') return;
    switch (d.cmd) {
      case 'next': next(); break;
      case 'prev': prev(); break;
      case 'home': go(0, 0); break;
      case 'end': go(N - 1, steps[N - 1]); break;
      case 'lang': setLang(lang === 'ja' ? 'en' : 'ja'); break;
      case 'goto': go(+d.i || 0, +d.step || 0); break;
      case 'toggle': toggleCost(); break;
      case 'black': H.classList.toggle('blackout'); break;
    }
  }
  function openPresenter() {
    if (presenter && !presenter.closed) { presenter.focus(); return; }
    presenter = window.open('presenter.html', 'kozan-presenter', 'width=1400,height=860');
  }
  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (H.requestFullscreen) H.requestFullscreen().catch(function () {});
  }

  /* ---------- 入力 ---------- */
  function bindMain() {
    if (chan) chan.onmessage = function (e) { handle(e.data, null); };
    window.addEventListener('message', function (e) { handle(e.data, e.source); });

    document.addEventListener('keydown', function (e) {
      if (e.target && e.target.tagName === 'INPUT') {
        if (e.key === 'Escape' || e.key === 'Enter') e.target.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (window.__uiKey && window.__uiKey(e)) return;
      var k = e.key;
      if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown' || k === 'Enter') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp' || k === 'Backspace') { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); go(0, 0); }
      else if (k === 'End') { e.preventDefault(); go(N - 1, steps[N - 1]); }
      else if (k === 'l' || k === 'L') setLang(lang === 'ja' ? 'en' : 'ja');
      else if (k === 'f' || k === 'F') toggleFull();
      else if (k === 'p' || k === 'P') openPresenter();
      else if (k === 't' || k === 'T') toggleCost();
      else if (k === 'b' || k === 'B' || k === '.') H.classList.toggle('blackout');
    });

    document.getElementById('deck').addEventListener('click', function (e) {
      if (e.target.closest('input,button,label')) return;
      if (window.__uiClick && window.__uiClick(e)) return;
      if (e.clientX < innerWidth * 0.22) prev(); else next();
    });
    document.querySelectorAll('.tg button').forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); costMode = b.dataset.m; renderCost(); });
    });

    var age = document.getElementById('age'), ans = document.getElementById('ans');
    age.addEventListener('input', function () {
      var v = parseInt(age.value.replace(/[^\d０-９]/g, '').replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); }), 10);
      if (v > 0 && v < 130) {
        ans.querySelectorAll('.an').forEach(function (a) { a.textContent = v + 46; });
        ans.classList.add('on');
      } else ans.classList.remove('on');
    });

    var idleT;
    document.addEventListener('mousemove', function () {
      H.classList.remove('idle'); clearTimeout(idleT);
      idleT = setTimeout(function () { H.classList.add('idle'); }, 2200);
    });
    window.addEventListener('beforeunload', function () { if (chan) chan.close(); });
  }

  /* ---------- 六斎市のマス ---------- */
  function buildCal() {
    var cal = document.getElementById('cal'), hot = 0;
    for (var d = 1; d <= 30; d++) {
      var s = document.createElement('span');
      s.textContent = d;
      if (d % 10 === 3 || d % 10 === 8) { s.className = 'hot'; s.style.setProperty('--d', (0.25 + hot++ * 0.22) + 's'); }
      cal.appendChild(s);
    }
  }

  /* ---------- 神奈川沖浪裏：ファイルがあれば使う ---------- */
  function checkKanagawa() {
    var layer = document.querySelector('[data-kanagawa]');
    return new Promise(function (res) {
      var im = new Image();
      im.onload = function () {
        var bg = document.createElement('div');
        bg.className = 'backdrop'; bg.style.backgroundImage = 'url(' + layer.dataset.kanagawa + ')';
        im.className = 'fit'; im.dataset.k = '2.2'; im.dataset.fw = '1'; im.dataset.fh = '1'; im.dataset.mode = 'cover'; im.alt = '';
        layer.insertBefore(im, layer.firstChild);
        layer.insertBefore(bg, im);
        res(true);
      };
      im.onerror = function () {
        var s = layer.closest('.slide');
        layer.remove();
        s.querySelectorAll('[data-b],[data-x]').forEach(function (e) {
          if (e.dataset.b) e.dataset.b = Math.max(0, +e.dataset.b - 1);
          if (e.dataset.x) e.dataset.x = Math.max(1, +e.dataset.x - 1);
        });
        res(false);
      };
      im.src = layer.dataset.kanagawa;
    });
  }

  /* ---------- 起動 ---------- */
  buildCal();
  splitReveal();
  checkKanagawa().then(function () {
    initSteps();
    fitAll();
    renderCost();
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var timeout = new Promise(function (r) { setTimeout(r, 2500); });
    return Promise.race([fontsReady, timeout]);
  }).then(function () {
    sizeCounters();
    var p = parseHash();
    go(p[0], p[1], false);
    H.classList.add('ready');
    if (MODE === 'main') bindMain();
    else window.addEventListener('hashchange', function () { var q = parseHash(); go(q[0], q[1], false); });
    window.addEventListener('resize', function () { fitAll(); sizeCounters(); });
    window.__deck = { go: go, next: next, prev: prev, steps: steps, N: N, setLang: setLang, state: state,
      toggleFull: toggleFull, openPresenter: openPresenter, mode: MODE, snap: SNAP,
      cur: function () { return cur; }, step: function () { return step; }, lang: function () { return lang; } };
    document.dispatchEvent(new CustomEvent('deck:ready'));
    document.dispatchEvent(new CustomEvent('deck:change', { detail: { i: cur, step: step, steps: steps, N: N, entered: true, id: slides[cur].dataset.id } }));
  });
})();

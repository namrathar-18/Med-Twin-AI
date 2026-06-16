/* ============ MediTwin AI — Interactivity ============ */
(function () {
  'use strict';

  /* Year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Navbar scroll + mobile toggle */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Count-up metrics */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* Live ECG vitals jitter */
  var hr = document.getElementById('hr');
  var spo2 = document.getElementById('spo2');
  var temp = document.getElementById('temp');
  function jitter() {
    if (hr) hr.textContent = 84 + Math.floor(Math.random() * 12);
    if (spo2) spo2.textContent = 94 + Math.floor(Math.random() * 4);
    if (temp) temp.textContent = (37.8 + Math.random() * 0.6).toFixed(1);
  }
  setInterval(jitter, 2200);

  /* ECG line animation (redraw subtle drift) */
  var ecg = document.getElementById('ecg');
  if (ecg) {
    var base = ecg.getAttribute('points');
    ecg.style.transition = 'opacity .3s';
  }

  /* ===== Agent debate sequence ===== */
  var stream = document.getElementById('debateStream');
  var verdict = document.getElementById('debateVerdict');
  var ring = document.getElementById('ring');
  var ringPct = document.getElementById('ringPct');
  var replayBtn = document.getElementById('replayBtn');

  var script = [
    { cls: 'teal', ico: '🩻', name: 'Radiology Agent', text: 'Chest imaging shows bilateral opacities — possible pneumonia.' },
    { cls: 'violet', ico: '🧪', name: 'Lab Analysis Agent', text: 'Inflammation markers (WBC, CRP) do not support a severe infection.' },
    { cls: 'sky', ico: '🧠', name: 'Diagnostic Agent', text: 'History notes progressive dyspnea, orthopnea and peripheral edema.' },
    { cls: 'rose', ico: '📈', name: 'Risk Prediction Agent', text: 'Temporal model: high probability of heart failure, elevated readmission risk.' },
    { cls: 'green', ico: '🧭', name: 'Clinical Coordinator', text: 'Synthesizing evidence → Most likely: Congestive Heart Failure (87%). Recommend echocardiogram.' }
  ];

  var timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function runDebate() {
    clearTimers();
    stream.innerHTML = '';
    verdict.classList.remove('show');
    ring.style.strokeDashoffset = 327;
    ringPct.textContent = '0%';

    script.forEach(function (m, i) {
      timers.push(setTimeout(function () {
        var el = document.createElement('div');
        el.className = 'msg ' + m.cls;
        el.innerHTML =
          '<div class="msg-ava">' + m.ico + '</div>' +
          '<div class="msg-body"><div class="msg-name">' + m.name + '</div>' +
          '<div class="msg-text">' + m.text + '</div></div>';
        stream.appendChild(el);
        stream.scrollTop = stream.scrollHeight;
      }, i * 1100));
    });

    timers.push(setTimeout(function () {
      verdict.classList.add('show');
      // 87% of circumference 327
      var pct = 87;
      ring.style.strokeDashoffset = 327 - (327 * pct / 100);
      // count ring %
      var s = null, dur = 1400;
      function step(ts) {
        if (!s) s = ts;
        var p = Math.min((ts - s) / dur, 1);
        ringPct.textContent = Math.round(pct * p) + '%';
        if (p < 1) requestAnimationFrame(step);
        else ringPct.textContent = pct + '%';
      }
      requestAnimationFrame(step);
    }, script.length * 1100 + 300));
  }

  if (stream) {
    var demoSection = document.getElementById('demo');
    if ('IntersectionObserver' in window) {
      var played = false;
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !played) { played = true; runDebate(); }
        });
      }, { threshold: 0.3 });
      dio.observe(demoSection);
    } else {
      runDebate();
    }
  }
  if (replayBtn) replayBtn.addEventListener('click', runDebate);

  /* CTA form */
  var form = document.getElementById('ctaForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      note.hidden = false;
      form.querySelectorAll('input').forEach(function (i) { i.value = ''; });
    });
  }
})();

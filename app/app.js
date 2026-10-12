/* Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt. */
/* English Coach - the app: hash routes, flashcards, lessons, quizzes, speech. Data: data.js, logic: core.js. */
(function () {
  "use strict";
  var C = window.ECCore, D = window.EC_DATA;
  var view = document.getElementById("view");
  var KEY = "ec:v1";
  var BATCH = 5;

  // ---------- state ----------
  var S = load();
  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    s = s || {};
    return { cards: s.cards || {}, stats: s.stats || {}, lessons: s.lessons || {}, settings: Object.assign({ rate: 0.9, theme: null }, s.settings || {}) };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function now() { return Date.now(); }
  function gain(xp) { S.stats = C.addXp(S.stats, xp, now()); save(); renderTop(); }

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); } // **bold** in lesson text
  function word(id) { for (var i = 0; i < D.words.length; i++) if (D.words[i].id === id) return D.words[i]; return null; }
  function topic(id) { return D.topics.filter(function (t) { return t.id === id; })[0]; }
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }
  function speakBtn(text, big) {
    if (!("speechSynthesis" in window)) return "";
    return '<button type="button" class="speak' + (big ? " lg" : "") + '" data-say="' + esc(text) + '" aria-label="استمع">🔊</button>';
  }

  // ---------- speech ----------
  var voice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices();
    voice = vs.filter(function (v) { return /en-US/i.test(v.lang) && /natural|online|google|aria|jenny|guy/i.test(v.name); })[0]
      || vs.filter(function (v) { return /en-US/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = S.settings.rate;
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }
  var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  function listen(target, done) {
    if (!Rec) return;
    var r = new Rec();
    r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 3;
    toast("🎤 احكي هلأ…");
    r.onresult = function (e) {
      var alts = Array.prototype.map.call(e.results[0], function (a) { return a.transcript; });
      var ok = alts.some(function (a) { return C.checkAnswer(a, target) !== "wrong"; });
      done(ok, alts[0]);
    };
    r.onerror = function (e) { toast(e.error === "not-allowed" ? "اسمح للمايكروفون من المتصفح" : "ما سمعت منيح، جرّب كمان مرة"); };
    try { r.start(); } catch (e) {}
  }

  // ---------- top bar & tabs ----------
  function renderTop() {
    var st = C.currentStreak(S.stats, now());
    var lv = C.level(S.stats.xp || 0);
    document.getElementById("topStats").innerHTML =
      '<span class="pill" title="أيام متتالية">🔥 ' + st + '</span><span class="pill" title="المستوى">⭐ ' + lv.level + "</span>";
  }
  function setTab(name) {
    document.querySelectorAll(".tabs a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === name); });
  }

  // ---------- views ----------
  function home() {
    setTab("home");
    var t = now(), st = S.stats;
    var today = st.todayKey === C.dayKey(t) ? st.today : 0;
    var pct = Math.min(100, Math.round(today / C.DAILY_GOAL * 100));
    var due = C.dueWords(D.words, S.cards, t).length;
    var fresh = C.newWords(D.words, S.cards).length;
    var lv = C.level(st.xp || 0);
    var learned = D.words.filter(function (w) { return C.isLearned(S.cards[w.id]); }).length;
    var lessonsDone = D.grammar.filter(function (g) { return C.lessonDone(S.lessons, g.id); }).length;
    view.innerHTML =
      '<div class="card hero"><div class="ring" style="--p:' + pct + '"><span>' + today + "<small>من " + C.DAILY_GOAL + "</small></span></div>" +
        "<div style='flex:1'><h1>" + (today >= C.DAILY_GOAL ? "خلّصت هدف اليوم 🎉" : "هدفك اليوم " + C.DAILY_GOAL + " نقطة") + "</h1>" +
        '<div class="muted">المستوى ' + lv.level + " · " + learned + " كلمة محفوظة · " + lessonsDone + " درس</div>" +
        '<div class="bar"><i style="width:' + Math.round(lv.into / lv.need * 100) + '%"></i></div></div></div>' +
      "<h2>شو بدك تعمل؟</h2>" +
      '<div class="grid">' +
        tile("#/review", "🔁", "مراجعة الكلمات", due ? due + " كلمة بتستناك" : "ما في مراجعة هلأ", due) +
        tile("#/learn", "🆕", "كلمات جديدة", fresh + " كلمة ما تعلّمتها") +
        tile("#/grammar", "📘", "القواعد", lessonsDone + " من " + D.grammar.length + " دروس") +
        tile("#/practice", "🎯", "تدريب سريع", "10 أسئلة مختلطة") +
        tile("#/phrases", "💬", "جمل جاهزة", "للشغل والحياة") +
        tile("#/stats", "📊", "تقدّمي", "إحصائيات وإعدادات") +
      "</div>" +
      '<p class="muted" style="margin-top:18px;font-size:14px">💡 نصيحة: 10 دقائق كل يوم أحسن من ساعتين مرة بالأسبوع. التطبيق بيرجعلك الكلمات بالوقت المناسب قبل ما تنساها.</p>';
  }
  function tile(href, ic, title, sub, badge) {
    return '<a class="tile" href="' + href + '"><span class="ic">' + ic + "</span><b>" + esc(title) + "</b><small>" + esc(sub) + "</small>" +
      (badge ? '<span class="badge">' + badge + "</span>" : "") + "</a>";
  }

  // learn: pick a topic, see 5 new words, then a quick check
  function learn(topicId) {
    setTab("home");
    if (!topicId) {
      view.innerHTML = "<h1>كلمات جديدة 🆕</h1><p class='muted'>اختار موضوع، وبنتعلم " + BATCH + " كلمات مع بعض.</p><div class='list'>" +
        D.topics.map(function (t) {
          var left = C.newWords(D.words, S.cards, t.id).length, all = D.words.filter(function (w) { return w.t === t.id; }).length;
          return '<a class="lrow" href="#/learn/' + t.id + '"><span class="ic">' + t.icon + "</span><div><b>" + esc(t.ar) + "</b><small>" +
            (left ? left + " كلمة جديدة من " + all : "خلّصت كل كلماته ✅") + "</small></div><span>‹</span></a>";
        }).join("") + "</div>";
      return;
    }
    var batch = C.newWords(D.words, S.cards, topicId).slice(0, BATCH);
    if (!batch.length) { view.innerHTML = '<div class="empty">✅ خلّصت كل كلمات هالموضوع!<br><br><a class="btn" href="#/learn">اختار موضوع ثاني</a></div>'; return; }
    var i = 0;
    function show() {
      var w = batch[i];
      view.innerHTML = progress(i, batch.length, topic(topicId).icon + " " + topic(topicId).ar) +
        '<div class="card flash"><div class="row" style="align-items:center;justify-content:center;gap:12px;flex:none">' + speakBtn(w.en, true) +
          '<span class="word en">' + esc(w.en) + "</span></div>" +
          '<span class="pos en">' + esc(w.pos) + "</span>" +
          '<span class="ar">' + esc(w.ar) + "</span>" +
          '<div class="ex">' + speakBtn(w.ex) + '<div><span class="en">' + esc(w.ex) + "</span><small>" + esc(w.exAr) + "</small></div></div>" +
          (Rec ? '<button type="button" class="btn ghost" data-act="mic" style="min-height:42px">🎤 جرّب تلفظها</button>' : "") +
        "</div>" +
        '<div class="actions"><button type="button" class="btn block" data-act="next">' + (i < batch.length - 1 ? "التالي ←" : "يلا نختبر 🎯") + "</button></div>";
      say(w.en);
      view.querySelector('[data-act="next"]').onclick = function () { i++; if (i < batch.length) show(); else check(); };
      var mic = view.querySelector('[data-act="mic"]');
      if (mic) mic.onclick = function () { listen(w.en, function (ok, heard) { toast(ok ? "👏 نطق ممتاز!" : "سمعت: " + heard + " · جرّب كمان مرة"); }); };
    }
    function check() {
      var qs = C.shuffle(batch).map(function (w, k) { return C.wordQuestion(w, D.words, k % 2 ? "ar2en" : "en2ar"); });
      quiz(qs, { title: "اختبار الكلمات الجديدة", onAnswer: function (q, ok) {
        S.cards[q.wordId] = C.schedule(S.cards[q.wordId], ok ? 4 : 2, now()); save();
      }, done: function (score, total) {
        resultScreen(score, total, "#/learn/" + topicId, "كمان " + BATCH + " كلمات");
      } });
    }
    show();
  }

  // review: due cards, self-graded
  function review() {
    setTab("review");
    var due = C.dueWords(D.words, S.cards, now());
    if (!due.length) {
      var next = Object.keys(S.cards).map(function (k) { return S.cards[k].due; }).sort()[0];
      view.innerHTML = '<div class="empty"><div style="font-size:48px">🎉</div><h1>ما في كلمات للمراجعة هلأ</h1>' +
        (next ? "<p>أقرب مراجعة: " + new Date(next).toLocaleString("ar-JO", { weekday: "long", hour: "numeric", minute: "2-digit" }) + "</p>" : "<p>ابدأ بتعلّم كلمات جديدة أول.</p>") +
        '<a class="btn" href="#/learn">تعلّم كلمات جديدة</a></div>';
      return;
    }
    var i = 0, total = due.length;
    function show() {
      var w = due[i];
      view.innerHTML = progress(i, total, "مراجعة") +
        '<div class="card flash"><div class="row" style="align-items:center;justify-content:center;gap:12px;flex:none">' + speakBtn(w.en, true) +
        '<span class="word en">' + esc(w.en) + '</span></div><span class="muted">تذكر المعنى؟ فكّر وبعدين اكشف</span>' +
        '<div id="back" hidden style="width:100%;display:flex;flex-direction:column;gap:12px;align-items:center"><span class="ar">' + esc(w.ar) + "</span>" +
        '<div class="ex">' + speakBtn(w.ex) + '<div><span class="en">' + esc(w.ex) + "</span><small>" + esc(w.exAr) + "</small></div></div></div></div>" +
        '<div class="actions" id="act"><button type="button" class="btn block" data-act="show">اكشف المعنى 👀</button></div>';
      say(w.en);
      view.querySelector('[data-act="show"]').onclick = function () {
        view.querySelector("#back").hidden = false;
        view.querySelector("#act").innerHTML = '<div class="grade"><button type="button" class="g1" data-g="1">نسيتها 😕<small>بعد 10 دقائق</small></button>' +
          '<button type="button" class="g3" data-g="3">صعبة 🤔<small>قريباً</small></button><button type="button" class="g5" data-g="5">سهلة 😎<small>بعد أيام</small></button></div>';
        view.querySelectorAll("[data-g]").forEach(function (b) {
          b.onclick = function () {
            var g = Number(b.getAttribute("data-g"));
            S.cards[w.id] = C.schedule(S.cards[w.id], g, now());
            gain(g >= 3 ? 3 : 1);
            i++;
            if (i < total) show(); else resultScreen(null, total, "#/", null, "راجعت " + total + " كلمة 💪");
          };
        });
      };
    }
    show();
  }

  // grammar
  function grammar(id) {
    setTab("grammar");
    if (!id) {
      view.innerHTML = "<h1>القواعد 📘</h1><p class='muted'>شرح بالعربي وتمارين. الدرس بيتعلّم ✅ لما تجيب 80% أو أكثر.</p><div class='list'>" +
        D.grammar.map(function (g) {
          var p = S.lessons[g.id];
          return '<a class="lrow" href="#/grammar/' + g.id + '"><span class="ic">' + g.icon + "</span><div><b>" + esc(g.ar) + '</b><small class="en">' + esc(g.title) + "</small></div>" +
            (C.lessonDone(S.lessons, g.id) ? '<span class="done-mark">✅ ' + p.best + "/" + p.total + "</span>" : p ? '<span class="muted">' + p.best + "/" + p.total + "</span>" : "<span>‹</span>") + "</a>";
        }).join("") + "</div>";
      return;
    }
    var g = D.grammar.filter(function (x) { return x.id === id; })[0];
    if (!g) { location.hash = "#/grammar"; return; }
    view.innerHTML = '<a href="#/grammar" class="chip">→ كل الدروس</a><h1 style="margin-top:12px">' + g.icon + " " + esc(g.ar) + '</h1><p class="en muted" style="margin:0 0 12px">' + esc(g.title) + "</p>" +
      '<div class="card explain">' + g.explain.map(function (p) { return "<p>" + md(p) + "</p>"; }).join("") + "</div>" +
      "<h2>أمثلة</h2><div class='list'>" + g.examples.map(function (e) {
        return '<div class="ex" style="background:var(--card);border:1px solid var(--line)">' + speakBtn(e.en) + '<div><span class="en">' + esc(e.en) + "</span><small>" + esc(e.ar) + "</small></div></div>";
      }).join("") + "</div>" +
      '<div class="actions"><button type="button" class="btn block" data-act="go">ابدأ التمارين (' + g.exercises.length + ") ✏️</button></div>";
    view.querySelector('[data-act="go"]').onclick = function () {
      quiz(g.exercises.map(function (x) { return Object.assign({ lesson: g.id }, x); }), {
        title: g.ar,
        done: function (score, total) {
          var p = S.lessons[g.id] || { best: 0, total: total };
          S.lessons[g.id] = { best: Math.max(p.best, score), total: total, last: now() };
          save();
          resultScreen(score, total, "#/grammar/" + g.id, "عيد الدرس", null, "#/grammar");
        }
      });
    };
  }

  // practice: mixed questions from words you have seen + grammar
  function practice() {
    setTab("home");
    var seen = D.words.filter(function (w) { return S.cards[w.id]; });
    var pool = seen.length >= 4 ? seen : D.words.slice(0, 12);
    var qs = [];
    C.shuffle(pool).slice(0, 6).forEach(function (w, k) {
      if (k % 3 === 2 && "speechSynthesis" in window) qs.push({ type: "dictation", text: w.en, answer: [w.en.replace(/\s*\(.*\)$/, "")], wordId: w.id, ar: w.ar });
      else qs.push(C.wordQuestion(w, D.words, k % 2 ? "ar2en" : "en2ar"));
    });
    var gx = [];
    D.grammar.forEach(function (g) { g.exercises.forEach(function (x) { gx.push(Object.assign({ lesson: g.id }, x)); }); });
    qs = qs.concat(C.shuffle(gx).slice(0, 4));
    quiz(C.shuffle(qs), {
      title: "تدريب سريع",
      onAnswer: function (q, ok) { if (q.wordId && S.cards[q.wordId]) { S.cards[q.wordId] = C.schedule(S.cards[q.wordId], ok ? 4 : 2, now()); save(); } },
      done: function (score, total) { resultScreen(score, total, "#/practice", "تدريب ثاني"); }
    });
  }

  function phrases() {
    setTab("phrases");
    view.innerHTML = "<h1>جمل جاهزة 💬</h1><p class='muted'>اضغط 🔊 واسمع، وكرّر بصوت عالي.</p>" +
      D.phraseGroups.map(function (g) {
        return "<h2>" + g.icon + " " + esc(g.ar) + '</h2><div class="card">' + g.items.map(function (p) {
          return '<div class="phrase">' + speakBtn(p.en) + '<div><span class="en">' + esc(p.en) + "</span><small>" + esc(p.ar) + "</small></div></div>";
        }).join("") + "</div>";
      }).join("");
  }

  function stats() {
    setTab("stats");
    var st = S.stats, lv = C.level(st.xp || 0);
    var seen = Object.keys(S.cards).length;
    var learned = D.words.filter(function (w) { return C.isLearned(S.cards[w.id]); }).length;
    var done = D.grammar.filter(function (g) { return C.lessonDone(S.lessons, g.id); }).length;
    view.innerHTML = "<h1>تقدّمي 📊</h1>" +
      '<div class="stats">' +
        stat(st.xp || 0, "مجموع النقاط") + stat(lv.level, "المستوى") +
        stat(C.currentStreak(st, now()) + " 🔥", "أيام متتالية") + stat(st.best || 0, "أطول سلسلة") +
        stat(learned + " / " + D.words.length, "كلمات محفوظة") + stat(seen, "كلمات شفتها") +
        stat(done + " / " + D.grammar.length, "دروس قواعد") + stat(C.dueWords(D.words, S.cards, now()).length, "للمراجعة هلأ") +
      "</div><h2>الإعدادات</h2><div class='card'>" +
        '<div class="setting"><span>سرعة النطق</span><span class="chip-row">' + [0.7, 0.9, 1].map(function (r) {
          return '<button type="button" class="chip' + (S.settings.rate === r ? " on" : "") + '" data-rate="' + r + '">' + ({ 0.7: "بطيء", 0.9: "عادي", 1: "سريع" })[r] + "</button>";
        }).join("") + "</span></div>" +
        '<div class="setting"><span>الشكل</span><span class="chip-row">' + [["", "تلقائي"], ["light", "فاتح"], ["dark", "داكن"]].map(function (o) {
          return '<button type="button" class="chip' + ((S.settings.theme || "") === o[0] ? " on" : "") + '" data-theme="' + o[0] + '">' + o[1] + "</button>";
        }).join("") + "</span></div>" +
        '<div class="setting"><span>جرّب الصوت</span>' + speakBtn("Hello! I'm learning English every day.") + "</div>" +
        '<div class="setting"><span class="muted">مسح كل التقدّم</span><button type="button" class="chip" data-act="reset" style="color:var(--bad)">مسح</button></div>' +
      "</div>" +
      '<p class="muted" style="font-size:13px;margin-top:16px">تقدّمك محفوظ على هالجهاز وهالمتصفح. English Coach v' + C.VERSION + " · © 2026 Ali Izzeddin Mohammad Hasan</p>";
    view.querySelectorAll("[data-rate]").forEach(function (b) { b.onclick = function () { S.settings.rate = Number(b.getAttribute("data-rate")); save(); stats(); say("This is the new speed."); }; });
    view.querySelectorAll("[data-theme]").forEach(function (b) { b.onclick = function () { S.settings.theme = b.getAttribute("data-theme") || null; save(); applyTheme(); stats(); }; });
    view.querySelector('[data-act="reset"]').onclick = function () {
      if (!confirm("أكيد بدك تمسح كل التقدّم؟ ما بترجع.")) return;
      S = { cards: {}, stats: {}, lessons: {}, settings: S.settings }; save(); renderTop(); stats(); toast("انمسح التقدّم");
    };
  }
  function stat(v, label) { return '<div class="stat"><b>' + esc(v) + "</b><small>" + esc(label) + "</small></div>"; }

  // ---------- shared quiz runner ----------
  function progress(i, n, label) {
    return '<div class="progress"><span class="muted" style="font-size:14px;white-space:nowrap">' + esc(label) + " · " + (i + 1) + "/" + n + "</span>" +
      '<div class="bar"><i style="width:' + Math.round(i / n * 100) + '%"></i></div></div>';
  }
  function quiz(questions, opts) {
    var i = 0, score = 0;
    function show() {
      var q = questions[i], body = "";
      if (q.type === "mc") {
        var isEn = q.dir === "en2ar" || (q.lesson && /[a-z]/i.test(q.q || ""));
        var prompt = q.prompt || q.q;
        body = '<div class="q-prompt' + (isEn ? " en" : "") + '">' + (q.dir === "en2ar" ? speakBtn(prompt) : "") + "<span>" + esc(prompt) + "</span></div>" +
          (q.dir ? '<p class="q-sub">' + (q.dir === "en2ar" ? "شو معناها؟" : "شو هي بالإنجليزي؟") + "</p>" : "") +
          '<div class="options">' + q.options.map(function (o) { return '<button type="button" class="opt' + (q.dir === "ar2en" || q.lesson ? " en" : "") + '" data-o="' + esc(o) + '">' + esc(o) + "</button>"; }).join("") + "</div>";
      } else if (q.type === "fill") {
        body = '<div class="q-prompt en"><span>' + esc(q.q) + '</span></div><p class="q-sub">اكتب الكلمة الناقصة</p>' +
          '<input class="field" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type here">' +
          '<div class="actions"><button type="button" class="btn block" data-act="check">تحقّق</button></div>';
      } else if (q.type === "dictation") {
        body = '<div class="q-prompt"><span>اسمع واكتب 🎧</span>' + speakBtn(q.text, true) + '</div><p class="q-sub">اضغط 🔊 وكم مرة بدك</p>' +
          '<input class="field" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type what you hear">' +
          '<div class="actions"><button type="button" class="btn block" data-act="check">تحقّق</button></div>';
      } else if (q.type === "order") {
        body = '<div class="q-prompt"><span>رتّب الكلمات لتكوّن جملة صحيحة</span></div><div class="built" id="built"></div><div class="pool" id="pool">' +
          C.shuffle(q.words).map(function (w, k) { return '<button type="button" class="wbtn" data-k="' + k + '">' + esc(w) + "</button>"; }).join("") + "</div>" +
          '<div class="actions row"><button type="button" class="btn ghost" data-act="clear">مسح</button><button type="button" class="btn" data-act="check">تحقّق</button></div>';
      }
      view.innerHTML = progress(i, questions.length, opts.title) + '<div class="card">' + body + '<div id="fb"></div></div>';
      if (q.type === "dictation") setTimeout(function () { say(q.text); }, 250);
      if (q.type === "mc" && q.dir === "en2ar") say(q.prompt);
      wire(q);
      var f = view.querySelector("#ans"); if (f) f.focus();
    }
    function wire(q) {
      if (q.type === "mc") {
        view.querySelectorAll("[data-o]").forEach(function (b) {
          b.onclick = function () {
            var ok = b.getAttribute("data-o") === q.answer;
            view.querySelectorAll("[data-o]").forEach(function (x) {
              x.disabled = true;
              if (x.getAttribute("data-o") === q.answer) x.classList.add("right");
            });
            if (!ok) b.classList.add("wrong");
            finish(q, ok ? "correct" : "wrong");
          };
        });
      } else if (q.type === "fill" || q.type === "dictation") {
        var input = view.querySelector("#ans"), btn = view.querySelector('[data-act="check"]');
        var go = function () { if (!input.value.trim()) return; input.disabled = true; btn.disabled = true; finish(q, C.checkAnswer(input.value, q.answer)); };
        btn.onclick = go;
        input.onkeydown = function (e) { if (e.key === "Enter") go(); };
      } else if (q.type === "order") {
        var built = [], pool = view.querySelector("#pool"), box = view.querySelector("#built");
        var redraw = function () {
          box.innerHTML = built.map(function (b, k) { return '<button type="button" class="wbtn" data-b="' + k + '">' + esc(b.w) + "</button>"; }).join("");
          box.querySelectorAll("[data-b]").forEach(function (el) {
            el.onclick = function () { var item = built.splice(Number(el.getAttribute("data-b")), 1)[0]; pool.querySelector('[data-k="' + item.k + '"]').classList.remove("used"); redraw(); };
          });
        };
        pool.querySelectorAll("[data-k]").forEach(function (el) {
          el.onclick = function () { if (el.classList.contains("used")) return; el.classList.add("used"); built.push({ w: el.textContent, k: el.getAttribute("data-k") }); redraw(); };
        });
        view.querySelector('[data-act="clear"]').onclick = function () { built = []; pool.querySelectorAll(".used").forEach(function (x) { x.classList.remove("used"); }); redraw(); };
        view.querySelector('[data-act="check"]').onclick = function () {
          if (!built.length) return;
          view.querySelectorAll(".wbtn, [data-act]").forEach(function (x) { x.disabled = true; });
          finish(q, C.checkOrder(built.map(function (b) { return b.w; }), q.answer) ? "correct" : "wrong");
        };
      }
    }
    function finish(q, res) {
      var ok = res !== "wrong";
      if (ok) score++;
      gain(res === "correct" ? 5 : res === "almost" ? 3 : 0);
      if (opts.onAnswer) opts.onAnswer(q, ok);
      var right = q.type === "order" ? q.answer : [].concat(q.answer)[0];
      var msg = res === "correct" ? "✅ صح! " + ["ممتاز", "برافو", "عاش", "ما شاء الله"][Math.floor(Math.random() * 4)]
        : res === "almost" ? "👌 تقريباً، انتبه للإملاء: <span class='en'>" + esc(right) + "</span>"
        : "❌ الجواب الصح: <span class='en'>" + esc(right) + "</span>" + (q.hint ? "<br><small>💡 " + esc(q.hint) + "</small>" : "") + (q.ar ? "<br><small>" + esc(q.ar) + "</small>" : "");
      var fb = view.querySelector("#fb");
      fb.innerHTML = '<div class="feedback ' + (res === "correct" ? "ok" : res === "almost" ? "almost" : "bad") + '">' + msg + "</div>" +
        '<div class="actions"><button type="button" class="btn block" data-act="next">' + (i < questions.length - 1 ? "التالي ←" : "النتيجة 🏁") + "</button></div>";
      if (q.type === "order") say(q.answer);
      var nx = fb.querySelector('[data-act="next"]');
      nx.focus();
      nx.onclick = function () { i++; if (i < questions.length) show(); else opts.done(score, questions.length); };
    }
    show();
  }

  function resultScreen(score, total, againHref, againLabel, customMsg, backHref) {
    var pct = score == null ? 100 : Math.round(score / total * 100);
    var line = customMsg || (pct === 100 ? "علامة كاملة! 🏆" : pct >= 80 ? "ممتاز، كمّل هيك 💪" : pct >= 50 ? "منيح، بالتكرار بتصير أحسن 👍" : "ولا يهمك، الغلط هو اللي بيعلّم 🙂");
    if (score != null && score === total) gain(10);
    view.innerHTML = '<div class="card result">' + (score == null ? '<div class="big">✓</div>' : '<div class="big en">' + score + "/" + total + "</div>") +
      "<h1>" + esc(line) + '</h1><p class="muted">مجموع نقاطك: ' + (S.stats.xp || 0) + " · اليوم: " + (S.stats.today || 0) + " من " + C.DAILY_GOAL + "</p>" +
      '<div class="row" style="margin-top:16px">' + (againHref ? '<a class="btn" href="' + againHref + '" data-again>' + esc(againLabel || "كمان مرة") + "</a>" : "") +
      '<a class="btn ghost" href="' + (backHref || "#/") + '">' + (backHref ? "الدروس" : "الرئيسية") + "</a></div></div>";
    var again = view.querySelector("[data-again]");
    if (again && again.getAttribute("href") === location.hash) again.onclick = function (e) { e.preventDefault(); route(); };
  }

  // ---------- router ----------
  function route() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    var parts = (location.hash || "#/").slice(2).split("/");
    var r = parts[0];
    if (r === "learn") learn(parts[1]);
    else if (r === "review") review();
    else if (r === "grammar") grammar(parts[1]);
    else if (r === "practice") practice();
    else if (r === "phrases") phrases();
    else if (r === "stats") stats();
    else home();
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }
  function applyTheme() {
    if (S.settings.theme) document.documentElement.setAttribute("data-theme", S.settings.theme);
    else document.documentElement.removeAttribute("data-theme");
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (b) { e.preventDefault(); say(b.getAttribute("data-say")); }
  });
  window.addEventListener("hashchange", route);
  applyTheme();
  renderTop();
  route();
})();

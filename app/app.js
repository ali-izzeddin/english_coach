/* Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt. */
/* English Coach - the app: hash routes, levels A1..C1, flashcards, lessons, writing, quizzes, speech.
   Data: data.js + data_levels.js, logic: core.js. */
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
    return {
      cards: s.cards || {}, stats: s.stats || {}, lessons: s.lessons || {}, writing: s.writing || {}, notes: s.notes || {},
      custom: s.custom || [], level: s.level || "A2", placed: !!s.placed,
      settings: Object.assign({ rate: 0.9, theme: null }, s.settings || {})
    };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function now() { return Date.now(); }
  function gain(xp) { S.stats = C.addXp(S.stats, xp, now()); save(); renderTop(); }
  /** Course words + the learner's own words ("mine"). */
  function allWords() {
    return D.words.concat(S.custom.map(function (c) {
      return { id: c.id, t: "mine", lv: c.lv || S.level, en: c.en, ar: c.ar, pos: "", ex: c.ex || "", exAr: c.exAr || "" };
    }));
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); } // **bold** in lesson text
  function topic(id) { return id === "mine" ? { id: "mine", icon: "⭐", ar: "كلماتي" } : D.topics.filter(function (t) { return t.id === id; })[0]; }
  function levelInfo(id) { return D.levels.filter(function (l) { return l.id === id; })[0]; }
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }
  function speakBtn(text, big) {
    if (!("speechSynthesis" in window) || !text) return "";
    return '<button type="button" class="speak' + (big ? " lg" : "") + '" data-say="' + esc(text) + '" aria-label="استمع">🔊</button>';
  }
  function levelChips(current, hrefBase) {
    return '<div class="chip-row" style="margin:10px 0 14px">' + D.levels.map(function (l) {
      return '<a class="chip' + (l.id === current ? " on" : "") + '" href="' + hrefBase + l.id + '">' + l.id + "</a>";
    }).join("") + "</div>";
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
    if (!("speechSynthesis" in window) || !text) return;
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
    document.getElementById("topStats").innerHTML =
      '<a class="pill" href="#/level" title="مستواك">📈 ' + S.level + '</a><span class="pill" title="أيام متتالية">🔥 ' + st + "</span>";
  }
  function setTab(name) {
    document.querySelectorAll(".tabs a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === name); });
  }

  // ---------- home ----------
  function home() {
    setTab("home");
    var t = now(), st = S.stats, words = allWords();
    var today = st.todayKey === C.dayKey(t) ? st.today : 0;
    var pct = Math.min(100, Math.round(today / C.DAILY_GOAL * 100));
    var due = C.dueWords(words, S.cards, t).length;
    var freshLv = C.newWords(D.words, S.cards, null, S.level).length;
    var lv = C.level(st.xp || 0), L = levelInfo(S.level);
    var learned = words.filter(function (w) { return C.isLearned(S.cards[w.id]); }).length;
    var lessonsLv = D.grammar.filter(function (g) { return g.lv === S.level; });
    var lessonsDone = lessonsLv.filter(function (g) { return C.lessonDone(S.lessons, g.id); }).length;
    var writeLv = D.writing.filter(function (x) { return x.lv === S.level; });
    var writeDone = writeLv.filter(function (x) { return S.writing[x.id]; }).length;
    view.innerHTML =
      (S.placed ? "" : '<a class="card" href="#/placement" style="display:block;text-decoration:none;margin-bottom:14px;border-color:var(--brand)"><b>🧭 اعمل اختبار تحديد المستوى</b><br><span class="muted">20 سؤال · 5 دقائق · بنعرف من وين تبدأ (A1 لـ C1)</span></a>') +
      '<div class="card hero"><div class="ring" style="--p:' + pct + '"><span>' + today + "<small>من " + C.DAILY_GOAL + "</small></span></div>" +
        "<div style='flex:1'><h1>" + (today >= C.DAILY_GOAL ? "خلّصت هدف اليوم 🎉" : "هدفك اليوم " + C.DAILY_GOAL + " نقطة") + "</h1>" +
        '<div class="muted">مستواك <b>' + S.level + " · " + esc(L.ar) + "</b> · نجمة " + lv.level + " · " + learned + " كلمة محفوظة</div>" +
        '<div class="bar"><i style="width:' + Math.round(lv.into / lv.need * 100) + '%"></i></div></div></div>' +
      "<h2>شو بدك تعمل؟</h2>" +
      '<div class="grid">' +
        tile("#/review", "🔁", "مراجعة الكلمات", due ? due + " كلمة بتستناك" : "ما في مراجعة هلأ", due) +
        tile("#/learn/" + S.level, "🆕", "كلمات " + S.level, freshLv + " كلمة جديدة") +
        tile("#/grammar", "📘", "قواعد " + S.level, lessonsDone + " من " + lessonsLv.length + " دروس") +
        tile("#/write/" + S.level, "✍️", "كتابة وترجمة", writeDone + " من " + writeLv.length + " جمل") +
        tile("#/practice", "🎯", "تدريب سريع", "10 أسئلة مختلطة") +
        tile("#/mine", "⭐", "كلماتي", S.custom.length + " كلمة أضفتها") +
        tile("#/phrases", "💬", "جمل جاهزة", "للشغل والحياة") +
        tile("#/level", "📈", "مساري A1 ← C1", "تقدّمك بكل مستوى") +
      "</div>" +
      '<p class="muted" style="margin-top:18px;font-size:14px">💡 10 لـ15 دقيقة كل يوم: المراجعة، و5 كلمات، وجملتين كتابة. وكل ما خلّصت مستوى، انتقل للي بعده.</p>';
  }
  function tile(href, ic, title, sub, badge) {
    return '<a class="tile" href="' + href + '"><span class="ic">' + ic + "</span><b>" + esc(title) + "</b><small>" + esc(sub) + "</small>" +
      (badge ? '<span class="badge">' + badge + "</span>" : "") + "</a>";
  }

  // ---------- level path & placement ----------
  function levelView() {
    setTab("stats");
    view.innerHTML = "<h1>مسارك من A1 لـ C1 📈</h1><p class='muted'>اختار المستوى اللي بدك تدرسه. بنصحك تخلّص 80% من مستواك قبل ما تنتقل.</p>" +
      '<div class="list">' + D.levels.map(function (l) {
        var ws = D.words.filter(function (w) { return w.lv === l.id; });
        var wl = ws.filter(function (w) { return C.isLearned(S.cards[w.id]); }).length;
        var gs = D.grammar.filter(function (g) { return g.lv === l.id; });
        var gd = gs.filter(function (g) { return C.lessonDone(S.lessons, g.id); }).length;
        var xs = D.writing.filter(function (x) { return x.lv === l.id; });
        var xd = xs.filter(function (x) { return S.writing[x.id]; }).length;
        var total = ws.length + gs.length + xs.length, done = wl + gd + xd;
        var pct = total ? Math.round(done / total * 100) : 0;
        return '<button type="button" class="lrow" data-lv="' + l.id + '" style="text-align:start;width:100%;' + (l.id === S.level ? "border-color:var(--brand);border-width:2px" : "") + '">' +
          '<span class="mark" style="width:46px;height:46px">' + l.id + "</span><div><b>" + esc(l.ar) + (l.id === S.level ? " · مستواك الحالي" : "") + "</b><small>" + esc(l.desc) + "</small>" +
          '<small style="display:block">' + wl + "/" + ws.length + " كلمة · " + gd + "/" + gs.length + " درس · " + xd + "/" + xs.length + " كتابة</small>" +
          '<div class="bar"><i style="width:' + pct + '%"></i></div></div><b class="en">' + pct + "%</b></button>";
      }).join("") + "</div>" +
      '<div class="actions"><a class="btn ghost block" href="#/placement">🧭 ' + (S.placed ? "عيد" : "اعمل") + " اختبار تحديد المستوى</a></div>";
    view.querySelectorAll("[data-lv]").forEach(function (b) {
      b.onclick = function () { S.level = b.getAttribute("data-lv"); save(); renderTop(); toast("صار مستواك " + S.level); levelView(); };
    });
  }

  function placementTest() {
    setTab("stats");
    var qs = [];
    C.LEVELS.forEach(function (lv) {
      var pool = [];
      D.grammar.filter(function (g) { return g.lv === lv; }).forEach(function (g) {
        g.exercises.forEach(function (x) { if (x.type === "mc") pool.push(Object.assign({ lesson: g.id, lv: lv }, x)); });
      });
      qs = qs.concat(C.shuffle(pool).slice(0, 4));
    });
    var scores = {};
    view.innerHTML = '<div class="card"><h1>🧭 اختبار تحديد المستوى</h1><p>' + qs.length + " سؤال، من السهل للصعب. جاوب بدون مساعدة، وإذا ما بتعرف خمّن. ما في نقاط على هالاختبار.</p>" +
      '<button type="button" class="btn block" data-act="go">يلا نبلّش</button></div>';
    view.querySelector('[data-act="go"]').onclick = function () {
      quiz(qs, {
        title: "تحديد المستوى", noXp: true, quiet: true,
        onAnswer: function (q, ok) { var s = scores[q.lv] || (scores[q.lv] = { right: 0, total: 0 }); s.total++; if (ok) s.right++; },
        done: function () {
          var r = C.placement(scores);
          S.level = r.study; S.placed = true; save(); renderTop();
          view.innerHTML = '<div class="card result"><div class="big en">' + r.study + "</div><h1>" +
            (r.level ? "نجحت لحد مستوى " + r.level + " 👏" : "بنبلّش من الأساس 💪") + "</h1><p>بنصحك تدرس مستوى <b>" + r.study + " · " + esc(levelInfo(r.study).ar) + "</b>.</p>" +
            '<p class="muted en" style="font-size:14px">' + C.LEVELS.map(function (l) { var s = scores[l] || { right: 0, total: 0 }; return l + ": " + s.right + "/" + s.total; }).join(" · ") + "</p>" +
            '<div class="row" style="margin-top:14px"><a class="btn" href="#/learn/' + r.study + '">ابدأ الكلمات</a><a class="btn ghost" href="#/">الرئيسية</a></div></div>';
        }
      });
    };
  }

  // ---------- learn new words (by level, then topic) ----------
  function learn(lv, topicId) {
    setTab("home");
    lv = lv && C.levelIndex(lv) >= 0 ? lv : S.level;
    if (!topicId) {
      var tps = D.topics.filter(function (t) { return D.words.some(function (w) { return w.t === t.id && w.lv === lv; }); });
      view.innerHTML = "<h1>كلمات جديدة 🆕</h1><p class='muted'>مستوى " + lv + " · " + esc(levelInfo(lv).ar) + ". اختار موضوع، وبنتعلم " + BATCH + " كلمات مع بعض.</p>" +
        levelChips(lv, "#/learn/") + "<div class='list'>" +
        tps.map(function (t) {
          var left = C.newWords(D.words, S.cards, t.id, lv).length, all = D.words.filter(function (w) { return w.t === t.id && w.lv === lv; }).length;
          return '<a class="lrow" href="#/learn/' + lv + "/" + t.id + '"><span class="ic">' + t.icon + "</span><div><b>" + esc(t.ar) + "</b><small>" +
            (left ? left + " كلمة جديدة من " + all : "خلّصت كلماته ✅") + "</small></div><span>‹</span></a>";
        }).join("") + "</div>";
      return;
    }
    var batch = C.newWords(D.words, S.cards, topicId, lv).slice(0, BATCH);
    if (!batch.length) { view.innerHTML = '<div class="empty">✅ خلّصت كلمات هالموضوع بمستوى ' + lv + '!<br><br><a class="btn" href="#/learn/' + lv + '">اختار موضوع ثاني</a></div>'; return; }
    var i = 0;
    function show() {
      var w = batch[i];
      view.innerHTML = progress(i, batch.length, topic(topicId).icon + " " + topic(topicId).ar + " · " + lv) + wordCard(w) +
        '<div class="actions"><button type="button" class="btn block" data-act="next">' + (i < batch.length - 1 ? "التالي ←" : "يلا نختبر 🎯") + "</button></div>";
      say(w.en);
      wireMic(w);
      view.querySelector('[data-act="next"]').onclick = function () { i++; if (i < batch.length) show(); else check(); };
    }
    function check() {
      var words = allWords();
      var qs = C.shuffle(batch).map(function (w, k) { return C.wordQuestion(w, words, k % 2 ? "ar2en" : "en2ar"); });
      quiz(qs, { title: "اختبار الكلمات الجديدة", onAnswer: function (q, ok) {
        S.cards[q.wordId] = C.schedule(S.cards[q.wordId], ok ? 4 : 2, now()); save();
      }, done: function (score, total) {
        resultScreen(score, total, "#/learn/" + lv + "/" + topicId, "كمان " + BATCH + " كلمات");
      } });
    }
    show();
  }
  function wordCard(w) {
    return '<div class="card flash"><div class="row" style="align-items:center;justify-content:center;gap:12px;flex:none">' + speakBtn(w.en, true) +
      '<span class="word en">' + esc(w.en) + "</span></div>" + (w.pos ? '<span class="pos en">' + esc(w.pos) + (w.lv ? " · " + w.lv : "") + "</span>" : "") +
      '<span class="ar">' + esc(w.ar) + "</span>" +
      (w.ex ? '<div class="ex">' + speakBtn(w.ex) + '<div><span class="en">' + esc(w.ex) + "</span><small>" + esc(w.exAr) + "</small></div></div>" : "") +
      (Rec ? '<button type="button" class="btn ghost" data-act="mic" style="min-height:42px">🎤 جرّب تلفظها</button>' : "") + "</div>";
  }
  function wireMic(w) {
    var mic = view.querySelector('[data-act="mic"]');
    if (mic) mic.onclick = function () { listen(w.en, function (ok, heard) { toast(ok ? "👏 نطق ممتاز!" : "سمعت: " + heard + " · جرّب كمان مرة"); }); };
  }

  // ---------- review (all words incl. mine) ----------
  function review() {
    setTab("review");
    var words = allWords();
    var due = C.dueWords(words, S.cards, now());
    if (!due.length) {
      var next = Object.keys(S.cards).map(function (k) { return S.cards[k].due; }).sort(function (a, b) { return a - b; })[0];
      view.innerHTML = '<div class="empty"><div style="font-size:48px">🎉</div><h1>ما في كلمات للمراجعة هلأ</h1>' +
        (next ? "<p>أقرب مراجعة: " + new Date(next).toLocaleString("ar-JO", { weekday: "long", hour: "numeric", minute: "2-digit" }) + "</p>" : "<p>ابدأ بتعلّم كلمات جديدة أول.</p>") +
        '<a class="btn" href="#/learn/' + S.level + '">تعلّم كلمات جديدة</a></div>';
      return;
    }
    var i = 0, total = due.length;
    function show() {
      var w = due[i];
      view.innerHTML = progress(i, total, "مراجعة") +
        '<div class="card flash"><div class="row" style="align-items:center;justify-content:center;gap:12px;flex:none">' + speakBtn(w.en, true) +
        '<span class="word en">' + esc(w.en) + '</span></div><span class="muted">تذكر المعنى؟ فكّر وبعدين اكشف</span>' +
        '<div id="back" hidden style="width:100%;display:flex;flex-direction:column;gap:12px;align-items:center"><span class="ar">' + esc(w.ar) + "</span>" +
        (w.ex ? '<div class="ex">' + speakBtn(w.ex) + '<div><span class="en">' + esc(w.ex) + "</span><small>" + esc(w.exAr) + "</small></div></div>" : "") + "</div></div>" +
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

  // ---------- grammar (grouped by level) ----------
  function grammar(id) {
    setTab("grammar");
    if (!id) {
      view.innerHTML = "<h1>القواعد 📘</h1><p class='muted'>" + D.grammar.length + " درس من A1 لـ C1، بشرح عربي وتمارين. الدرس بيتعلّم ✅ لما تجيب 80% أو أكثر.</p>" +
        D.levels.map(function (l) {
          var gs = D.grammar.filter(function (g) { return g.lv === l.id; });
          if (!gs.length) return "";
          return "<h2>" + l.id + " · " + esc(l.ar) + (l.id === S.level ? ' <small class="muted">(مستواك)</small>' : "") + "</h2><div class='list'>" + gs.map(function (g) {
            var p = S.lessons[g.id];
            return '<a class="lrow" href="#/grammar/' + g.id + '"><span class="ic">' + g.icon + "</span><div><b>" + esc(g.ar) + '</b><small class="en">' + esc(g.title) + "</small></div>" +
              (C.lessonDone(S.lessons, g.id) ? '<span class="done-mark">✅ ' + p.best + "/" + p.total + "</span>" : p ? '<span class="muted">' + p.best + "/" + p.total + "</span>" : "<span>‹</span>") + "</a>";
          }).join("") + "</div>";
        }).join("");
      return;
    }
    var g = D.grammar.filter(function (x) { return x.id === id; })[0];
    if (!g) { location.hash = "#/grammar"; return; }
    view.innerHTML = '<a href="#/grammar" class="chip">→ كل الدروس</a><h1 style="margin-top:12px">' + g.icon + " " + esc(g.ar) + '</h1><p class="en muted" style="margin:0 0 12px">' + esc(g.title) + " · " + g.lv + "</p>" +
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

  // ---------- writing: translation by level + writing tasks ----------
  function write(lv) {
    setTab("write");
    lv = lv && C.levelIndex(lv) >= 0 ? lv : S.level;
    var xs = D.writing.filter(function (x) { return x.lv === lv; });
    var done = xs.filter(function (x) { return S.writing[x.id]; }).length;
    var tasks = D.tasks.filter(function (t) { return C.levelIndex(t.lv) <= C.levelIndex(lv) + 1; });
    view.innerHTML = "<h1>كتابة وترجمة ✍️</h1><p class='muted'>أحسن طريقة توصل فيها لـ C: تكتب كل يوم. بنعطيك جملة بالعربي وإنت بتكتبها بالإنجليزي.</p>" +
      levelChips(lv, "#/write/") +
      '<div class="card"><b>🔤 ترجم جمل ' + lv + "</b><p class='muted' style='margin:4px 0 12px'>" + xs.length + " جمل · كتبت صح " + done + "</p>" +
      '<button type="button" class="btn block" data-act="go">ابدأ الترجمة</button></div>' +
      "<h2>📝 مهام كتابة (رسائل وفقرات)</h2><div class='list'>" + tasks.map(function (t) {
        return '<a class="lrow" href="#/task/' + t.id + '"><span class="mark" style="width:42px;height:42px">' + t.lv + "</span><div><b>" + esc(t.ar) + "</b>" +
          (S.notes[t.id] ? '<small class="done-mark">✅ كتبتها</small>' : "<small>نموذج جواب + قائمة تحقق</small>") + "</div></a>";
      }).join("") + "</div>";
    view.querySelector('[data-act="go"]').onclick = function () {
      var qs = C.shuffle(xs).slice(0, 6).map(function (x) { return { type: "write", id: x.id, ar: x.ar, answer: x.answers, lv: x.lv }; });
      quiz(qs, {
        title: "ترجمة " + lv,
        onAnswer: function (q, ok) { if (ok) { S.writing[q.id] = true; save(); } },
        done: function (score, total) { resultScreen(score, total, "#/write/" + lv, "كمان جمل", null, null); }
      });
    };
  }
  function task(id) {
    setTab("write");
    var t = D.tasks.filter(function (x) { return x.id === id; })[0];
    if (!t) { location.hash = "#/write"; return; }
    view.innerHTML = '<a href="#/write" class="chip">→ الكتابة</a><h1 style="margin-top:12px">📝 ' + esc(t.ar) + "</h1>" +
      '<p class="muted">مستوى ' + t.lv + '. اكتب بالإنجليزي، ولا تشوف النموذج قبل ما تخلّص 😉</p>' +
      '<textarea class="field" id="txt" rows="7" style="font-size:17px;line-height:1.6;resize:vertical" placeholder="Write here...">' + esc(S.notes[t.id] || "") + "</textarea>" +
      '<div class="actions"><button type="button" class="btn block" data-act="check">✓ قارن مع النموذج</button></div><div id="out"></div>';
    view.querySelector('[data-act="check"]').onclick = function () {
      var txt = view.querySelector("#txt").value.trim();
      if (txt.split(/\s+/).length < 5) { toast("اكتب جملتين عالأقل 🙂"); return; }
      var first = !S.notes[t.id];
      S.notes[t.id] = txt; save();
      if (first) gain(10);
      var hits = C.keyHits(txt, t.keys);
      var words = txt.split(/\s+/).length;
      view.querySelector("#out").innerHTML =
        '<div class="card" style="margin-top:14px"><b>قائمة التحقق</b><div class="list" style="margin-top:8px">' + t.keys.map(function (k, i) {
          return '<div class="' + (hits[i] ? "done-mark" : "muted") + '">' + (hits[i] ? "✅ " : "⬜ ") + '<span class="en">' + esc(k.split("|").join(" / ")) + "</span></div>";
        }).join("") + '</div><p class="muted" style="margin:10px 0 0">كتبت ' + words + " كلمة · استعملت " + hits.filter(Boolean).length + " من " + hits.length + "</p></div>" +
        '<div class="card" style="margin-top:12px"><div class="row" style="align-items:center"><b style="flex:1">💡 نموذج جواب</b>' + speakBtn(t.model) + "</div>" +
        '<p class="en" style="margin:8px 0 0;line-height:1.7">' + esc(t.model) + "</p></div>" +
        '<p class="muted" style="font-size:14px">نصيحة: قارن جملك بالنموذج، وانسخ أي تعبير عجبك لـ "كلماتي" عشان تراجعه.</p>';
    };
  }

  // ---------- my words ----------
  function mine() {
    setTab("home");
    view.innerHTML = "<h1>كلماتي ⭐</h1><p class='muted'>شفت كلمة أو جملة جديدة بالشغل أو بفيلم؟ ضيفها هون، وبتدخل بالمراجعة الذكية.</p>" +
      '<form class="card" id="add" autocomplete="off"><div class="list">' +
        '<input class="field" name="en" placeholder="English word or sentence" required maxlength="120">' +
        '<input class="field" name="ar" placeholder="المعنى بالعربي" required maxlength="120" style="direction:rtl;font-family:inherit">' +
        '<input class="field" name="ex" placeholder="Example (optional)" maxlength="200">' +
      '</div><div class="actions"><button type="submit" class="btn block">➕ أضف</button></div></form>' +
      "<h2>" + S.custom.length + " كلمة</h2><div class='card'>" + (S.custom.length ? S.custom.slice().reverse().map(function (c) {
        var card = S.cards[c.id];
        return '<div class="phrase">' + speakBtn(c.en) + '<div><span class="en">' + esc(c.en) + "</span><small>" + esc(c.ar) + (card && C.isLearned(card) ? " · ✅ محفوظة" : "") + "</small></div>" +
          '<button type="button" class="chip" data-del="' + esc(c.id) + '" aria-label="حذف">🗑</button></div>';
      }).join("") : '<p class="muted">لسا ما ضفت إشي.</p>') + "</div>";
    view.querySelector("#add").onsubmit = function (e) {
      e.preventDefault();
      var f = e.target, en = f.en.value.trim(), ar = f.ar.value.trim();
      if (!en || !ar) return;
      var id = "u:" + now().toString(36);
      S.custom.push({ id: id, en: en, ar: ar, ex: f.ex.value.trim(), lv: S.level, at: now() });
      S.cards[id] = { ef: 2.5, reps: 0, interval: 0, due: now(), seen: 0 };
      gain(2); save(); toast("انضافت ✅ وبتطلعلك بالمراجعة"); mine();
    };
    view.querySelectorAll("[data-del]").forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-del");
        S.custom = S.custom.filter(function (c) { return c.id !== id; });
        delete S.cards[id]; save(); mine();
      };
    });
  }

  // ---------- practice ----------
  function practice() {
    setTab("home");
    var words = allWords();
    var seen = words.filter(function (w) { return S.cards[w.id]; });
    var pool = seen.length >= 4 ? seen : D.words.filter(function (w) { return w.lv === S.level; }).slice(0, 12);
    var qs = [];
    C.shuffle(pool).slice(0, 5).forEach(function (w, k) {
      if (k % 3 === 2 && "speechSynthesis" in window) qs.push({ type: "dictation", text: w.en, answer: [w.en.replace(/\s*\(.*\)$/, "")], wordId: w.id, ar: w.ar });
      else qs.push(C.wordQuestion(w, words, k % 2 ? "ar2en" : "en2ar"));
    });
    var gx = [];
    D.grammar.filter(function (g) { return C.levelIndex(g.lv) <= C.levelIndex(S.level); }).forEach(function (g) {
      g.exercises.forEach(function (x) { gx.push(Object.assign({ lesson: g.id }, x)); });
    });
    qs = qs.concat(C.shuffle(gx).slice(0, 3));
    var wx = D.writing.filter(function (x) { return C.levelIndex(x.lv) <= C.levelIndex(S.level); });
    qs = qs.concat(C.shuffle(wx).slice(0, 2).map(function (x) { return { type: "write", id: x.id, ar: x.ar, answer: x.answers, lv: x.lv }; }));
    quiz(C.shuffle(qs), {
      title: "تدريب سريع",
      onAnswer: function (q, ok) {
        if (q.wordId && S.cards[q.wordId]) { S.cards[q.wordId] = C.schedule(S.cards[q.wordId], ok ? 4 : 2, now()); save(); }
        if (q.type === "write" && ok) { S.writing[q.id] = true; save(); }
      },
      done: function (score, total) { resultScreen(score, total, "#/practice", "تدريب ثاني"); }
    });
  }

  function phrases() {
    setTab("home");
    view.innerHTML = "<h1>جمل جاهزة 💬</h1><p class='muted'>اضغط 🔊 واسمع، وكرّر بصوت عالي.</p>" +
      D.phraseGroups.map(function (g) {
        return "<h2>" + g.icon + " " + esc(g.ar) + '</h2><div class="card">' + g.items.map(function (p) {
          return '<div class="phrase">' + speakBtn(p.en) + '<div><span class="en">' + esc(p.en) + "</span><small>" + esc(p.ar) + "</small></div></div>";
        }).join("") + "</div>";
      }).join("");
  }

  function stats() {
    setTab("stats");
    var st = S.stats, lv = C.level(st.xp || 0), words = allWords();
    var seen = Object.keys(S.cards).length;
    var learned = words.filter(function (w) { return C.isLearned(S.cards[w.id]); }).length;
    var done = D.grammar.filter(function (g) { return C.lessonDone(S.lessons, g.id); }).length;
    view.innerHTML = "<h1>تقدّمي 📊</h1>" +
      '<a class="lrow" href="#/level" style="margin-bottom:12px"><span class="mark" style="width:46px;height:46px">' + S.level + "</span><div><b>مستواك: " + esc(levelInfo(S.level).ar) + "</b><small>شوف مسارك A1 ← C1 وغيّر المستوى</small></div><span>‹</span></a>" +
      '<div class="stats">' +
        stat(st.xp || 0, "مجموع النقاط") + stat(lv.level, "النجمة") +
        stat(C.currentStreak(st, now()) + " 🔥", "أيام متتالية") + stat(st.best || 0, "أطول سلسلة") +
        stat(learned + " / " + words.length, "كلمات محفوظة") + stat(seen, "كلمات شفتها") +
        stat(done + " / " + D.grammar.length, "دروس قواعد") + stat(Object.keys(S.writing).length + " / " + D.writing.length, "جمل كتبتها صح") +
        stat(Object.keys(S.notes).length + " / " + D.tasks.length, "مهام كتابة") + stat(C.dueWords(words, S.cards, now()).length, "للمراجعة هلأ") +
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
      S = { cards: {}, stats: {}, lessons: {}, writing: {}, notes: {}, custom: [], level: "A2", placed: false, settings: S.settings };
      save(); renderTop(); stats(); toast("انمسح التقدّم");
    };
  }
  function stat(v, label) { return '<div class="stat"><b dir="ltr">' + esc(v) + "</b><small>" + esc(label) + "</small></div>"; }

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
        body = '<div class="q-prompt en"><span>' + esc(q.q) + '</span></div><p class="q-sub">اكتب الكلمة الناقصة</p>' + input("type here");
      } else if (q.type === "dictation") {
        body = '<div class="q-prompt"><span>اسمع واكتب 🎧</span>' + speakBtn(q.text, true) + '</div><p class="q-sub">اضغط 🔊 وكم مرة بدك</p>' + input("type what you hear");
      } else if (q.type === "write") {
        body = '<div class="q-prompt"><span>' + esc(q.ar) + '</span></div><p class="q-sub">✍️ اكتبها بالإنجليزي · ' + q.lv + "</p>" + input("Write in English...");
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
    function input(ph) {
      return '<input class="field" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + ph + '">' +
        '<div class="actions"><button type="button" class="btn block" data-act="check">تحقّق</button></div>';
    }
    function wire(q) {
      if (q.type === "mc") {
        view.querySelectorAll("[data-o]").forEach(function (b) {
          b.onclick = function () {
            var ok = b.getAttribute("data-o") === q.answer;
            view.querySelectorAll("[data-o]").forEach(function (x) {
              x.disabled = true;
              if (x.getAttribute("data-o") === q.answer && !opts.quiet) x.classList.add("right");
            });
            if (!ok && !opts.quiet) b.classList.add("wrong");
            finish(q, ok ? "correct" : "wrong");
          };
        });
      } else if (q.type === "fill" || q.type === "dictation" || q.type === "write") {
        var inp = view.querySelector("#ans"), btn = view.querySelector('[data-act="check"]');
        var go = function () { if (!inp.value.trim()) return; inp.disabled = true; btn.disabled = true; finish(q, C.checkAnswer(inp.value, q.answer)); };
        btn.onclick = go;
        inp.onkeydown = function (e) { if (e.key === "Enter") go(); };
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
    function next() { i++; if (i < questions.length) show(); else opts.done(score, questions.length); }
    function finish(q, res) {
      var ok = res !== "wrong";
      if (ok) score++;
      if (!opts.noXp) gain(res === "correct" ? 5 : res === "almost" ? 3 : 0);
      if (opts.onAnswer) opts.onAnswer(q, ok);
      var fb = view.querySelector("#fb");
      if (opts.quiet) { setTimeout(next, 250); return; }
      var right = q.type === "order" ? q.answer : [].concat(q.answer)[0];
      var others = q.type === "write" && q.answer.length > 1 ? "<br><small>ممكن كمان: <span class='en'>" + esc(q.answer.slice(1, 3).join(" / ")) + "</span></small>" : "";
      var msg = res === "correct" ? "✅ صح! " + ["ممتاز", "برافو", "عاش", "ما شاء الله"][Math.floor(Math.random() * 4)] + (q.type === "write" ? others : "")
        : res === "almost" ? "👌 تقريباً، انتبه للإملاء: <span class='en'>" + esc(right) + "</span>"
        : "❌ الجواب الصح: <span class='en'>" + esc(right) + "</span>" + others + (q.hint ? "<br><small>💡 " + esc(q.hint) + "</small>" : "") + (q.ar && q.type !== "write" ? "<br><small>" + esc(q.ar) + "</small>" : "");
      fb.innerHTML = '<div class="feedback ' + (res === "correct" ? "ok" : res === "almost" ? "almost" : "bad") + '">' + msg + "</div>" +
        (q.type === "write" && !ok ? '<button type="button" class="chip" data-act="self" style="margin-top:10px">كتبتها صح بطريقة ثانية ✓</button>' : "") +
        '<div class="actions"><button type="button" class="btn block" data-act="next">' + (i < questions.length - 1 ? "التالي ←" : "النتيجة 🏁") + "</button></div>";
      if (q.type === "order" || q.type === "write") say(right);
      var self = fb.querySelector('[data-act="self"]');
      if (self) self.onclick = function () {
        score++; gain(3); if (opts.onAnswer) opts.onAnswer(q, true);
        self.disabled = true; self.textContent = "✓ انحسبت صح";
      };
      var nx = fb.querySelector('[data-act="next"]');
      nx.focus();
      nx.onclick = next;
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
    if (r === "learn") learn(parts[1], parts[2]);
    else if (r === "review") review();
    else if (r === "grammar") grammar(parts[1]);
    else if (r === "write") write(parts[1]);
    else if (r === "task") task(parts[1]);
    else if (r === "mine") mine();
    else if (r === "practice") practice();
    else if (r === "phrases") phrases();
    else if (r === "level") levelView();
    else if (r === "placement") placementTest();
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

/* Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt. */
/* English Coach - pure logic (no DOM): spaced repetition, answer checking, streaks, quiz building. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ECCore = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var VERSION = "1.0.0";
  var DAY = 86400000;
  var DAILY_GOAL = 30; // XP

  /** Lower case, straight quotes, no end punctuation, single spaces. */
  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[‘’ʼ`]/g, "'")
      .replace(/[.,!?;:"()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /** Edit distance where swapping two neighbouring letters (recieve/receive) counts as one typo. */
  function levenshtein(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 0; j <= n; j++) { d[0][j] = j; }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[m][n];
  }

  /**
   * Check a typed answer. accepted = string or list of strings.
   * Returns "correct", "almost" (one small typo in a longer answer) or "wrong".
   */
  function checkAnswer(given, accepted) {
    var g = normalize(given);
    var list = [].concat(accepted).map(normalize);
    if (!g) return "wrong";
    if (list.indexOf(g) >= 0) return "correct";
    for (var i = 0; i < list.length; i++) {
      if (list[i].length >= 5 && levenshtein(g, list[i]) === 1) return "almost";
    }
    return "wrong";
  }

  /**
   * SM-2 spaced repetition. card = {ef, reps, interval(days), due(ms)}; grade 0..5 (>=3 = remembered).
   * Returns a NEW card object.
   */
  function schedule(card, grade, now) {
    var c = card || {};
    var ef = c.ef || 2.5, reps = c.reps || 0, interval = c.interval || 0;
    if (grade < 3) {
      reps = 0;
      interval = 0;          // see it again this session / in 10 minutes
    } else {
      reps += 1;
      interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ef);
    }
    ef = Math.max(1.3, ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
    var due = grade < 3 ? now + 10 * 60000 : now + interval * DAY;
    return { ef: Math.round(ef * 100) / 100, reps: reps, interval: interval, due: due, seen: (c.seen || 0) + 1, last: now };
  }

  /** A word counts as "learned" after 3 correct reviews in a row. */
  function isLearned(card) { return !!card && card.reps >= 3; }

  /** Words due for review now, oldest first. cards = {id: card}. */
  function dueWords(words, cards, now) {
    return words.filter(function (w) { var c = cards[w.id]; return c && c.due <= now; })
      .sort(function (a, b) { return cards[a.id].due - cards[b.id].due; });
  }

  /** Words never studied, in course order, optionally for one topic. */
  function newWords(words, cards, topic) {
    return words.filter(function (w) { return !cards[w.id] && (!topic || w.t === topic); });
  }

  function dayKey(date) {
    var d = new Date(date);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  /** Add XP and update the streak (consecutive days with at least one point). Returns a NEW stats object. */
  function addXp(stats, xp, now) {
    var s = Object.assign({ xp: 0, streak: 0, lastDay: null, today: 0, todayKey: null, best: 0 }, stats || {});
    var key = dayKey(now);
    if (s.todayKey !== key) { s.today = 0; s.todayKey = key; }
    if (xp > 0 && s.lastDay !== key) {
      var yesterday = dayKey(now - DAY);
      s.streak = s.lastDay === yesterday ? s.streak + 1 : 1;
      s.lastDay = key;
      s.best = Math.max(s.best, s.streak);
    }
    s.xp += xp;
    s.today += xp;
    return s;
  }

  /** Streak shown to the user: 0 if they missed yesterday and today. */
  function currentStreak(stats, now) {
    if (!stats || !stats.lastDay) return 0;
    var today = dayKey(now), yesterday = dayKey(now - DAY);
    return stats.lastDay === today || stats.lastDay === yesterday ? stats.streak : 0;
  }

  function level(xp) {
    // 0, 100, 250, 450, 700 ... (each level needs 50 more than the last)
    var lvl = 1, need = 100, total = 0;
    while (xp >= total + need) { total += need; lvl++; need += 50; }
    return { level: lvl, into: xp - total, need: need };
  }

  /** Deterministic shuffle when a seed is given (tests), random otherwise. */
  function shuffle(arr, seed) {
    var a = arr.slice(), s = seed == null ? null : seed >>> 0;
    var rnd = s == null ? Math.random : function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /** Multiple-choice question for a word: 4 options from the same topic when possible. dir "en2ar" | "ar2en". */
  function wordQuestion(word, words, dir, seed) {
    var pool = words.filter(function (w) { return w.id !== word.id; });
    var same = pool.filter(function (w) { return w.t === word.t; });
    var others = shuffle(same.length >= 3 ? same : pool, seed).slice(0, 3);
    var key = dir === "ar2en" ? "en" : "ar";
    var options = shuffle([word].concat(others), seed == null ? null : seed + 7).map(function (w) { return w[key]; });
    return { type: "mc", dir: dir, wordId: word.id, prompt: dir === "ar2en" ? word.ar : word.en, options: options, answer: word[key] };
  }

  /** Is the built sentence (array of words) equal to the answer, ignoring case and punctuation? */
  function checkOrder(built, answer) {
    return normalize(built.join(" ")) === normalize(answer);
  }

  /** Grammar lesson progress: best score per lesson {id: {best, total}}. */
  function lessonDone(progress, id) {
    var p = progress && progress[id];
    return !!p && p.best >= Math.ceil(p.total * 0.8);
  }

  /** Problems in the course data (tests use this). */
  function validateData(d) {
    var errs = [], ids = {}, topics = {};
    (d.topics || []).forEach(function (t) { topics[t.id] = true; });
    (d.words || []).forEach(function (w) {
      if (ids[w.id]) errs.push("duplicate word id " + w.id);
      ids[w.id] = true;
      if (!topics[w.t]) errs.push("word " + w.id + " has unknown topic " + w.t);
      if (!w.en || !w.ar || !w.ex || !w.exAr) errs.push("word " + w.id + " is missing text");
    });
    (d.grammar || []).forEach(function (g) {
      (g.exercises || []).forEach(function (x, i) {
        var where = g.id + "#" + i;
        if (x.type === "mc" && x.options.indexOf(x.answer) < 0) errs.push(where + " answer not in options");
        if (x.type === "fill" && !(x.answer && x.answer.length)) errs.push(where + " fill has no answer");
        if (x.type === "order" && !checkOrder(x.words, x.answer)) errs.push(where + " order words do not build the answer");
      });
    });
    return errs;
  }

  return {
    VERSION: VERSION, DAY: DAY, DAILY_GOAL: DAILY_GOAL, normalize: normalize, levenshtein: levenshtein,
    checkAnswer: checkAnswer, schedule: schedule, isLearned: isLearned, dueWords: dueWords, newWords: newWords,
    dayKey: dayKey, addXp: addXp, currentStreak: currentStreak, level: level, shuffle: shuffle,
    wordQuestion: wordQuestion, checkOrder: checkOrder, lessonDone: lessonDone, validateData: validateData
  };
});

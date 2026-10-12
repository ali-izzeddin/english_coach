// Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt.
// Run: node --test   (inside english_coach)
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const C = require("../app/core.js");

function data() {
  const box = { window: {} };
  const ctx = vm.createContext(box);
  for (const f of ["data.js", "data_levels.js"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "../app", f), "utf8"), ctx);
  return box.window.EC_DATA;
}
const T0 = new Date(2026, 9, 12, 10, 0).getTime();

test("course data is valid (ids, topics, every exercise answerable)", () => {
  assert.deepEqual(C.validateData(data()), []);
  const d = data();
  assert.ok(d.words.length >= 100, "at least 100 words");
  assert.ok(d.grammar.length >= 24, "at least 24 grammar lessons");
  for (const lv of C.LEVELS) {
    assert.ok(d.words.some((w) => w.lv === lv), "words for " + lv);
    assert.ok(d.writing.some((x) => x.lv === lv), "writing for " + lv);
    const mc = d.grammar.filter((g) => g.lv === lv).reduce((n, g) => n + g.exercises.filter((x) => x.type === "mc").length, 0);
    assert.ok(mc >= 4, "placement needs 4 mc questions for " + lv + " (has " + mc + ")");
  }
});

test("writing answers: contractions and long-sentence typos", () => {
  assert.equal(C.canon("I'm sure it's fine, don't worry!"), "i am sure it is fine do not worry");
  assert.equal(C.checkAnswer("I can't come", "I cannot come."), "correct");
  assert.equal(C.checkAnswer("She won't be late", ["She will not be late."]), "correct");
  assert.equal(C.checkAnswer("We've finished the report", "We have finished the report."), "correct");
  assert.equal(C.checkAnswer("I would have tld you abot it", "I would have told you about it."), "almost");
  assert.equal(C.checkAnswer("I recieve emails", "I receive emails."), "almost");
  assert.equal(C.checkAnswer("He goes home", "He went home."), "wrong");
  const d = data();
  for (const x of d.writing) for (const a of x.answers) assert.equal(C.checkAnswer(a, x.answers), "correct", x.id);
});

test("placement: highest level passed in a row decides the next level", () => {
  const s = (r) => ({ right: r, total: 4 });
  assert.deepEqual(C.placement({}), { level: null, study: "A1" });
  assert.deepEqual(C.placement({ A1: s(2), A2: s(4) }), { level: null, study: "A1" });
  assert.deepEqual(C.placement({ A1: s(4), A2: s(3), B1: s(1), B2: s(4) }), { level: "A2", study: "B1" });
  assert.deepEqual(C.placement({ A1: s(4), A2: s(4), B1: s(4), B2: s(4), C1: s(4) }), { level: "C1", study: "C1" });
  assert.equal(C.levelIndex("B2"), 3);
  assert.equal(C.levelIndex("Z9"), -1);
});

test("writing tasks: key phrases with alternatives", () => {
  assert.deepEqual(C.keyHits("Dear Sam, I'm writing to ask about the job. Best regards", ["dear", "I am writing|I write", "regards|thanks"]), [true, true, true]);
  assert.deepEqual(C.keyHits("Hi, see you", ["dear", "see you"]), [false, true]);
  const d = data();
  for (const t of d.tasks) assert.ok(C.keyHits(t.model, t.keys).every(Boolean), t.id);
});

test("new words can be filtered by level", () => {
  const ws = [{ id: "a", t: "x", lv: "A1" }, { id: "b", t: "x", lv: "B2" }, { id: "c", t: "y", lv: "B2" }];
  assert.deepEqual(C.newWords(ws, {}, null, "B2").map((w) => w.id), ["b", "c"]);
  assert.deepEqual(C.newWords(ws, { b: {} }, "x", "B2").map((w) => w.id), []);
});

test("answers: case, punctuation and apostrophes don't matter; one typo = almost", () => {
  assert.equal(C.checkAnswer("  Is Raining. ", ["is raining"]), "correct");
  assert.equal(C.checkAnswer("I’m writing", ["I'm writing"]), "correct");
  assert.equal(C.checkAnswer("recieve", "receive"), "almost");
  assert.equal(C.checkAnswer("on", ["in"]), "wrong");
  assert.equal(C.checkAnswer("", ["in"]), "wrong");
});

test("spaced repetition: intervals grow on success and reset on failure", () => {
  let c = C.schedule(null, 4, T0);
  assert.equal(c.interval, 1);
  assert.equal(c.due, T0 + C.DAY);
  c = C.schedule(c, 4, T0);
  assert.equal(c.interval, 3);
  c = C.schedule(c, 5, T0);
  assert.ok(c.interval > 3);
  assert.ok(C.isLearned(c));
  const failed = C.schedule(c, 1, T0);
  assert.equal(failed.reps, 0);
  assert.equal(failed.due, T0 + 10 * 60000, "failed card comes back in 10 minutes");
  assert.ok(failed.ef < c.ef && failed.ef >= 1.3);
});

test("due and new word lists", () => {
  const words = data().words;
  const cards = { [words[0].id]: { due: T0 - 1 }, [words[1].id]: { due: T0 + C.DAY } };
  assert.deepEqual(Array.from(C.dueWords(words, cards, T0), (w) => w.id), [words[0].id]);
  assert.equal(C.newWords(words, cards).length, words.length - 2);
  assert.ok(C.newWords(words, cards, "ai").every((w) => w.t === "ai"));
});

test("streak: consecutive days count, a missed day resets", () => {
  let s = C.addXp(null, 10, T0);
  assert.equal(s.streak, 1);
  s = C.addXp(s, 10, T0 + 3600000);
  assert.equal(s.streak, 1, "same day does not add");
  assert.equal(s.today, 20);
  s = C.addXp(s, 5, T0 + C.DAY);
  assert.equal(s.streak, 2);
  assert.equal(s.today, 5, "today's XP resets on a new day");
  assert.equal(C.currentStreak(s, T0 + 2 * C.DAY), 2, "still alive the next day");
  assert.equal(C.currentStreak(s, T0 + 3 * C.DAY), 0, "missed a whole day");
  s = C.addXp(s, 5, T0 + 3 * C.DAY);
  assert.equal(s.streak, 1);
  assert.equal(s.best, 2);
});

test("levels need more XP each time", () => {
  assert.deepEqual(C.level(0), { level: 1, into: 0, need: 100 });
  assert.equal(C.level(100).level, 2);
  assert.equal(C.level(249).level, 2);
  assert.equal(C.level(250).level, 3);
});

test("word questions have 4 unique options including the answer", () => {
  const words = data().words;
  for (let i = 0; i < 20; i++) {
    const q = C.wordQuestion(words[i], words, i % 2 ? "ar2en" : "en2ar", i);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(q.options.includes(q.answer));
  }
});

test("sentence building ignores case and punctuation", () => {
  assert.ok(C.checkOrder(["i", "am", "learning", "English", "now."], "I am learning English now"));
  assert.ok(!C.checkOrder(["am", "I", "learning"], "I am learning"));
});

test("shuffle with a seed is repeatable and keeps all items", () => {
  const a = [1, 2, 3, 4, 5, 6];
  assert.deepEqual(C.shuffle(a, 42), C.shuffle(a, 42));
  assert.deepEqual(C.shuffle(a, 42).sort(), a);
});

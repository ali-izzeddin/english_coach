/* Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt. */
/* English Coach - levels A1..C1: tags the base course, adds A1/A2 + B2/C1 words, B2/C1 grammar, writing practice. */
(function (D) {
  "use strict";
  D.levels = [
    { id: "A1", ar: "مبتدئ", desc: "جمل بسيطة عن نفسك وحياتك اليومية" },
    { id: "A2", ar: "أساسي", desc: "تتعامل بمواقف يومية وشغل بسيط" },
    { id: "B1", ar: "متوسط", desc: "تتواصل بالشغل وتكتب رسائل واضحة" },
    { id: "B2", ar: "فوق المتوسط", desc: "تناقش وتقنع وتكتب باحترافية" },
    { id: "C1", ar: "متقدم", desc: "لغة دقيقة ومرنة للعمل والدراسة" }
  ];
  D.topics.push({ id: "pro", icon: "🎓", ar: "كلمات متقدمة للعمل والدراسة" });

  // ---------- levels for the base course ----------
  var wordLv = {
    A2: ["client", "budget", "deliver", "colleague", "salary", "skill", "available", "download", "upload", "update", "install", "account", "password",
      "bug", "fix", "link", "order", "delivery", "receipt", "cancel", "appointment", "borrow", "lend", "comfortable", "decide", "prefer", "remind",
      "usually", "recently", "expensive", "cheap", "tired", "graduate", "neighbor", "weather", "forget", "worried", "browser", "translate", "label", "response"],
    B1: ["deadline", "proposal", "invoice", "feedback", "requirement", "revision", "estimate", "schedule", "priority", "contract", "experience",
      "responsible", "achieve", "apply", "hire", "remote", "relevant", "accurate", "fluent", "harmful", "offensive", "guideline", "evaluate", "rank",
      "prompt", "query", "factual", "secure", "backup", "server", "database", "feature", "layout", "complaint", "refund", "apologize", "issue", "solve",
      "confirm", "request", "assist", "hold", "appreciate", "convenient", "improve", "suggest"],
    B2: ["negotiate", "reliable", "annotate", "ambiguous", "misleading", "appropriate", "consistent", "judgment", "encrypt", "vulnerability",
      "responsive", "deploy", "inconvenience"]
  };
  Object.keys(wordLv).forEach(function (lv) {
    wordLv[lv].forEach(function (id) { D.words.forEach(function (w) { if (w.id === id) w.lv = lv; }); });
  });
  D.words.forEach(function (w) { if (!w.lv) w.lv = "B1"; });
  var gramLv = { present: "A1", articles: "A1", "time-prep": "A1", questions: "A1", past: "A2", future: "A2", compare: "A2", modals: "A2",
    quantity: "A2", perfect: "B1", conditionals: "B1", passive: "B1" };
  D.grammar.forEach(function (g) { g.lv = gramLv[g.id] || "B1"; });

  // ---------- more words ----------
  function W(id, t, lv, en, ar, pos, ex, exAr) { D.words.push({ id: id, t: t, lv: lv, en: en, ar: ar, pos: pos, ex: ex, exAr: exAr }); }
  // A1
  W("buy", "daily", "A1", "buy", "يشتري", "v", "I want to buy a new phone.", "أريد أن أشتري هاتفاً جديداً.");
  W("sell", "work", "A1", "sell", "يبيع", "v", "We sell gifts online.", "نبيع الهدايا أونلاين.");
  W("price", "daily", "A1", "price", "سعر", "n", "What is the price of this bag?", "ما سعر هذه الحقيبة؟");
  W("open", "daily", "A1", "open", "يفتح / مفتوح", "v/adj", "The shop is open until ten.", "المحل مفتوح حتى العاشرة.");
  W("busy", "daily", "A1", "busy", "مشغول", "adj", "I'm busy today. Can we talk tomorrow?", "أنا مشغول اليوم. هل نتكلم غداً؟");
  W("early", "daily", "A1", "early", "مبكراً", "adv", "I go to university early.", "أذهب إلى الجامعة مبكراً.");
  W("late", "daily", "A1", "late", "متأخر", "adj/adv", "Sorry, I'm late.", "آسف، أنا متأخر.");
  W("message", "tech", "A1", "message", "رسالة", "n", "I sent you a message.", "أرسلت لك رسالة.");
  W("help", "service", "A1", "help", "يساعد / مساعدة", "v/n", "Can you help me, please?", "هل يمكنك مساعدتي من فضلك؟");
  W("start", "work", "A1", "start", "يبدأ", "v", "We start work at nine.", "نبدأ العمل الساعة التاسعة.");
  W("finish", "work", "A1", "finish", "يُنهي", "v", "I finish my classes at two.", "أنهي محاضراتي الساعة الثانية.");
  W("understand", "daily", "A1", "understand", "يفهم", "v", "I don't understand this word.", "لا أفهم هذه الكلمة.");
  W("easy", "daily", "A1", "easy", "سهل", "adj", "This lesson is easy.", "هذا الدرس سهل.");
  W("difficult", "daily", "A1", "difficult", "صعب", "adj", "Grammar is difficult for me.", "القواعد صعبة بالنسبة لي.");
  W("friend", "daily", "A1", "friend", "صديق", "n", "My friend has a beautiful voice.", "صديقي صوته جميل.");
  // A2
  W("customer", "service", "A2", "customer", "زبون / عميل", "n", "The customer wants to change the color.", "الزبون يريد تغيير اللون.");
  W("discount", "work", "A2", "discount", "خصم", "n", "We have a 10% discount this week.", "عندنا خصم 10% هذا الأسبوع.");
  W("explain", "work", "A2", "explain", "يشرح", "v", "Can you explain the problem?", "هل يمكنك شرح المشكلة؟");
  W("arrive", "service", "A2", "arrive", "يصل", "v", "Your order will arrive tomorrow.", "سيصل طلبك غداً.");
  W("choose", "daily", "A2", "choose", "يختار", "v", "Choose a color for your mug.", "اختر لوناً لكوبك.");
  W("invite", "daily", "A2", "invite", "يدعو", "v", "They invited me to the wedding.", "دعوني إلى العرس.");
  W("advice", "daily", "A2", "advice", "نصيحة", "n", "Thanks for your advice.", "شكراً على نصيحتك.");
  W("mistake", "daily", "A2", "mistake", "خطأ / غلطة", "n", "Everyone makes mistakes.", "كل شخص يخطئ.");
  W("practice", "daily", "A2", "practice", "يتدرّب / تدريب", "v/n", "I practice English every day.", "أتدرب على الإنجليزية كل يوم.");
  W("succeed", "work", "A2", "succeed", "ينجح", "v", "If you work hard, you will succeed.", "إذا عملت بجد ستنجح.");
  // B2
  W("assess", "pro", "B2", "assess", "يقيّم / يحكم على", "v", "We need to assess the quality of each answer.", "يجب أن نقيّم جودة كل إجابة.");
  W("clarify", "pro", "B2", "clarify", "يوضّح", "v", "Could you clarify what you mean?", "هل يمكنك توضيح ما تقصد؟");
  W("ensure", "pro", "B2", "ensure", "يضمن / يتأكد", "v", "Please ensure that all prices are correct.", "من فضلك تأكد أن كل الأسعار صحيحة.");
  W("enhance", "pro", "B2", "enhance", "يحسّن / يعزّز", "v", "Good photos enhance your online store.", "الصور الجيدة تعزّز متجرك الإلكتروني.");
  W("implement", "pro", "B2", "implement", "ينفّذ / يطبّق", "v", "We implemented the new payment method.", "نفّذنا طريقة الدفع الجديدة.");
  W("maintain", "pro", "B2", "maintain", "يحافظ على / يصون", "v", "It's important to maintain a high success rate.", "من المهم الحفاظ على نسبة نجاح عالية.");
  W("crucial", "pro", "B2", "crucial", "حاسم / بالغ الأهمية", "adj", "Clear communication is crucial in remote work.", "التواصل الواضح بالغ الأهمية في العمل عن بُعد.");
  W("significant", "pro", "B2", "significant", "مهم / كبير (ملحوظ)", "adj", "There was a significant increase in orders.", "كانت هناك زيادة كبيرة في الطلبات.");
  W("consequence", "pro", "B2", "consequence", "نتيجة / عاقبة", "n", "Late delivery can have serious consequences.", "التأخر في التسليم قد تكون له عواقب خطيرة.");
  W("thorough", "pro", "B2", "thorough", "دقيق / شامل", "adj", "She did a thorough review of the document.", "قامت بمراجعة شاملة للمستند.");
  W("persuade", "pro", "B2", "persuade", "يُقنع", "v", "I persuaded the client to try the free preview.", "أقنعت العميل بتجربة المعاينة المجانية.");
  W("flexible", "pro", "B2", "flexible", "مرن", "adj", "I have a flexible schedule.", "لدي جدول مرن.");
  W("outcome", "pro", "B2", "outcome", "نتيجة / محصّلة", "n", "We are happy with the outcome of the project.", "نحن سعداء بنتيجة المشروع.");
  W("straightforward", "pro", "B2", "straightforward", "واضح وسهل / مباشر", "adj", "The setup is quick and straightforward.", "الإعداد سريع وسهل.");
  W("reluctant", "pro", "B2", "reluctant", "متردد / غير راغب", "adj", "Some shop owners are reluctant to try new technology.", "بعض أصحاب المحلات مترددون في تجربة التكنولوجيا الجديدة.");
  // C1
  W("concise", "pro", "C1", "concise", "موجز ومختصر", "adj", "Keep your proposal clear and concise.", "اجعل عرضك واضحاً وموجزاً.");
  W("convey", "pro", "C1", "convey", "ينقل / يوصل (معنى)", "v", "The translation should convey the same tone.", "يجب أن تنقل الترجمة نفس النبرة.");
  W("nuance", "pro", "C1", "nuance", "فرق دقيق / ظل معنى", "n", "Native speakers notice the nuances of the dialect.", "المتحدثون الأصليون يلاحظون الفروق الدقيقة في اللهجة.");
  W("coherent", "pro", "C1", "coherent", "مترابط / منطقي", "adj", "The response is accurate but not very coherent.", "الإجابة دقيقة لكنها غير مترابطة كثيراً.");
  W("discrepancy", "pro", "C1", "discrepancy", "تناقض / فرق غير متوقع", "n", "There is a discrepancy between the two reports.", "هناك تناقض بين التقريرين.");
  W("mitigate", "pro", "C1", "mitigate", "يخفّف (من خطر أو أثر)", "v", "Backups mitigate the risk of losing data.", "النسخ الاحتياطية تخفف خطر فقدان البيانات.");
  W("feasible", "pro", "C1", "feasible", "ممكن التنفيذ / عملي", "adj", "Is it feasible to finish by Friday?", "هل من الممكن الإنهاء بحلول الجمعة؟");
  W("explicit", "pro", "C1", "explicit", "صريح / واضح تماماً", "adj", "The guidelines are explicit about personal data.", "التعليمات صريحة بشأن البيانات الشخصية.");
  W("implicit", "pro", "C1", "implicit", "ضمني / غير مصرّح به", "adj", "There is an implicit assumption in the question.", "هناك افتراض ضمني في السؤال.");
  W("meticulous", "pro", "C1", "meticulous", "دقيق جداً / شديد الاهتمام بالتفاصيل", "adj", "Annotation work requires a meticulous approach.", "عمل التصنيف يحتاج إلى أسلوب دقيق جداً.");
  W("versatile", "pro", "C1", "versatile", "متعدد المهارات / متعدد الاستخدامات", "adj", "He is a versatile developer.", "هو مطوّر متعدد المهارات.");
  W("leverage", "pro", "C1", "leverage", "يستفيد من / يوظّف", "v", "Leverage your Arabic skills to find remote work.", "استفد من مهاراتك في العربية لإيجاد عمل عن بُعد.");
  W("plausible", "pro", "C1", "plausible", "معقول / قابل للتصديق", "adj", "The answer sounds plausible, but it is wrong.", "الإجابة تبدو معقولة، لكنها خاطئة.");
  W("undermine", "pro", "C1", "undermine", "يُضعف / يقوّض", "v", "Small mistakes can undermine trust.", "الأخطاء الصغيرة قد تُضعف الثقة.");
  W("pragmatic", "pro", "C1", "pragmatic", "عملي / واقعي", "adj", "We need a pragmatic solution, not a perfect one.", "نحتاج حلاً عملياً، لا حلاً مثالياً.");

  // ---------- B2 / C1 grammar ----------
  D.grammar.push(
    {
      id: "past-perfect", lv: "B2", icon: "⏪", title: "Past Perfect", ar: "الماضي التام",
      explain: [
        "**had + التصريف الثالث**: لحدث صار **قبل** حدث ثاني بالماضي.",
        "When I arrived, the meeting **had started**. (الاجتماع بدأ أول، وبعدين وصلت)",
        "كثير بييجي مع: before, after, by the time, already."
      ],
      examples: [
        { en: "By the time the client replied, I had finished the design.", ar: "عندما رد العميل، كنت قد أنهيت التصميم." },
        { en: "She had never used Gumroad before.", ar: "لم تكن قد استخدمت Gumroad من قبل." },
        { en: "We had already left when it started to rain.", ar: "كنا قد غادرنا عندما بدأ المطر." }
      ],
      exercises: [
        { type: "mc", q: "When I got to the station, the train ___.", options: ["left", "had left", "has left"], answer: "had left" },
        { type: "mc", q: "I ___ the email before he called.", options: ["had read", "have read", "was read"], answer: "had read" },
        { type: "fill", q: "She was tired because she ___ (not sleep) well.", answer: ["hadn't slept", "had not slept"] },
        { type: "fill", q: "By 2025, he ___ (work) there for five years.", answer: ["had worked", "had been working"] },
        { type: "mc", q: "After they ___ dinner, they went out.", options: ["had eaten", "have eaten", "eat"], answer: "had eaten" },
        { type: "order", words: ["I", "had", "never", "seen", "it", "before"], answer: "I had never seen it before" }
      ]
    },
    {
      id: "reported", lv: "B2", icon: "🗣️", title: "Reported Speech", ar: "الكلام المنقول",
      explain: [
        "لما ننقل كلام حدا، الزمن عادة **يرجع خطوة للماضي**: is → was، will → would، can → could، have done → had done.",
        "\"I am busy,\" he said. → He said (that) he **was** busy.",
        "**say** بدون مفعول، و**tell** مع مفعول: She said that... / She told **me** that...",
        "الأسئلة بتصير جملة عادية: \"Where do you live?\" → He asked where I **lived**."
      ],
      examples: [
        { en: "The client said that he would pay today.", ar: "قال العميل إنه سيدفع اليوم." },
        { en: "She told me she couldn't come.", ar: "قالت لي إنها لا تستطيع المجيء." },
        { en: "He asked if I had finished the task.", ar: "سألني إن كنت قد أنهيت المهمة." }
      ],
      exercises: [
        { type: "mc", q: "\"I am tired.\" → She said she ___ tired.", options: ["is", "was", "were"], answer: "was" },
        { type: "mc", q: "He ___ me that the order was ready.", options: ["said", "told", "says"], answer: "told" },
        { type: "mc", q: "\"I will call you.\" → He said he ___ call me.", options: ["will", "would", "can"], answer: "would" },
        { type: "fill", q: "\"Can you help?\" → She asked if I ___ help.", answer: ["could"] },
        { type: "fill", q: "\"Where do you work?\" → He asked where I ___.", answer: ["worked"] },
        { type: "order", words: ["She", "said", "that", "she", "was", "busy"], answer: "She said that she was busy" }
      ]
    },
    {
      id: "third-cond", lv: "B2", icon: "🔁", title: "Third Conditional", ar: "الشرط الثالث (ندم على الماضي)",
      explain: [
        "لشيء **ما صار** بالماضي ونتخيّل نتيجته: If + **had** + تصريف ثالث، **would have** + تصريف ثالث.",
        "If I **had studied**, I **would have passed**. (ما درست، فما نجحت)",
        "ممكن نستخدم could have / might have بدل would have."
      ],
      examples: [
        { en: "If I had known, I would have helped you.", ar: "لو كنت أعرف، لساعدتك." },
        { en: "If we had left earlier, we wouldn't have missed the bus.", ar: "لو غادرنا أبكر، لما فاتنا الباص." },
        { en: "She could have won if she had tried harder.", ar: "كان بإمكانها أن تفوز لو حاولت أكثر." }
      ],
      exercises: [
        { type: "mc", q: "If I ___ the message, I would have replied.", options: ["saw", "had seen", "have seen"], answer: "had seen" },
        { type: "mc", q: "If you had asked me, I ___ you.", options: ["would help", "would have helped", "will help"], answer: "would have helped" },
        { type: "fill", q: "If they ___ (not be) late, they would have caught the train.", answer: ["hadn't been", "had not been"] },
        { type: "fill", q: "We would have won if we ___ (play) better.", answer: ["had played"] },
        { type: "mc", q: "If it hadn't rained, we ___ to the beach.", options: ["would go", "would have gone", "went"], answer: "would have gone" },
        { type: "order", words: ["If", "I", "had", "known", "I", "would", "have", "come"], answer: "If I had known I would have come" }
      ]
    },
    {
      id: "relative", lv: "B2", icon: "🔗", title: "Relative Clauses", ar: "الجمل الوصفية (who / which / that / where / whose)",
      explain: [
        "**who** للأشخاص، **which** للأشياء، **that** للاثنين، **where** للأماكن، **whose** للملكية.",
        "The developer **who** built the store... / The app **which** I use... / The city **where** I live...",
        "إذا الجملة معلومة إضافية بين فواصل، ما بنستخدم that: My brother, **who** lives in Amman, is a teacher."
      ],
      examples: [
        { en: "This is the client who ordered the menu.", ar: "هذا هو العميل الذي طلب المنيو." },
        { en: "Zarqa is the city where I grew up.", ar: "الزرقاء هي المدينة التي نشأت فيها." },
        { en: "She's the owner whose shop sells handmade mugs.", ar: "هي صاحبة المحل الذي يبيع أكواباً يدوية." }
      ],
      exercises: [
        { type: "mc", q: "The woman ___ called you is my manager.", options: ["who", "which", "where"], answer: "who" },
        { type: "mc", q: "This is the laptop ___ I bought last year.", options: ["who", "which", "whose"], answer: "which" },
        { type: "mc", q: "That's the café ___ we met.", options: ["which", "where", "who"], answer: "where" },
        { type: "mc", q: "I know a man ___ son is a pilot.", options: ["who", "whose", "which"], answer: "whose" },
        { type: "fill", q: "Amman, ___ is the capital, is very busy.", answer: ["which"] },
        { type: "order", words: ["The", "store", "that", "I", "built", "is", "online"], answer: "The store that I built is online" }
      ]
    },
    {
      id: "gerund-inf", lv: "B2", icon: "🔤", title: "Gerund or Infinitive", ar: "الفعل مع ing أو مع to",
      explain: [
        "أفعال بعدها **ing**: enjoy, avoid, finish, suggest, mind, keep, consider. I enjoy **working** from home.",
        "أفعال بعدها **to**: want, decide, plan, hope, need, agree, promise, offer. I decided **to learn** English.",
        "بعد حروف الجر دايماً **ing**: I'm good at **designing**. / Thank you for **waiting**.",
        "stop + ing = يوقف عن الشي. stop + to = يوقف عشان يعمل شي ثاني."
      ],
      examples: [
        { en: "I'm looking forward to hearing from you.", ar: "أتطلع لسماع ردك." },
        { en: "She agreed to try the free preview.", ar: "وافقت على تجربة المعاينة المجانية." },
        { en: "Avoid sharing your password.", ar: "تجنب مشاركة كلمة سرك." }
      ],
      exercises: [
        { type: "mc", q: "I enjoy ___ new things.", options: ["learn", "to learn", "learning"], answer: "learning" },
        { type: "mc", q: "We decided ___ a new shop.", options: ["opening", "to open", "open"], answer: "to open" },
        { type: "mc", q: "Thank you for ___ my proposal.", options: ["read", "to read", "reading"], answer: "reading" },
        { type: "fill", q: "I'm looking forward to ___ (work) with you.", answer: ["working"] },
        { type: "fill", q: "He promised ___ (send) the files today.", answer: ["to send"] },
        { type: "order", words: ["Please", "avoid", "using", "a", "VPN"], answer: "Please avoid using a VPN" }
      ]
    },
    {
      id: "used-to", lv: "B2", icon: "🕰️", title: "used to / be used to / get used to", ar: "كنت أعمل / متعوّد / أتعوّد",
      explain: [
        "**used to + فعل**: عادة بالماضي ما عادت موجودة: I **used to work** in a call center.",
        "**be used to + ing**: متعوّد على شي: I'm **used to working** late.",
        "**get used to + ing**: عم تتعوّد: I'm **getting used to speaking** English."
      ],
      examples: [
        { en: "I used to live in Amman.", ar: "كنت أعيش في عمّان (ولم أعد)." },
        { en: "She is used to talking to customers.", ar: "هي معتادة على التحدث مع الزبائن." },
        { en: "You will get used to it.", ar: "ستعتاد عليه." }
      ],
      exercises: [
        { type: "mc", q: "I ___ play football every day when I was a kid.", options: ["used to", "am used to", "use to"], answer: "used to" },
        { type: "mc", q: "He is used to ___ early.", options: ["wake up", "waking up", "woke up"], answer: "waking up" },
        { type: "mc", q: "Did you ___ smoke?", options: ["used to", "use to", "using to"], answer: "use to", hint: "بعد did الفعل بأصله" },
        { type: "fill", q: "I'm getting used to ___ (work) remotely.", answer: ["working"] },
        { type: "fill", q: "She ___ to live in Irbid, but now she lives in Zarqa.", answer: ["used"] },
        { type: "order", words: ["I", "am", "used", "to", "working", "late"], answer: "I am used to working late" }
      ]
    },
    {
      id: "mixed-cond", lv: "C1", icon: "🧩", title: "Mixed Conditionals", ar: "الشرط المختلط",
      explain: [
        "نخلط زمنين: **ماضي ← نتيجة بالحاضر**: If I **had learned** English earlier, I **would have** a better job **now**.",
        "أو **صفة دائمة ← نتيجة بالماضي**: If I **were** more careful, I **wouldn't have made** that mistake.",
        "انتبه للكلمة اللي بتحدد الزمن: now, today ← الحاضر. yesterday, last year ← الماضي."
      ],
      examples: [
        { en: "If I had taken that job, I would be in Dubai now.", ar: "لو قبلت تلك الوظيفة، لكنت الآن في دبي." },
        { en: "If she weren't so shy, she would have asked for help.", ar: "لو لم تكن خجولة إلى هذا الحد، لطلبت المساعدة." },
        { en: "If we had saved money, we wouldn't be worried today.", ar: "لو ادخرنا المال، لما كنا قلقين اليوم." }
      ],
      exercises: [
        { type: "mc", q: "If I had studied medicine, I ___ a doctor now.", options: ["would be", "would have been", "will be"], answer: "would be" },
        { type: "mc", q: "If he ___ so lazy, he would have finished on time.", options: ["isn't", "weren't", "hadn't"], answer: "weren't" },
        { type: "mc", q: "If they had booked earlier, they ___ here now.", options: ["would be", "would have been", "are"], answer: "would be" },
        { type: "fill", q: "If I ___ (not miss) the bus, I would be at work now.", answer: ["hadn't missed", "had not missed"] },
        { type: "fill", q: "If she spoke English, she ___ (get) the job last month.", answer: ["would have got", "would have gotten"] },
        { type: "order", words: ["If", "I", "had", "saved", "I", "would", "be", "rich", "now"], answer: "If I had saved I would be rich now" }
      ]
    },
    {
      id: "wish", lv: "C1", icon: "🌠", title: "wish / if only", ar: "التمنّي والندم",
      explain: [
        "**wish + ماضي**: تمنّي عن الحاضر: I wish I **had** more time. (ما عندي)",
        "**wish + had + تصريف ثالث**: ندم على الماضي: I wish I **had studied** harder.",
        "**wish + would**: انزعاج من تصرف حدا: I wish you **would** reply faster.",
        "**if only** نفس المعنى بس أقوى: If only I **had** known!"
      ],
      examples: [
        { en: "I wish I spoke English fluently.", ar: "أتمنى لو أتحدث الإنجليزية بطلاقة." },
        { en: "She wishes she had accepted the offer.", ar: "تتمنى لو قبلت العرض (ندم)." },
        { en: "If only I had more clients!", ar: "ليت عندي عملاء أكثر!" }
      ],
      exercises: [
        { type: "mc", q: "I wish I ___ a car. (I don't have one)", options: ["have", "had", "would have"], answer: "had" },
        { type: "mc", q: "I wish I ___ that email. It was a mistake.", options: ["didn't send", "hadn't sent", "don't send"], answer: "hadn't sent" },
        { type: "mc", q: "I wish he ___ stop talking during the film.", options: ["would", "will", "had"], answer: "would" },
        { type: "fill", q: "If only I ___ (know) the answer yesterday!", answer: ["had known"] },
        { type: "fill", q: "She wishes she ___ (live) closer to the university.", answer: ["lived"] },
        { type: "order", words: ["I", "wish", "I", "had", "started", "earlier"], answer: "I wish I had started earlier" }
      ]
    },
    {
      id: "modal-perfect", lv: "C1", icon: "🤔", title: "Modal Perfects", ar: "الأفعال الناقصة عن الماضي",
      explain: [
        "**should have + تصريف ثالث**: كان لازم (وما صار): You **should have told** me.",
        "**must have**: استنتاج متأكد عن الماضي: He **must have forgotten**.",
        "**might / could have**: احتمال بالماضي: She **might have missed** the bus.",
        "**can't have**: مستحيل يكون صار: He **can't have finished** already!"
      ],
      examples: [
        { en: "I should have checked the guidelines.", ar: "كان يجب أن أراجع التعليمات." },
        { en: "The order must have arrived by now.", ar: "لا بد أن الطلب قد وصل الآن." },
        { en: "She can't have seen my message; she was asleep.", ar: "مستحيل أن تكون رأت رسالتي؛ كانت نائمة." }
      ],
      exercises: [
        { type: "mc", q: "You look tired. You ___ gone to bed earlier.", options: ["should have", "must", "can't have"], answer: "should have" },
        { type: "mc", q: "The lights are off. They ___ left already.", options: ["must have", "should have", "can't have"], answer: "must have" },
        { type: "mc", q: "He ___ written this; he doesn't speak French.", options: ["must have", "can't have", "should have"], answer: "can't have" },
        { type: "fill", q: "I'm not sure. She ___ have taken a taxi. (احتمال)", answer: ["might", "could", "may"] },
        { type: "fill", q: "We ___ have saved the file. Now it's lost! (كان لازم)", answer: ["should"] },
        { type: "order", words: ["You", "should", "have", "asked", "me", "first"], answer: "You should have asked me first" }
      ]
    },
    {
      id: "inversion", lv: "C1", icon: "🔃", title: "Inversion for emphasis", ar: "التقديم للتأكيد",
      explain: [
        "بالكتابة الرسمية، لما نبدأ بكلمة نفي أو تقييد، **الفعل المساعد بيجي قبل الفاعل** مثل السؤال.",
        "**Never have I** seen such a beautiful design. / **Rarely do** clients complain.",
        "**Not only** is it fast, **but** it is also cheap.",
        "**Hardly had** I arrived **when** the phone rang. / **Only then did** I understand."
      ],
      examples: [
        { en: "Never have I worked with such a professional team.", ar: "لم أعمل قط مع فريق بهذه الاحترافية." },
        { en: "Not only does the store look great, but it also loads fast.", ar: "المتجر ليس جميلاً فقط، بل سريع أيضاً." },
        { en: "Only after the test did I feel confident.", ar: "فقط بعد الاختبار شعرت بالثقة." }
      ],
      exercises: [
        { type: "mc", q: "Never ___ such a mess.", options: ["I have seen", "have I seen", "I saw"], answer: "have I seen" },
        { type: "mc", q: "Rarely ___ late for work.", options: ["he is", "is he", "he was"], answer: "is he" },
        { type: "mc", q: "Not only ___ fast, but it is also secure.", options: ["it is", "is it", "it was"], answer: "is it" },
        { type: "fill", q: "Hardly ___ I sat down when the phone rang.", answer: ["had"] },
        { type: "fill", q: "Only then ___ I realize my mistake.", answer: ["did"] },
        { type: "order", words: ["Never", "have", "I", "felt", "so", "happy"], answer: "Never have I felt so happy" }
      ]
    },
    {
      id: "linking", lv: "C1", icon: "🧷", title: "Advanced Linking Words", ar: "أدوات الربط المتقدمة",
      explain: [
        "**although / even though + جملة**: Although it was late, we continued.",
        "**despite / in spite of + اسم أو ing**: Despite the rain, we went out. / Despite being tired, she finished.",
        "**whereas / while** للمقارنة: I prefer tea, whereas my brother prefers coffee.",
        "**however / therefore / moreover** بين جملتين وبعدها فاصلة: It's expensive. However, it's worth it."
      ],
      examples: [
        { en: "Although the budget was small, the client was happy.", ar: "مع أن الميزانية كانت صغيرة، كان العميل سعيداً." },
        { en: "Despite having little experience, she got the job.", ar: "رغم خبرتها القليلة، حصلت على الوظيفة." },
        { en: "The store is fast. Moreover, it has no monthly fees.", ar: "المتجر سريع. علاوة على ذلك، ليس فيه رسوم شهرية." }
      ],
      exercises: [
        { type: "mc", q: "___ the traffic, we arrived on time.", options: ["Although", "Despite", "However"], answer: "Despite" },
        { type: "mc", q: "___ it was raining, we went for a walk.", options: ["Despite", "Although", "Moreover"], answer: "Although" },
        { type: "mc", q: "The plan is risky. ___, it could be very profitable.", options: ["However", "Despite", "Whereas"], answer: "However" },
        { type: "mc", q: "Ali likes coding, ___ his sister likes design.", options: ["whereas", "despite", "therefore"], answer: "whereas" },
        { type: "fill", q: "Despite ___ (be) tired, he kept working.", answer: ["being"] },
        { type: "order", words: ["Although", "it", "was", "late", "we", "continued"], answer: "Although it was late we continued" }
      ]
    },
    {
      id: "cleft", lv: "C1", icon: "🎯", title: "Cleft Sentences (emphasis)", ar: "جمل التأكيد (What I need is…)",
      explain: [
        "نستخدمها لنركّز على جزء من الجملة.",
        "**What + جملة + is/was**: **What I need is** more practice. (بدل I need more practice)",
        "**It is/was ... that/who**: **It was** Ali **who** built the store. / **It's** the price **that** worries me.",
        "**All I want is...** / **The reason why... is that...**"
      ],
      examples: [
        { en: "What I love about this job is the flexibility.", ar: "ما أحبه في هذا العمل هو المرونة." },
        { en: "It was the delivery that caused the problem.", ar: "كان التوصيل هو ما سبب المشكلة." },
        { en: "The reason why I'm learning English is that I want remote work.", ar: "السبب في أنني أتعلم الإنجليزية هو أنني أريد عملاً عن بُعد." }
      ],
      exercises: [
        { type: "mc", q: "___ I need is a good night's sleep.", options: ["That", "What", "Which"], answer: "What" },
        { type: "mc", q: "It was Sara ___ fixed the bug.", options: ["who", "what", "where"], answer: "who" },
        { type: "mc", q: "What surprised me ___ the low price.", options: ["were", "was", "is being"], answer: "was" },
        { type: "fill", q: "It's the speed ___ makes this store special.", answer: ["that", "which"] },
        { type: "fill", q: "All I want ___ a quiet place to work.", answer: ["is"] },
        { type: "order", words: ["What", "I", "need", "is", "more", "time"], answer: "What I need is more time" }
      ]
    }
  );

  // ---------- writing: translate Arabic → English (several accepted answers) ----------
  D.writing = [
    // A1
    { id: "w1", lv: "A1", ar: "اسمي علي وأنا من الأردن.", answers: ["My name is Ali and I am from Jordan.", "My name is Ali and I'm from Jordan.", "I am Ali and I am from Jordan."] },
    { id: "w2", lv: "A1", ar: "أنا طالب في الجامعة.", answers: ["I am a student at the university.", "I'm a student at the university.", "I am a university student.", "I'm a university student.", "I am a student at university."] },
    { id: "w3", lv: "A1", ar: "كم سعر هذا؟", answers: ["How much is this?", "What is the price of this?", "How much does this cost?", "What's the price of this?"] },
    { id: "w4", lv: "A1", ar: "أنا مشغول اليوم.", answers: ["I am busy today.", "I'm busy today."] },
    { id: "w5", lv: "A1", ar: "أحب القهوة كثيراً.", answers: ["I like coffee a lot.", "I love coffee.", "I really like coffee.", "I like coffee very much.", "I love coffee a lot."] },
    { id: "w6", lv: "A1", ar: "المحل مفتوح الآن.", answers: ["The shop is open now.", "The store is open now."] },
    // A2
    { id: "w7", lv: "A2", ar: "ذهبت إلى عمّان أمس.", answers: ["I went to Amman yesterday.", "Yesterday I went to Amman."] },
    { id: "w8", lv: "A2", ar: "هل يمكنك مساعدتي من فضلك؟", answers: ["Can you help me, please?", "Could you help me, please?", "Can you please help me?", "Could you please help me?"] },
    { id: "w9", lv: "A2", ar: "سأرسل لك الرابط الآن.", answers: ["I will send you the link now.", "I'll send you the link now.", "I will send the link to you now."] },
    { id: "w10", lv: "A2", ar: "طلبك سيصل غداً.", answers: ["Your order will arrive tomorrow.", "Your order arrives tomorrow."] },
    { id: "w11", lv: "A2", ar: "هذا الهاتف أغلى من ذلك.", answers: ["This phone is more expensive than that one.", "This phone is more expensive than that."] },
    { id: "w12", lv: "A2", ar: "يجب أن تقرأ التعليمات.", answers: ["You should read the instructions.", "You must read the instructions.", "You should read the guidelines.", "You must read the guidelines.", "You have to read the instructions."] },
    // B1
    { id: "w13", lv: "B1", ar: "لقد أنهيت التصميم بالفعل.", answers: ["I have already finished the design.", "I've already finished the design.", "I have finished the design already."] },
    { id: "w14", lv: "B1", ar: "أعمل هنا منذ سنة.", answers: ["I have worked here for a year.", "I've worked here for a year.", "I have been working here for a year.", "I've been working here for a year.", "I have worked here for one year."] },
    { id: "w15", lv: "B1", ar: "إذا دفعت اليوم، سأبدأ غداً.", answers: ["If you pay today, I will start tomorrow.", "If you pay today, I'll start tomorrow."] },
    { id: "w16", lv: "B1", ar: "تم قبول طلبي.", answers: ["My application was accepted.", "My application has been accepted.", "My request was accepted.", "My request has been accepted."] },
    { id: "w17", lv: "B1", ar: "أعتذر عن التأخير.", answers: ["I apologize for the delay.", "Sorry for the delay.", "I'm sorry for the delay.", "I apologise for the delay."] },
    { id: "w18", lv: "B1", ar: "هل يمكنك إخباري بالمزيد عن مشروعك؟", answers: ["Can you tell me more about your project?", "Could you tell me more about your project?"] },
    // B2
    { id: "w19", lv: "B2", ar: "لو كنت أعرف، لساعدتك.", answers: ["If I had known, I would have helped you.", "If I'd known, I would have helped you.", "If I had known, I'd have helped you."] },
    { id: "w20", lv: "B2", ar: "قال إنه سيدفع غداً.", answers: ["He said that he would pay tomorrow.", "He said he would pay tomorrow.", "He said he'd pay tomorrow.", "He said that he would pay the next day.", "He said he would pay the next day."] },
    { id: "w21", lv: "B2", ar: "أتطلع للعمل معك.", answers: ["I look forward to working with you.", "I'm looking forward to working with you.", "I am looking forward to working with you."] },
    { id: "w22", lv: "B2", ar: "هذا هو العميل الذي طلب المنيو.", answers: ["This is the client who ordered the menu.", "This is the client that ordered the menu.", "This is the customer who ordered the menu.", "This is the customer that ordered the menu."] },
    { id: "w23", lv: "B2", ar: "كنت أعمل في مركز اتصال.", answers: ["I used to work in a call center.", "I used to work at a call center.", "I used to work in a call centre.", "I worked in a call center.", "I worked at a call center."] },
    { id: "w24", lv: "B2", ar: "من فضلك تأكد أن كل الأسعار صحيحة.", answers: ["Please make sure that all the prices are correct.", "Please make sure all the prices are correct.", "Please ensure that all prices are correct.", "Please ensure that all the prices are correct.", "Please make sure all prices are correct.", "Please ensure all prices are correct."] },
    // C1
    { id: "w25", lv: "C1", ar: "كان يجب أن أراجع التعليمات.", answers: ["I should have checked the guidelines.", "I should have checked the instructions.", "I should have reviewed the guidelines.", "I should have read the guidelines.", "I should have read the instructions."] },
    { id: "w26", lv: "C1", ar: "أتمنى لو بدأت مبكراً.", answers: ["I wish I had started earlier.", "I wish I'd started earlier.", "If only I had started earlier."] },
    { id: "w27", lv: "C1", ar: "رغم خبرتها القليلة، حصلت على الوظيفة.", answers: ["Despite her little experience, she got the job.", "Despite having little experience, she got the job.", "Although she had little experience, she got the job.", "In spite of having little experience, she got the job.", "Even though she had little experience, she got the job."] },
    { id: "w28", lv: "C1", ar: "ما أحتاجه هو المزيد من التدريب.", answers: ["What I need is more practice.", "What I need is more training."] },
    { id: "w29", lv: "C1", ar: "لم أر قط تصميماً بهذا الجمال.", answers: ["Never have I seen such a beautiful design.", "I have never seen such a beautiful design.", "I've never seen such a beautiful design."] },
    { id: "w30", lv: "C1", ar: "لا بد أنه نسي.", answers: ["He must have forgotten.", "He must've forgotten."] }
  ];

  // ---------- writing tasks: free writing with a model answer and key phrases to check ----------
  D.tasks = [
    { id: "t1", lv: "A2", ar: "عرّف عن نفسك بـ 3 لـ4 جمل: اسمك، ومن وين، وشو بتدرس، وشو بتحب.",
      model: "Hi, my name is Ali. I'm from Zarqa, Jordan. I'm a cybersecurity student at Zarqa University. I love building websites and learning new things.",
      keys: ["my name is", "i'm from|i am from", "student", "i love|i like|i enjoy"] },
    { id: "t2", lv: "B1", ar: "اكتب رسالة قصيرة لعميل بتشكره على طلبه وبتقلّه إنك رح تسلّم الشغل خلال 3 أيام.",
      model: "Hi Sara, thank you for your order! I have received all the details and I will deliver the menu within three days. Please let me know if you have any questions.",
      keys: ["thank you|thanks", "deliver|send", "three days|3 days", "let me know|any questions"] },
    { id: "t3", lv: "B1", ar: "اكتب رسالة اعتذار لزبون عن تأخير التوصيل، واقترح عليه حل.",
      model: "Dear customer, we apologize for the delay in your delivery. Your order will arrive tomorrow morning, and we have added a free gift to your package. Thank you for your patience.",
      keys: ["apologize|sorry", "delay", "will arrive|tomorrow", "thank you for your patience|thank you"] },
    { id: "t4", lv: "B2", ar: "اكتب عرض قصير (Proposal) لمشروع متجر إلكتروني: فهمك للطلب، وخطتك، والمدة، والسعر.",
      model: "Hello! I understand that you need an online store for your perfume shop with WhatsApp orders. I will set up the products, prices and shipping zones, test everything on mobile, and deliver within four days. The price is 80 dollars, including two revisions. I'm looking forward to working with you.",
      keys: ["i understand|understand", "i will", "deliver|within", "price|dollars", "looking forward"] },
    { id: "t5", lv: "B2", ar: "قيّم إجابة ذكاء اصطناعي: قل إذا كانت دقيقة ومناسبة، واذكر نقطة قوة ونقطة ضعف.",
      model: "The response is mostly accurate and relevant to the question. Its main strength is that it is clear and well organized. However, it contains a factual error about the date, and it is a little too long. Therefore, I would rate it 3 out of 5.",
      keys: ["accurate", "relevant", "however", "strength|clear", "rate|score"] },
    { id: "t6", lv: "C1", ar: "اكتب فقرة تقنع فيها صاحب محل يجرّب متجر أونلاين بدل البيع بالخاص على إنستغرام.",
      model: "Not only does an online store save you hours of replying to the same questions, but it also makes ordering effortless for your customers. Although you might be reluctant to change the way you work, the setup is straightforward and there are no monthly fees. What matters most is that your customers can order at any time, even while you sleep.",
      keys: ["not only", "although|even though|despite", "what", "customers", "no monthly fees|monthly"] }
  ];
})(window.EC_DATA);

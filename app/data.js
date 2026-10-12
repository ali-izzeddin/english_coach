/* Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved. See LICENSE.txt. */
/* English Coach - course content: topics, words, grammar lessons, phrases. Plain data, no logic. */
window.EC_DATA = {
  topics: [
    { id: "work", icon: "💼", ar: "الشغل والفريلانس" },
    { id: "ai", icon: "🤖", ar: "تقييم الذكاء الاصطناعي" },
    { id: "tech", icon: "💻", ar: "التقنية والمواقع" },
    { id: "service", icon: "🎧", ar: "خدمة العملاء" },
    { id: "daily", icon: "☀️", ar: "الحياة اليومية" }
  ],

  /* en, ar meaning, part of speech, example + its Arabic */
  words: [
    // ---------- work ----------
    { id: "deadline", t: "work", en: "deadline", ar: "موعد التسليم النهائي", pos: "n", ex: "The deadline for this project is Friday.", exAr: "موعد تسليم هذا المشروع يوم الجمعة." },
    { id: "client", t: "work", en: "client", ar: "عميل / زبون", pos: "n", ex: "My client asked for one more revision.", exAr: "طلب عميلي تعديلاً إضافياً." },
    { id: "budget", t: "work", en: "budget", ar: "ميزانية", pos: "n", ex: "What is your budget for the website?", exAr: "ما هي ميزانيتك للموقع؟" },
    { id: "proposal", t: "work", en: "proposal", ar: "عرض (على مشروع)", pos: "n", ex: "I sent a proposal for the online store project.", exAr: "أرسلت عرضاً لمشروع المتجر الإلكتروني." },
    { id: "invoice", t: "work", en: "invoice", ar: "فاتورة", pos: "n", ex: "I will send you the invoice after delivery.", exAr: "سأرسل لك الفاتورة بعد التسليم." },
    { id: "feedback", t: "work", en: "feedback", ar: "ملاحظات / رأي", pos: "n", ex: "Thank you for your feedback.", exAr: "شكراً على ملاحظاتك." },
    { id: "requirement", t: "work", en: "requirement", ar: "متطلَّب / شرط", pos: "n", ex: "Please list all the requirements.", exAr: "من فضلك اكتب كل المتطلبات." },
    { id: "deliver", t: "work", en: "deliver", ar: "يسلّم", pos: "v", ex: "I can deliver the menu in two days.", exAr: "أستطيع تسليم المنيو خلال يومين." },
    { id: "revision", t: "work", en: "revision", ar: "تعديل / مراجعة", pos: "n", ex: "The price includes two free revisions.", exAr: "السعر يشمل تعديلين مجانيين." },
    { id: "estimate", t: "work", en: "estimate", ar: "تقدير / يقدّر", pos: "n/v", ex: "I estimate the work will take three days.", exAr: "أقدّر أن العمل سيستغرق ثلاثة أيام." },
    { id: "negotiate", t: "work", en: "negotiate", ar: "يتفاوض", pos: "v", ex: "We can negotiate the price.", exAr: "يمكننا التفاوض على السعر." },
    { id: "reliable", t: "work", en: "reliable", ar: "موثوق / يُعتمد عليه", pos: "adj", ex: "Clients want a reliable developer.", exAr: "العملاء يريدون مطوّراً يُعتمد عليه." },
    { id: "schedule", t: "work", en: "schedule", ar: "جدول / يحدد موعداً", pos: "n/v", ex: "Let's schedule a call for tomorrow.", exAr: "لنحدد موعد مكالمة غداً." },
    { id: "priority", t: "work", en: "priority", ar: "أولوية", pos: "n", ex: "The checkout page is our top priority.", exAr: "صفحة الدفع هي أولويتنا القصوى." },
    { id: "colleague", t: "work", en: "colleague", ar: "زميل عمل", pos: "n", ex: "My colleague helped me with the bug.", exAr: "ساعدني زميلي في حل الخطأ." },
    { id: "salary", t: "work", en: "salary", ar: "راتب", pos: "n", ex: "The salary is paid every month.", exAr: "الراتب يُدفع كل شهر." },
    { id: "contract", t: "work", en: "contract", ar: "عقد", pos: "n", ex: "Please read the contract before you sign.", exAr: "من فضلك اقرأ العقد قبل أن توقّع." },
    { id: "experience", t: "work", en: "experience", ar: "خبرة / تجربة", pos: "n", ex: "I have one year of experience in customer service.", exAr: "لدي سنة خبرة في خدمة العملاء." },
    { id: "skill", t: "work", en: "skill", ar: "مهارة", pos: "n", ex: "Communication is an important skill.", exAr: "التواصل مهارة مهمة." },
    { id: "responsible", t: "work", en: "responsible", ar: "مسؤول", pos: "adj", ex: "I was responsible for training new agents.", exAr: "كنت مسؤولاً عن تدريب الموظفين الجدد." },
    { id: "achieve", t: "work", en: "achieve", ar: "يحقق", pos: "v", ex: "She achieved her monthly target.", exAr: "حققت هدفها الشهري." },
    { id: "apply", t: "work", en: "apply (for)", ar: "يتقدّم (لوظيفة)", pos: "v", ex: "I applied for a remote job.", exAr: "تقدّمت لوظيفة عن بُعد." },
    { id: "hire", t: "work", en: "hire", ar: "يوظّف", pos: "v", ex: "They want to hire an Arabic speaker.", exAr: "يريدون توظيف شخص يتحدث العربية." },
    { id: "available", t: "work", en: "available", ar: "متاح / متوفر", pos: "adj", ex: "I am available 20 hours per week.", exAr: "أنا متاح 20 ساعة في الأسبوع." },
    { id: "remote", t: "work", en: "remote", ar: "عن بُعد", pos: "adj", ex: "This is a remote position.", exAr: "هذه وظيفة عن بُعد." },

    // ---------- ai ----------
    { id: "relevant", t: "ai", en: "relevant", ar: "ذو صلة / مناسب للموضوع", pos: "adj", ex: "The first result is relevant to the search.", exAr: "النتيجة الأولى ذات صلة بالبحث." },
    { id: "accurate", t: "ai", en: "accurate", ar: "دقيق / صحيح", pos: "adj", ex: "The answer is not accurate; the date is wrong.", exAr: "الإجابة غير دقيقة؛ التاريخ خاطئ." },
    { id: "fluent", t: "ai", en: "fluent", ar: "طليق / سلس", pos: "adj", ex: "The response is fluent and easy to read.", exAr: "الإجابة سلسة وسهلة القراءة." },
    { id: "harmful", t: "ai", en: "harmful", ar: "ضار / مؤذٍ", pos: "adj", ex: "Mark the response as harmful if it gives dangerous advice.", exAr: "صنّف الإجابة كضارة إذا أعطت نصيحة خطيرة." },
    { id: "offensive", t: "ai", en: "offensive", ar: "مسيء / جارح", pos: "adj", ex: "The text contains offensive language.", exAr: "يحتوي النص على لغة مسيئة." },
    { id: "guideline", t: "ai", en: "guideline", ar: "تعليمات / إرشادات", pos: "n", ex: "Read the guidelines before you start the task.", exAr: "اقرأ التعليمات قبل أن تبدأ المهمة." },
    { id: "annotate", t: "ai", en: "annotate", ar: "يُعلّق / يُصنّف البيانات", pos: "v", ex: "We annotate images for AI training.", exAr: "نصنّف الصور لتدريب الذكاء الاصطناعي." },
    { id: "label", t: "ai", en: "label", ar: "تصنيف / يضع تصنيفاً", pos: "n/v", ex: "Choose the correct label for each sentence.", exAr: "اختر التصنيف الصحيح لكل جملة." },
    { id: "evaluate", t: "ai", en: "evaluate", ar: "يقيّم", pos: "v", ex: "Evaluate the two answers and choose the better one.", exAr: "قيّم الإجابتين واختر الأفضل." },
    { id: "rank", t: "ai", en: "rank", ar: "يرتّب (حسب الأفضلية)", pos: "v", ex: "Rank the responses from best to worst.", exAr: "رتّب الإجابات من الأفضل إلى الأسوأ." },
    { id: "response", t: "ai", en: "response", ar: "رد / إجابة", pos: "n", ex: "The model's response was too long.", exAr: "كانت إجابة النموذج طويلة جداً." },
    { id: "prompt", t: "ai", en: "prompt", ar: "طلب / سؤال للنموذج", pos: "n", ex: "Write a prompt in Levantine Arabic.", exAr: "اكتب طلباً باللهجة الشامية." },
    { id: "query", t: "ai", en: "query", ar: "استعلام / كلمة بحث", pos: "n", ex: "The user's query was 'best pizza in Amman'.", exAr: "كان بحث المستخدم 'أفضل بيتزا في عمّان'." },
    { id: "ambiguous", t: "ai", en: "ambiguous", ar: "غامض / يحتمل أكثر من معنى", pos: "adj", ex: "The question is ambiguous, so ask for clarification.", exAr: "السؤال غامض، لذلك اطلب توضيحاً." },
    { id: "factual", t: "ai", en: "factual", ar: "واقعي / مبني على حقائق", pos: "adj", ex: "Check if the answer is factual.", exAr: "تأكد إن كانت الإجابة مبنية على حقائق." },
    { id: "misleading", t: "ai", en: "misleading", ar: "مضلِّل", pos: "adj", ex: "The title is misleading.", exAr: "العنوان مضلِّل." },
    { id: "appropriate", t: "ai", en: "appropriate", ar: "مناسب / لائق", pos: "adj", ex: "Is this answer appropriate for children?", exAr: "هل هذه الإجابة مناسبة للأطفال؟" },
    { id: "consistent", t: "ai", en: "consistent", ar: "متّسق / ثابت", pos: "adj", ex: "Keep your ratings consistent.", exAr: "اجعل تقييماتك متّسقة." },
    { id: "judgment", t: "ai", en: "judgment", ar: "حكم / تقدير", pos: "n", ex: "Use your best judgment when the guideline is not clear.", exAr: "استخدم أفضل تقدير لديك عندما لا تكون التعليمات واضحة." },
    { id: "translate", t: "ai", en: "translate", ar: "يترجم", pos: "v", ex: "Translate this sentence into Arabic.", exAr: "ترجم هذه الجملة إلى العربية." },

    // ---------- tech ----------
    { id: "browser", t: "tech", en: "browser", ar: "متصفح", pos: "n", ex: "Open the link in your browser.", exAr: "افتح الرابط في متصفحك." },
    { id: "download", t: "tech", en: "download", ar: "يحمّل / ينزّل", pos: "v", ex: "Download the file to your computer.", exAr: "نزّل الملف على جهازك." },
    { id: "upload", t: "tech", en: "upload", ar: "يرفع (ملف)", pos: "v", ex: "Upload your CV in PDF format.", exAr: "ارفع سيرتك الذاتية بصيغة PDF." },
    { id: "update", t: "tech", en: "update", ar: "يحدّث / تحديث", pos: "v/n", ex: "Please update the app to the latest version.", exAr: "من فضلك حدّث التطبيق لآخر إصدار." },
    { id: "install", t: "tech", en: "install", ar: "يثبّت (برنامج)", pos: "v", ex: "Never install software you don't trust.", exAr: "لا تثبّت أبداً برنامجاً لا تثق به." },
    { id: "account", t: "tech", en: "account", ar: "حساب", pos: "n", ex: "Create an account with your email.", exAr: "أنشئ حساباً ببريدك الإلكتروني." },
    { id: "password", t: "tech", en: "password", ar: "كلمة سر", pos: "n", ex: "Use a strong password.", exAr: "استخدم كلمة سر قوية." },
    { id: "secure", t: "tech", en: "secure", ar: "آمن / يؤمّن", pos: "adj/v", ex: "Is this website secure?", exAr: "هل هذا الموقع آمن؟" },
    { id: "encrypt", t: "tech", en: "encrypt", ar: "يشفّر", pos: "v", ex: "The app encrypts your messages.", exAr: "التطبيق يشفّر رسائلك." },
    { id: "vulnerability", t: "tech", en: "vulnerability", ar: "ثغرة أمنية", pos: "n", ex: "The team fixed a vulnerability in the login page.", exAr: "أصلح الفريق ثغرة في صفحة الدخول." },
    { id: "backup", t: "tech", en: "backup", ar: "نسخة احتياطية", pos: "n", ex: "Make a backup before you update.", exAr: "اعمل نسخة احتياطية قبل التحديث." },
    { id: "server", t: "tech", en: "server", ar: "خادم (سيرفر)", pos: "n", ex: "The website runs without a server.", exAr: "الموقع يعمل بدون خادم." },
    { id: "database", t: "tech", en: "database", ar: "قاعدة بيانات", pos: "n", ex: "Orders are saved in a database.", exAr: "الطلبات تُحفظ في قاعدة بيانات." },
    { id: "feature", t: "tech", en: "feature", ar: "ميزة", pos: "n", ex: "The new feature is a 'call waiter' button.", exAr: "الميزة الجديدة زر 'نادِ الجرسون'." },
    { id: "bug", t: "tech", en: "bug", ar: "خطأ برمجي", pos: "n", ex: "I found a bug in the cart.", exAr: "وجدت خطأ برمجياً في السلة." },
    { id: "fix", t: "tech", en: "fix", ar: "يصلح", pos: "v", ex: "Can you fix this problem today?", exAr: "هل يمكنك إصلاح هذه المشكلة اليوم؟" },
    { id: "layout", t: "tech", en: "layout", ar: "تخطيط / ترتيب الصفحة", pos: "n", ex: "The layout looks good on mobile.", exAr: "تخطيط الصفحة يبدو جيداً على الجوال." },
    { id: "responsive", t: "tech", en: "responsive", ar: "متجاوب (مع الشاشات)", pos: "adj", ex: "The store is fully responsive.", exAr: "المتجر متجاوب بالكامل." },
    { id: "deploy", t: "tech", en: "deploy", ar: "ينشر (موقعاً)", pos: "v", ex: "We deploy the site on Netlify.", exAr: "ننشر الموقع على Netlify." },
    { id: "link", t: "tech", en: "link", ar: "رابط", pos: "n", ex: "Put the store link in your bio.", exAr: "ضع رابط المتجر في البايو." },

    // ---------- service ----------
    { id: "complaint", t: "service", en: "complaint", ar: "شكوى", pos: "n", ex: "I'm sorry to hear about your complaint.", exAr: "يؤسفني سماع شكواك." },
    { id: "refund", t: "service", en: "refund", ar: "استرداد المال", pos: "n", ex: "You will receive a full refund.", exAr: "ستستلم استرداداً كاملاً للمبلغ." },
    { id: "apologize", t: "service", en: "apologize", ar: "يعتذر", pos: "v", ex: "We apologize for the delay.", exAr: "نعتذر عن التأخير." },
    { id: "issue", t: "service", en: "issue", ar: "مشكلة / موضوع", pos: "n", ex: "Let me check the issue for you.", exAr: "دعني أتحقق من المشكلة لك." },
    { id: "solve", t: "service", en: "solve", ar: "يحل", pos: "v", ex: "We solved the problem in ten minutes.", exAr: "حللنا المشكلة في عشر دقائق." },
    { id: "confirm", t: "service", en: "confirm", ar: "يؤكد", pos: "v", ex: "Can you confirm your phone number?", exAr: "هل يمكنك تأكيد رقم هاتفك؟" },
    { id: "cancel", t: "service", en: "cancel", ar: "يلغي", pos: "v", ex: "I want to cancel my order.", exAr: "أريد إلغاء طلبي." },
    { id: "order", t: "service", en: "order", ar: "طلب / يطلب", pos: "n/v", ex: "Your order number is 1007.", exAr: "رقم طلبك 1007." },
    { id: "delivery", t: "service", en: "delivery", ar: "توصيل", pos: "n", ex: "Delivery takes one to two days.", exAr: "التوصيل يستغرق يوماً إلى يومين." },
    { id: "receipt", t: "service", en: "receipt", ar: "إيصال", pos: "n", ex: "Please keep your receipt.", exAr: "من فضلك احتفظ بالإيصال." },
    { id: "request", t: "service", en: "request", ar: "طلب / يطلب", pos: "n/v", ex: "We received your request.", exAr: "استلمنا طلبك." },
    { id: "inconvenience", t: "service", en: "inconvenience", ar: "إزعاج / مضايقة", pos: "n", ex: "Sorry for the inconvenience.", exAr: "آسف على الإزعاج." },
    { id: "assist", t: "service", en: "assist", ar: "يساعد", pos: "v", ex: "How can I assist you today?", exAr: "كيف يمكنني مساعدتك اليوم؟" },
    { id: "hold", t: "service", en: "hold (on)", ar: "ينتظر على الخط", pos: "v", ex: "Could you hold on for a moment, please?", exAr: "هل يمكنك الانتظار لحظة من فضلك؟" },
    { id: "appreciate", t: "service", en: "appreciate", ar: "يقدّر", pos: "v", ex: "I appreciate your patience.", exAr: "أقدّر صبرك." },

    // ---------- daily ----------
    { id: "appointment", t: "daily", en: "appointment", ar: "موعد", pos: "n", ex: "I have a doctor's appointment at five.", exAr: "عندي موعد عند الطبيب الساعة الخامسة." },
    { id: "borrow", t: "daily", en: "borrow", ar: "يستعير / يستلف", pos: "v", ex: "Can I borrow your charger?", exAr: "هل يمكنني استعارة شاحنك؟" },
    { id: "lend", t: "daily", en: "lend", ar: "يُعير / يُسلف", pos: "v", ex: "Can you lend me five dinars?", exAr: "هل يمكنك أن تسلفني خمسة دنانير؟" },
    { id: "comfortable", t: "daily", en: "comfortable", ar: "مريح", pos: "adj", ex: "These shoes are very comfortable.", exAr: "هذا الحذاء مريح جداً." },
    { id: "convenient", t: "daily", en: "convenient", ar: "مناسب (للوقت/الظروف)", pos: "adj", ex: "Is Monday convenient for you?", exAr: "هل يوم الاثنين مناسب لك؟" },
    { id: "decide", t: "daily", en: "decide", ar: "يقرر", pos: "v", ex: "I decided to learn English every day.", exAr: "قررت أن أتعلم الإنجليزية كل يوم." },
    { id: "improve", t: "daily", en: "improve", ar: "يحسّن / يتحسن", pos: "v", ex: "My English is improving.", exAr: "لغتي الإنجليزية تتحسن." },
    { id: "prefer", t: "daily", en: "prefer", ar: "يفضّل", pos: "v", ex: "I prefer tea to coffee.", exAr: "أفضّل الشاي على القهوة." },
    { id: "remind", t: "daily", en: "remind", ar: "يذكّر", pos: "v", ex: "Remind me to call my mother.", exAr: "ذكّرني أن أتصل بأمي." },
    { id: "suggest", t: "daily", en: "suggest", ar: "يقترح", pos: "v", ex: "I suggest we meet tomorrow.", exAr: "أقترح أن نلتقي غداً." },
    { id: "usually", t: "daily", en: "usually", ar: "عادةً", pos: "adv", ex: "I usually wake up at seven.", exAr: "عادةً أستيقظ الساعة السابعة." },
    { id: "recently", t: "daily", en: "recently", ar: "مؤخراً", pos: "adv", ex: "I recently started a new project.", exAr: "بدأت مؤخراً مشروعاً جديداً." },
    { id: "expensive", t: "daily", en: "expensive", ar: "غالي الثمن", pos: "adj", ex: "This phone is too expensive.", exAr: "هذا الجوال غالٍ جداً." },
    { id: "cheap", t: "daily", en: "cheap", ar: "رخيص", pos: "adj", ex: "Fruit is cheap in summer.", exAr: "الفواكه رخيصة في الصيف." },
    { id: "tired", t: "daily", en: "tired", ar: "متعب", pos: "adj", ex: "I'm tired after work.", exAr: "أنا متعب بعد العمل." },
    { id: "graduate", t: "daily", en: "graduate", ar: "يتخرّج", pos: "v", ex: "I will graduate this semester.", exAr: "سأتخرج هذا الفصل." },
    { id: "neighbor", t: "daily", en: "neighbor", ar: "جار", pos: "n", ex: "Our neighbor has a small bakery.", exAr: "جارنا عنده مخبز صغير." },
    { id: "weather", t: "daily", en: "weather", ar: "الطقس", pos: "n", ex: "The weather is nice today.", exAr: "الطقس جميل اليوم." },
    { id: "forget", t: "daily", en: "forget", ar: "ينسى", pos: "v", ex: "Don't forget your keys.", exAr: "لا تنسَ مفاتيحك." },
    { id: "worried", t: "daily", en: "worried", ar: "قلِق", pos: "adj", ex: "Don't be worried, everything will be fine.", exAr: "لا تقلق، كل شيء سيكون بخير." }
  ],

  /* grammar: explanation in Arabic, examples, exercises (mc = choose, fill = type the missing word(s), order = build the sentence) */
  grammar: [
    {
      id: "present", icon: "⏱️", title: "Present Simple vs Present Continuous", ar: "المضارع البسيط والمضارع المستمر",
      explain: [
        "**المضارع البسيط** للعادات والحقائق: I work / She works. ونضيف **s** للفعل مع he و she و it.",
        "**المضارع المستمر** لشيء يحدث **الآن** أو هذه الفترة: am / is / are + الفعل مع **ing**.",
        "كلمات تساعدك: usually, every day, always ← بسيط. now, right now, at the moment ← مستمر."
      ],
      examples: [
        { en: "I work from home every day.", ar: "أعمل من البيت كل يوم." },
        { en: "She works in a café.", ar: "هي تعمل في مقهى." },
        { en: "I am working on a new website now.", ar: "أعمل الآن على موقع جديد." }
      ],
      exercises: [
        { type: "mc", q: "He ___ coffee every morning.", options: ["drink", "drinks", "is drinking"], answer: "drinks", hint: "عادة + he ← نضيف s" },
        { type: "mc", q: "Look! It ___ outside.", options: ["rains", "is raining", "rain"], answer: "is raining", hint: "Look! = الآن" },
        { type: "mc", q: "They ___ English at the moment.", options: ["study", "studies", "are studying"], answer: "are studying" },
        { type: "fill", q: "My client usually ___ (reply) in one hour.", answer: ["replies"], hint: "usually + he/she ← replies" },
        { type: "fill", q: "I ___ (write) an email right now.", answer: ["am writing", "'m writing"] },
        { type: "order", words: ["I", "am", "learning", "English", "now"], answer: "I am learning English now" }
      ]
    },
    {
      id: "past", icon: "⏮️", title: "Past Simple", ar: "الماضي البسيط",
      explain: [
        "نستخدمه لشيء **انتهى** في وقت محدد بالماضي: yesterday, last week, in 2025, two days ago.",
        "الأفعال المنتظمة نضيف لها **ed**: work → worked, finish → finished.",
        "الأفعال الشاذة لها شكل خاص: go → went, make → made, send → sent, buy → bought, see → saw.",
        "النفي والسؤال بـ **did** والفعل يرجع لأصله: I didn't go. / Did you finish?"
      ],
      examples: [
        { en: "I finished the project yesterday.", ar: "أنهيت المشروع أمس." },
        { en: "She sent me the files last night.", ar: "أرسلت لي الملفات الليلة الماضية." },
        { en: "Did you see my message?", ar: "هل رأيت رسالتي؟" }
      ],
      exercises: [
        { type: "mc", q: "We ___ to Amman last weekend.", options: ["go", "went", "gone"], answer: "went" },
        { type: "mc", q: "I didn't ___ the email.", options: ["receive", "received", "receiving"], answer: "receive", hint: "بعد didn't الفعل يرجع لأصله" },
        { type: "fill", q: "She ___ (buy) a new laptop last month.", answer: ["bought"] },
        { type: "fill", q: "They ___ (start) the project two days ago.", answer: ["started"] },
        { type: "mc", q: "___ you call the client yesterday?", options: ["Do", "Did", "Does"], answer: "Did" },
        { type: "order", words: ["I", "made", "a", "menu", "yesterday"], answer: "I made a menu yesterday" }
      ]
    },
    {
      id: "perfect", icon: "✅", title: "Present Perfect vs Past Simple", ar: "المضارع التام والماضي البسيط",
      explain: [
        "**المضارع التام** have / has + التصريف الثالث: لشيء حدث **والوقت غير مهم أو غير محدد**، أو له علاقة بالآن.",
        "مع كلمات مثل: already, yet, ever, never, just, since, for.",
        "إذا ذكرت **وقتاً محدداً منتهياً** (yesterday, last year) نستخدم **الماضي البسيط**، وليس have.",
        "مثال: I have finished the design. (الآن جاهز) ← I finished it yesterday. (وقت محدد)"
      ],
      examples: [
        { en: "I have already sent the proposal.", ar: "لقد أرسلت العرض بالفعل." },
        { en: "Have you ever worked with an AI company?", ar: "هل سبق أن عملت مع شركة ذكاء اصطناعي؟" },
        { en: "I have lived in Zarqa for ten years.", ar: "أعيش في الزرقاء منذ عشر سنوات." }
      ],
      exercises: [
        { type: "mc", q: "I ___ my CV yesterday.", options: ["have updated", "updated", "update"], answer: "updated", hint: "yesterday = وقت محدد ← ماضي بسيط" },
        { type: "mc", q: "She ___ just finished the task.", options: ["has", "have", "did"], answer: "has" },
        { type: "mc", q: "Have you ___ been to Aqaba?", options: ["ever", "yet", "ago"], answer: "ever" },
        { type: "fill", q: "I have worked here ___ 2025.", answer: ["since"], hint: "since + بداية الوقت، for + مدة" },
        { type: "fill", q: "We have known each other ___ five years.", answer: ["for"] },
        { type: "order", words: ["I", "have", "never", "seen", "snow"], answer: "I have never seen snow" }
      ]
    },
    {
      id: "future", icon: "🔮", title: "Future: will vs going to", ar: "المستقبل: will و going to",
      explain: [
        "**will** لقرار سريع في نفس اللحظة، أو وعد، أو توقّع: I'll help you. / It will rain.",
        "**going to** لخطة قررتها **من قبل**: I'm going to apply for the job next week.",
        "بعد will الفعل يكون بأصله دائماً: will **send** وليس will sends."
      ],
      examples: [
        { en: "I'll send you the link now.", ar: "سأرسل لك الرابط الآن." },
        { en: "I'm going to start a new course next month.", ar: "سأبدأ دورة جديدة الشهر القادم (خطة)." },
        { en: "I think you will like the design.", ar: "أعتقد أن التصميم سيعجبك." }
      ],
      exercises: [
        { type: "mc", q: "The phone is ringing. I ___ answer it.", options: ["will", "am going to", "going"], answer: "will", hint: "قرار في نفس اللحظة" },
        { type: "mc", q: "We ___ open a new shop in May. Everything is planned.", options: ["will", "are going to", "go"], answer: "are going to" },
        { type: "mc", q: "She will ___ you tomorrow.", options: ["calls", "call", "calling"], answer: "call" },
        { type: "fill", q: "Don't worry, I ___ (help) you. (وعد)", answer: ["will help", "'ll help"] },
        { type: "fill", q: "I'm ___ to learn ten new words today.", answer: ["going"] },
        { type: "order", words: ["I", "will", "deliver", "it", "tomorrow"], answer: "I will deliver it tomorrow" }
      ]
    },
    {
      id: "articles", icon: "🅰️", title: "Articles: a / an / the", ar: "أدوات التعريف والتنكير",
      explain: [
        "**a** قبل كلمة تبدأ **بصوت** ساكن: a website, a user, a one-day course.",
        "**an** قبل كلمة تبدأ **بصوت** متحرك: an app, an email, an hour (الـ h لا تُلفظ).",
        "**the** لشيء معروف أو ذُكر من قبل أو فريد: the internet, the moon. I bought a laptop. The laptop is fast."
      ],
      examples: [
        { en: "I need an email address.", ar: "أحتاج عنوان بريد إلكتروني." },
        { en: "She is a university student.", ar: "هي طالبة جامعية (university تبدأ بصوت يو)." },
        { en: "The menu is ready.", ar: "المنيو جاهز (منيو معروف)." }
      ],
      exercises: [
        { type: "mc", q: "I have ___ idea.", options: ["a", "an", "the"], answer: "an" },
        { type: "mc", q: "It takes ___ hour.", options: ["a", "an", "the"], answer: "an", hint: "الـ h في hour لا تُلفظ" },
        { type: "mc", q: "She is ___ honest person.", options: ["a", "an", "the"], answer: "an" },
        { type: "mc", q: "He works at ___ university in Zarqa.", options: ["a", "an", "the"], answer: "a", hint: "university تبدأ بصوت (يو)" },
        { type: "fill", q: "I bought a phone. ___ phone is very fast.", answer: ["The", "the"] },
        { type: "order", words: ["This", "is", "an", "online", "store"], answer: "This is an online store" }
      ]
    },
    {
      id: "time-prep", icon: "📅", title: "in / on / at (time)", ar: "حروف الجر مع الوقت",
      explain: [
        "**at** للساعة واللحظة: at 5 o'clock, at night, at noon.",
        "**on** للأيام والتواريخ: on Monday, on 14 October, on my birthday.",
        "**in** للشهور والسنين والفصول وأجزاء اليوم: in May, in 2026, in summer, in the morning."
      ],
      examples: [
        { en: "The meeting is at 3 pm.", ar: "الاجتماع الساعة 3 مساءً." },
        { en: "I'll deliver it on Thursday.", ar: "سأسلّمه يوم الخميس." },
        { en: "I graduate in January.", ar: "أتخرج في يناير." }
      ],
      exercises: [
        { type: "mc", q: "See you ___ Sunday.", options: ["in", "on", "at"], answer: "on" },
        { type: "mc", q: "I wake up ___ 7 am.", options: ["in", "on", "at"], answer: "at" },
        { type: "mc", q: "We started the business ___ 2026.", options: ["in", "on", "at"], answer: "in" },
        { type: "mc", q: "I study ___ the evening.", options: ["in", "on", "at"], answer: "in" },
        { type: "fill", q: "The shop closes ___ midnight.", answer: ["at"] },
        { type: "order", words: ["The", "deadline", "is", "on", "Friday"], answer: "The deadline is on Friday" }
      ]
    },
    {
      id: "compare", icon: "📈", title: "Comparatives & Superlatives", ar: "المقارنة والتفضيل",
      explain: [
        "كلمة قصيرة: نضيف **er** للمقارنة و **est** للتفضيل: fast → faster → the fastest.",
        "كلمة طويلة: **more** و **the most**: expensive → more expensive → the most expensive.",
        "شاذة: good → better → the best / bad → worse → the worst.",
        "بعد المقارنة نستخدم **than**: This store is cheaper than Shopify."
      ],
      examples: [
        { en: "My new laptop is faster than the old one.", ar: "جهازي الجديد أسرع من القديم." },
        { en: "This is the best menu in Zarqa.", ar: "هذا أفضل منيو في الزرقاء." },
        { en: "English is more useful than I thought.", ar: "الإنجليزية مفيدة أكثر مما توقعت." }
      ],
      exercises: [
        { type: "mc", q: "Amman is ___ than Zarqa.", options: ["big", "bigger", "biggest"], answer: "bigger" },
        { type: "mc", q: "This is ___ phone in the shop.", options: ["the most expensive", "more expensive", "expensiver"], answer: "the most expensive" },
        { type: "mc", q: "Your English is ___ than last month.", options: ["good", "better", "best"], answer: "better" },
        { type: "fill", q: "Today is ___ (hot) than yesterday.", answer: ["hotter"] },
        { type: "fill", q: "It was the ___ (bad) day of the week.", answer: ["worst"] },
        { type: "order", words: ["Tea", "is", "cheaper", "than", "coffee"], answer: "Tea is cheaper than coffee" }
      ]
    },
    {
      id: "modals", icon: "🔑", title: "can / could / should / must", ar: "الأفعال المساعدة الناقصة",
      explain: [
        "**can** = يستطيع: I can build websites. ونفيها can't.",
        "**could** = طلب مؤدب أو قدرة بالماضي: Could you send me the file?",
        "**should** = نصيحة: You should read the guidelines.",
        "**must** = لازم / إجباري: You must verify your account. و **mustn't** = ممنوع.",
        "بعدهم الفعل **بأصله** دائماً، بدون to وبدون s: She can speak (وليس can speaks)."
      ],
      examples: [
        { en: "Could you help me, please?", ar: "هل يمكنك مساعدتي من فضلك؟" },
        { en: "You should take a break.", ar: "يجب أن تأخذ استراحة (نصيحة)." },
        { en: "You mustn't share your password.", ar: "ممنوع أن تشارك كلمة سرك." }
      ],
      exercises: [
        { type: "mc", q: "She ___ speak three languages.", options: ["can", "cans", "can to"], answer: "can" },
        { type: "mc", q: "You look tired. You ___ sleep early.", options: ["should", "must not", "can't"], answer: "should" },
        { type: "mc", q: "___ you open the window, please?", options: ["Should", "Could", "Must"], answer: "Could", hint: "طلب مؤدب" },
        { type: "mc", q: "You ___ use a VPN during the test. It's not allowed.", options: ["must", "mustn't", "should"], answer: "mustn't" },
        { type: "fill", q: "I ___ (can, negative) come tomorrow.", answer: ["can't", "cannot", "can not"] },
        { type: "order", words: ["You", "should", "read", "the", "guidelines"], answer: "You should read the guidelines" }
      ]
    },
    {
      id: "conditionals", icon: "🔀", title: "First & Second Conditional", ar: "جمل الشرط",
      explain: [
        "**الشرط الأول** (شيء ممكن يصير): If + مضارع، will + فعل. If you pay today, I will start tomorrow.",
        "**الشرط الثاني** (تخيّل / شيء غير واقعي الآن): If + ماضي، would + فعل. If I had a car, I would drive to work.",
        "مع I في الشرط الثاني الأفضل **were**: If I were you, I would accept the offer."
      ],
      examples: [
        { en: "If it rains, we will stay at home.", ar: "إذا أمطرت، سنبقى في البيت." },
        { en: "If I were rich, I would travel the world.", ar: "لو كنت غنياً، لسافرت حول العالم." },
        { en: "If you need help, call me.", ar: "إذا احتجت مساعدة، اتصل بي." }
      ],
      exercises: [
        { type: "mc", q: "If you study every day, you ___ improve fast.", options: ["will", "would", "are"], answer: "will" },
        { type: "mc", q: "If I ___ more time, I would learn Spanish.", options: ["have", "had", "will have"], answer: "had" },
        { type: "mc", q: "If I were you, I ___ apply for that job.", options: ["will", "would", "am"], answer: "would" },
        { type: "fill", q: "If the client ___ (agree), I will start today.", answer: ["agrees"] },
        { type: "fill", q: "If she ___ (be) here, she would help us.", answer: ["were", "was"] },
        { type: "order", words: ["If", "you", "pay", "today", "I", "will", "start"], answer: "If you pay today I will start" }
      ]
    },
    {
      id: "passive", icon: "🔄", title: "Passive Voice", ar: "المبني للمجهول",
      explain: [
        "نستخدمه لما **الفعل أهم من الفاعل**: be + التصريف الثالث.",
        "مضارع: The orders **are sent** to WhatsApp. ماضي: The website **was built** in 2026.",
        "إذا بدنا نذكر الفاعل نستخدم **by**: The app was made by Ali."
      ],
      examples: [
        { en: "The menu is updated every week.", ar: "يتم تحديث المنيو كل أسبوع." },
        { en: "My application was accepted.", ar: "تم قبول طلبي." },
        { en: "English is spoken all over the world.", ar: "الإنجليزية تُتحدث في كل العالم." }
      ],
      exercises: [
        { type: "mc", q: "The emails ___ every morning.", options: ["are checked", "checked", "is check"], answer: "are checked" },
        { type: "mc", q: "This house ___ in 1990.", options: ["is built", "was built", "built"], answer: "was built" },
        { type: "mc", q: "The book was written ___ a Jordanian author.", options: ["from", "by", "with"], answer: "by" },
        { type: "fill", q: "Your order ___ (deliver, past) yesterday.", answer: ["was delivered"] },
        { type: "fill", q: "Arabic ___ (write) from right to left.", answer: ["is written"] },
        { type: "order", words: ["The", "store", "was", "built", "by", "Ali"], answer: "The store was built by Ali" }
      ]
    },
    {
      id: "quantity", icon: "🔢", title: "much / many / a lot of", ar: "التعبير عن الكمية",
      explain: [
        "**many** مع الأشياء التي تُعد (معدودة): many clients, many emails.",
        "**much** مع الأشياء التي لا تُعد: much time, much money, much information. وغالباً في السؤال والنفي.",
        "**a lot of** تصلح للاثنين، وهي الأشهر بالجمل المثبتة: a lot of work, a lot of orders.",
        "How many? للمعدود / How much? لغير المعدود وللسعر: How much is it?"
      ],
      examples: [
        { en: "How many orders did we get today?", ar: "كم طلباً وصلنا اليوم؟" },
        { en: "I don't have much time.", ar: "ليس لدي وقت كثير." },
        { en: "She has a lot of experience.", ar: "لديها خبرة كبيرة." }
      ],
      exercises: [
        { type: "mc", q: "How ___ money do you need?", options: ["many", "much"], answer: "much" },
        { type: "mc", q: "There are ___ restaurants in Amman.", options: ["much", "many"], answer: "many" },
        { type: "mc", q: "I don't have ___ information about the project.", options: ["many", "much"], answer: "much", hint: "information لا تُعد" },
        { type: "mc", q: "How ___ is this watch?", options: ["many", "much"], answer: "much", hint: "سؤال عن السعر" },
        { type: "fill", q: "We have a ___ of work this week.", answer: ["lot"] },
        { type: "order", words: ["How", "many", "products", "do", "you", "have"], answer: "How many products do you have" }
      ]
    },
    {
      id: "questions", icon: "❓", title: "Questions with do / does / did", ar: "تكوين الأسئلة",
      explain: [
        "مضارع: **Do** مع I/you/we/they و **Does** مع he/she/it، والفعل بأصله: Does she work here?",
        "ماضي: **Did** للكل، والفعل بأصله: Did you finish?",
        "أدوات السؤال قبلها: What / Where / When / Why / How + do/does/did: Where do you live?",
        "مع be ما نستخدم do: Are you ready? / Is it free?"
      ],
      examples: [
        { en: "Do you speak English?", ar: "هل تتحدث الإنجليزية؟" },
        { en: "What does your company do?", ar: "ماذا تعمل شركتك؟" },
        { en: "When did you start freelancing?", ar: "متى بدأت العمل الحر؟" }
      ],
      exercises: [
        { type: "mc", q: "___ he like the design?", options: ["Do", "Does", "Is"], answer: "Does" },
        { type: "mc", q: "Where ___ you go yesterday?", options: ["do", "did", "does"], answer: "did" },
        { type: "mc", q: "___ you ready to start?", options: ["Do", "Are", "Did"], answer: "Are" },
        { type: "fill", q: "What ___ she want for her birthday?", answer: ["does"] },
        { type: "fill", q: "How much ___ the course cost last year?", answer: ["did"] },
        { type: "order", words: ["What", "do", "you", "do", "for", "work"], answer: "What do you do for work" }
      ]
    }
  ],

  /* ready-made phrases by situation */
  phraseGroups: [
    { id: "clients", icon: "🤝", ar: "رسائل للعملاء (فريلانس)", items: [
      { en: "Hi! Thank you for reaching out.", ar: "أهلاً! شكراً لتواصلك معي." },
      { en: "Could you tell me more about your project?", ar: "هل يمكنك إخباري بالمزيد عن مشروعك؟" },
      { en: "I can deliver it within three days.", ar: "أستطيع تسليمه خلال ثلاثة أيام." },
      { en: "The price is 50 dollars, including two revisions.", ar: "السعر 50 دولاراً، ويشمل تعديلين." },
      { en: "Here is a free preview of your store.", ar: "هذه معاينة مجانية لمتجرك." },
      { en: "Please let me know if you need any changes.", ar: "من فضلك أخبرني إذا احتجت أي تعديلات." },
      { en: "I have finished the work. Please check it.", ar: "أنهيت العمل. من فضلك راجعه." },
      { en: "It was a pleasure working with you.", ar: "كان من دواعي سروري العمل معك." }
    ]},
    { id: "service", icon: "🎧", ar: "خدمة العملاء", items: [
      { en: "How can I help you today?", ar: "كيف يمكنني مساعدتك اليوم؟" },
      { en: "Could you give me your order number, please?", ar: "هل يمكنك إعطائي رقم طلبك من فضلك؟" },
      { en: "I'm sorry for the inconvenience.", ar: "أعتذر عن الإزعاج." },
      { en: "Let me check that for you.", ar: "دعني أتحقق من ذلك لك." },
      { en: "Could you hold on for a moment, please?", ar: "هل يمكنك الانتظار لحظة من فضلك؟" },
      { en: "Is there anything else I can help you with?", ar: "هل هناك شيء آخر يمكنني مساعدتك به؟" },
      { en: "Thank you for your patience.", ar: "شكراً لصبرك." }
    ]},
    { id: "ai", icon: "🤖", ar: "شغل تقييم الذكاء الاصطناعي", items: [
      { en: "Read the instructions carefully before you start.", ar: "اقرأ التعليمات بعناية قبل أن تبدأ." },
      { en: "Response A is more accurate than response B.", ar: "الإجابة A أدق من الإجابة B." },
      { en: "The answer is relevant but too long.", ar: "الإجابة ذات صلة لكنها طويلة جداً." },
      { en: "This response contains a factual error.", ar: "هذه الإجابة فيها خطأ في المعلومات." },
      { en: "The translation sounds natural in Levantine Arabic.", ar: "الترجمة تبدو طبيعية باللهجة الشامية." },
      { en: "I'm not sure, so I will check the guidelines again.", ar: "لست متأكداً، لذلك سأراجع التعليمات مرة أخرى." }
    ]},
    { id: "interview", icon: "🎤", ar: "مقابلة عمل", items: [
      { en: "Let me introduce myself.", ar: "دعني أعرّفك بنفسي." },
      { en: "I'm a final-year cybersecurity student.", ar: "أنا طالب سنة أخيرة أمن سيبراني." },
      { en: "I have experience in customer service and web development.", ar: "لدي خبرة في خدمة العملاء وتطوير المواقع." },
      { en: "I'm a fast learner and I pay attention to detail.", ar: "أتعلم بسرعة وأهتم بالتفاصيل." },
      { en: "I'm available to start immediately.", ar: "أنا متاح للبدء فوراً." },
      { en: "Could you repeat the question, please?", ar: "هل يمكنك إعادة السؤال من فضلك؟" }
    ]},
    { id: "daily", icon: "☀️", ar: "الحياة اليومية", items: [
      { en: "What do you do?", ar: "ماذا تعمل؟" },
      { en: "Nice to meet you.", ar: "تشرفت بمعرفتك." },
      { en: "Sorry, I didn't catch that.", ar: "آسف، لم أفهم ما قلت." },
      { en: "How much does it cost?", ar: "كم يكلّف؟" },
      { en: "I'll be there in ten minutes.", ar: "سأكون هناك خلال عشر دقائق." },
      { en: "Can you speak more slowly, please?", ar: "هل يمكنك التحدث ببطء أكثر من فضلك؟" }
    ]}
  ]
};

// Arabic (العربية) translations
const ar = {
  // ── Language Switcher ──────────────────
  lang: {
    english: 'English',
    arabic: 'العربية',
  },

  // ── Home Page ──────────────────────────
  home: {
    title: 'برا السالفة',
    subtitle: 'أفضل لعبة للجمعات والأصحاب',
    joinGame: '🎯 الدخول للعبة',
    createRoom: '👑 إنشاء غرفة',
    howToPlay: '📖 كيف ألعب؟',
    back: '← العودة للقائمة',
    aboutTitle: 'كيف تلعب برا السالفة؟',
    aboutIntroLabel: 'مقدمة:',
    aboutIntroText:
      'اللعبة تعتمد على الخداع والتخمين. الجميع سيعرفون "الموضوع" السري ما عدا شخص واحد يسمى "برا السالفة".',
    aboutHintsLabel: 'التلميحات:',
    aboutHintsText:
      'يظهر دور كل لاعب لإعطاء "تلميحة" عن الموضوع بدون أن يفضحه للبار السالفة وبدون أن يكون واضحاً جداً.',
    aboutVoteLabel: 'التصويت:',
    aboutVoteText:
      'بعد جولة أو أكثر من التلميحات، يصوت اللاعبون على من يعتقدون أنه "برا السالفة".',
    aboutCatchLabel: 'صائد السالفة:',
    aboutCatchText:
      'إذا تم القبض على "برا السالفة"، سيكون لديه فرصة أخيرة لمحاولة تخمين الموضوع السري لسرقة الفوز!',
  },

  // ── Create Room ────────────────────────
  createRoom: {
    title: 'إنشاء لعبة جديدة',
    yourName: 'اسمك',
    namePlaceholder: 'أدخل اسمك...',
    maxPlayers: 'أقصى عدد للاعبين',
    createBtn: 'إنشاء غرفة',
    errorName: 'يرجى إدخال اسمك',
    errorCreate: 'حدث خطأ أثناء إنشاء الغرفة. تأكد من إعداد قاعدة البيانات.',
  },

  // ── Join Room ─────────────────────────
  joinRoom: {
    title: 'الانضمام إلى لعبة',
    roomCode: 'كود الغرفة',
    roomCodePlaceholder: 'أدخل كود الغرفة (مثال: AB12X)',
    yourName: 'اسمك',
    namePlaceholder: 'أدخل اسمك...',
    joinBtn: 'انضمام',
    errorName: 'يرجى إدخال اسمك',
    errorCode: 'كود الغرفة غير صحيح',
    errorNotFound: 'الغرفة غير موجودة',
    errorStarted: 'اللعبة قد بدأت بالفعل!',
    errorFull: 'الغرفة ممتلئة!',
    errorNameTaken: 'الاسم مستخدم بالفعل، اختر اسماً آخر',
    errorJoin: 'حدث خطأ أثناء الانضمام. يرجى المحاولة مرة أخرى.',
  },

  // ── Lobby ─────────────────────────────
  lobby: {
    title: 'غرفة الانتظار ⏳',
    roomCode: 'كود الغرفة:',
    copyCode: 'نسخ الكود 📋',
    codeCopied: 'تم نسخ الكود!',
    leaderboard: '🏆 لوحة الصدارة',
    players: 'اللاعبين',
    you: '(أنت)',
    host: 'المضيف 👑',
    categoryLabel: '📋 اختر تصنيف السالفة:',
    randomCategory: '🎲 عشوائي (كل التصنيفات)',
    customCategory: '✏️ تصنيف مخصص (كلماتك الخاصة)',
    customCategoryNameLabel: 'اسم التصنيف (اختياري):',
    customCategoryNamePlaceholder: 'مثال: أسماء أصدقائنا',
    customWordsLabel: 'الكلمات (افصل بينها بفاصلة):',
    customWordsPlaceholder: 'أحمد، خالد، سارة، محمد...',
    startBtn: 'ابدأ اللعب الآن',
    waitingPlayers: 'بانتظار المزيد من اللاعبين...',
    waitingHost: 'بانتظار المضيف لاختيار التصنيف وبدء اللعبة...',
    minPlayers: 'يجب أن يكون هناك 3 لاعبين على الأقل لبدء اللعبة.',
    minWords: 'الرجاء إدخال 3 كلمات على الأقل مفصولة بفاصلة (, ،).',
    defaultCustomCategory: 'تصنيف مخصص',
    errorStart: 'حدث خطأ أثناء محاولة بدء اللعبة.',
  },

  // ── Role Distribution ──────────────────
  roles: {
    title: 'السر هنا 🤫',
    instruction: 'تأكد من عدم نظر أي شخص إلى شاشتك!',
    tapToReveal: 'اضغط هنا لمعرفة دورك',
    category: 'التصنيف:',
    unknown: 'غير معروف',
    outsiderRole: 'أنت برا السالفة! 🤷‍♂️',
    outsiderHint: 'حاول ألا يكتشفك الآخرون، واسمع تلميحاتهم لتعرف الموضوع.',
    insiderRole: 'أنت داخل السالفة 🤫',
    insiderTopic: 'الموضوع المخفي هو:',
    hostReady: 'الجميع جاهز - بدء التلميحات',
    hostInstruction: 'بصفتك المضيف، عندما يؤكد الجميع رؤيتهم للدور، انتقل للتلميحات.',
    waitingHost: 'بانتظار المضيف لبدء الجولة...',
  },

  // ── Hint Round ────────────────────────
  hints: {
    title: 'المتحدث الحالي 🎤',
    subtitle: 'دور المتحدث أن يعطي تلميحة بدون كشف الموضوع.',
    myTurn: 'دورك الآن!',
    theirTurn: 'دور:',
    lap: 'الدورة رقم',
    player: 'اللاعب',
    of: 'من',
    next: 'التالي',
    endHintsTitle: 'هل اكتفيتم من التلميحات؟',
    endHintsDescription: 'تحتاج الأغلبية لإنهاء التلميحات والانتقال للتصويت',
    voteToEnd: 'تصويت لإنهاء التلميحات ✋',
    voteSent: 'تم إرسال صوتك',
    listening: 'استمع جيداً للتلميحة...',
    errorVote: 'حدث خطأ أثناء التصويت.',
  },

  // ── Voting ────────────────────────────
  voting: {
    title: 'وقت التصويت 🗳️',
    subtitle: 'الجميع يصوت سراً لمن يعتقدون أنه "برا السالفة".',
    confirmVote: 'تأكيد التصويت',
    voteReceived: 'تم استلام صوتك بنجاح ✅',
    waitingVotes: 'بانتظار البقية لإنهاء التصويت...',
    voted: 'صوتوا',
    showResults: 'إظهار النتائج',
    endEarly: 'إنهاء التصويت مبكراً',
  },

  // ── Results ───────────────────────────
  results: {
    title: 'النتائج 🏆',
    outsiderWas: 'الشخص اللي كان برا السالفة هو:',
    topicWas: 'الموضوع كان:',
    outsiderSurvived: 'نجا برا السالفة! 🎉',
    outsiderSurvivedNote: 'لم يكتشفه الجميع، أو تعادلت الأصوات.',
    outsiderCaught: 'تم كشف البار السالفة! 🚨',
    lastChance: 'لديك فرصة أخيرة. ما هو الموضوع؟',
    guessTopic: 'اكتب الموضوع هنا...',
    confirmGuess: 'تأكيد التخمين',
    waitingGuess: 'ننتظر تخمين',
    waitingGuessSuffix: 'الأخير المُنقذ...',
    outsiderGuessed: 'بطل! 👏',
    outsiderGuessedNote: 'عرف الموضوع بالرغم من كشفه.',
    outsiderGuessedWinner: 'يفوز!',
    groupWins: 'فازوا الباقين! 🥳',
    groupWinsNote: 'تم كشفه ولم يعرف الموضوع.',
    howVoted: 'كيف صوت الناس؟',
    votes: 'صوت',
    playAgain: 'العب جولة جديدة مع نفس المجموعة',
    waitingForHost: 'ننتظر المضيف لبدء جولة جديدة...',
  },

  // ── Room Page (error/loading) ──────────
  room: {
    errorTitle: 'عذراً، حدث خطأ 😢',
    backToHome: 'العودة للرئيسية',
  },
} as const;

export default ar;
export type Translations = typeof ar;

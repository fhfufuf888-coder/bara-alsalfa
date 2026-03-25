// Shared translation shape — all values are plain strings.
// Both ar.ts and en.ts must satisfy this interface.
export interface Translations {
  lang: {
    english: string;
    arabic: string;
  };
  home: {
    title: string;
    subtitle: string;
    joinGame: string;
    createRoom: string;
    howToPlay: string;
    back: string;
    aboutTitle: string;
    aboutIntroLabel: string;
    aboutIntroText: string;
    aboutHintsLabel: string;
    aboutHintsText: string;
    aboutVoteLabel: string;
    aboutVoteText: string;
    aboutCatchLabel: string;
    aboutCatchText: string;
  };
  createRoom: {
    title: string;
    yourName: string;
    namePlaceholder: string;
    maxPlayers: string;
    createBtn: string;
    errorName: string;
    errorCreate: string;
  };
  joinRoom: {
    title: string;
    roomCode: string;
    roomCodePlaceholder: string;
    yourName: string;
    namePlaceholder: string;
    joinBtn: string;
    errorName: string;
    errorCode: string;
    errorNotFound: string;
    errorStarted: string;
    errorFull: string;
    errorNameTaken: string;
    errorJoin: string;
  };
  lobby: {
    title: string;
    roomCode: string;
    copyCode: string;
    codeCopied: string;
    leaderboard: string;
    players: string;
    you: string;
    host: string;
    categoryLabel: string;
    randomCategory: string;
    customCategory: string;
    customCategoryNameLabel: string;
    customCategoryNamePlaceholder: string;
    customWordsLabel: string;
    customWordsPlaceholder: string;
    startBtn: string;
    waitingPlayers: string;
    waitingHost: string;
    minPlayers: string;
    minWords: string;
    defaultCustomCategory: string;
    errorStart: string;
  };
  roles: {
    title: string;
    instruction: string;
    tapToReveal: string;
    category: string;
    unknown: string;
    outsiderRole: string;
    outsiderHint: string;
    insiderRole: string;
    insiderTopic: string;
    hostReady: string;
    hostInstruction: string;
    waitingHost: string;
  };
  hints: {
    title: string;
    subtitle: string;
    myTurn: string;
    theirTurn: string;
    lap: string;
    player: string;
    of: string;
    next: string;
    endHintsTitle: string;
    endHintsDescription: string;
    voteToEnd: string;
    voteSent: string;
    listening: string;
    errorVote: string;
  };
  voting: {
    title: string;
    subtitle: string;
    confirmVote: string;
    voteReceived: string;
    waitingVotes: string;
    voted: string;
    showResults: string;
    endEarly: string;
  };
  results: {
    title: string;
    outsiderWas: string;
    topicWas: string;
    outsiderSurvived: string;
    outsiderSurvivedNote: string;
    outsiderCaught: string;
    lastChance: string;
    guessTopic: string;
    confirmGuess: string;
    waitingGuess: string;
    waitingGuessSuffix: string;
    outsiderGuessed: string;
    outsiderGuessedNote: string;
    outsiderGuessedWinner: string;
    groupWins: string;
    groupWinsNote: string;
    howVoted: string;
    votes: string;
    playAgain: string;
    waitingForHost: string;
  };
  room: {
    errorTitle: string;
    backToHome: string;
  };
}

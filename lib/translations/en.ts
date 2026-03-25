// English translations
import type { Translations } from './types';

const en: Translations = {
  // ── Language Switcher ──────────────────
  lang: {
    english: 'English',
    arabic: 'العربية',
  },

  // ── Home Page ──────────────────────────
  home: {
    title: 'Out of the Loop',
    subtitle: 'The best party game for groups!',
    joinGame: '🎯 Join a Game',
    createRoom: '👑 Create a Room',
    howToPlay: '📖 How to Play?',
    back: '← Back to Menu',
    aboutTitle: 'How to Play Out of the Loop?',
    aboutIntroLabel: 'Introduction:',
    aboutIntroText:
      'The game is based on deception and guessing. Everyone knows the secret "topic" except one person called the "Outsider".',
    aboutHintsLabel: 'Hints:',
    aboutHintsText:
      'Each player takes a turn giving a "hint" about the topic without revealing it to the Outsider, and without being too obvious.',
    aboutVoteLabel: 'Voting:',
    aboutVoteText:
      'After one or more rounds of hints, players vote on who they think is the Outsider.',
    aboutCatchLabel: 'Last Chance:',
    aboutCatchText:
      'If the Outsider is caught, they get one final chance to guess the secret topic and steal the win!',
  },

  // ── Create Room ────────────────────────
  createRoom: {
    title: 'Create a New Game',
    yourName: 'Your Name',
    namePlaceholder: 'Enter your name...',
    maxPlayers: 'Max Players',
    createBtn: 'Create Room',
    errorName: 'Please enter your name',
    errorCreate: 'Error creating room. Make sure the database is configured.',
  },

  // ── Join Room ─────────────────────────
  joinRoom: {
    title: 'Join a Game',
    roomCode: 'Room Code',
    roomCodePlaceholder: 'Enter room code (e.g. AB12X)',
    yourName: 'Your Name',
    namePlaceholder: 'Enter your name...',
    joinBtn: 'Join',
    errorName: 'Please enter your name',
    errorCode: 'Invalid room code',
    errorNotFound: 'Room not found',
    errorStarted: 'The game has already started!',
    errorFull: 'The room is full!',
    errorNameTaken: 'Name is already taken, choose another',
    errorJoin: 'Error joining room. Please try again.',
  },

  // ── Lobby ─────────────────────────────
  lobby: {
    title: 'Waiting Room ⏳',
    roomCode: 'Room Code:',
    copyCode: 'Copy Code 📋',
    codeCopied: 'Code copied!',
    leaderboard: '🏆 Leaderboard',
    players: 'Players',
    you: '(You)',
    host: 'Host 👑',
    categoryLabel: '📋 Choose a Category:',
    randomCategory: '🎲 Random (All Categories)',
    customCategory: '✏️ Custom (Your Own Words)',
    customCategoryNameLabel: 'Category Name (optional):',
    customCategoryNamePlaceholder: 'e.g. Our Friends\' Names',
    customWordsLabel: 'Words (comma-separated):',
    customWordsPlaceholder: 'Ahmed, Khaled, Sara, Mohamed...',
    startBtn: 'Start Game Now',
    waitingPlayers: 'Waiting for more players...',
    waitingHost: 'Waiting for host to pick a category and start...',
    minPlayers: 'You need at least 3 players to start the game.',
    minWords: 'Please enter at least 3 words separated by a comma.',
    defaultCustomCategory: 'Custom Category',
    errorStart: 'Error starting game. Please try again.',
  },

  // ── Role Distribution ──────────────────
  roles: {
    title: 'Your Role 🤫',
    instruction: 'Make sure nobody else can see your screen!',
    tapToReveal: 'Tap here to reveal your role',
    category: 'Category:',
    unknown: 'Unknown',
    outsiderRole: 'You are the Outsider! 🤷‍♂️',
    outsiderHint: 'Try not to get caught! Listen to others\' hints to figure out the topic.',
    insiderRole: 'You know the Loop 🤫',
    insiderTopic: 'The secret topic is:',
    hostReady: 'Everyone\'s Ready – Start Hints',
    hostInstruction: 'As the host, once everyone has seen their role, proceed to hints.',
    waitingHost: 'Waiting for the host to start the round...',
  },

  // ── Hint Round ────────────────────────
  hints: {
    title: 'Current Speaker 🎤',
    subtitle: 'The speaker gives a hint without revealing the topic.',
    myTurn: 'Your Turn!',
    theirTurn: 'Turn:',
    lap: 'Round',
    player: 'Player',
    of: 'of',
    next: 'Next',
    endHintsTitle: 'Done with hints?',
    endHintsDescription: 'A majority is needed to end hints and move to voting',
    voteToEnd: 'Vote to End Hints ✋',
    voteSent: 'Your vote was sent',
    listening: 'Listen carefully to the hint...',
    errorVote: 'Error submitting vote.',
  },

  // ── Voting ────────────────────────────
  voting: {
    title: 'Voting Time 🗳️',
    subtitle: 'Everyone secretly votes for who they think is the Outsider.',
    confirmVote: 'Confirm Vote',
    voteReceived: 'Your vote was received ✅',
    waitingVotes: 'Waiting for others to finish voting...',
    voted: 'voted',
    showResults: 'Show Results',
    endEarly: 'End Voting Early',
  },

  // ── Results ───────────────────────────
  results: {
    title: 'Results 🏆',
    outsiderWas: 'The Outsider was:',
    topicWas: 'The topic was:',
    outsiderSurvived: 'The Outsider Survived! 🎉',
    outsiderSurvivedNote: 'They weren\'t caught, or there was a tie.',
    outsiderCaught: 'The Outsider was caught! 🚨',
    lastChance: 'You have one last chance. What is the topic?',
    guessTopic: 'Type the topic here...',
    confirmGuess: 'Confirm Guess',
    waitingGuess: 'Waiting for',
    waitingGuessSuffix: '\'s final guess...',
    outsiderGuessed: 'Impressive! 👏',
    outsiderGuessedNote: 'They guessed the topic despite being caught.',
    outsiderGuessedWinner: 'wins!',
    groupWins: 'The Group Wins! 🥳',
    groupWinsNote: 'Outsider was caught and couldn\'t guess the topic.',
    howVoted: 'How did people vote?',
    votes: 'vote(s)',
    playAgain: 'Play a New Round with the Same Group',
    waitingForHost: 'Waiting for the host to start a new round...',
  },

  // ── Room Page (error/loading) ──────────
  room: {
    errorTitle: 'Oops, something went wrong 😢',
    backToHome: 'Back to Home',
  },
};

export default en;

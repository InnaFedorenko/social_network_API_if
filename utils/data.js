const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Grace',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];
const emails = [
    '   @gmail.com',
    '   @yahoo.com',
    '   @hotmail.com',
    '   @aol.com',
    '   @msn.com',
    '   @comcast.net',
    '   @live.com',
    '   @sbcglobal.net',
    '   @ymail.com',
    '   @att.net',
    '   @mac.com',
    '   @cox.net',
    '   @verizon.net',
    '   @hotmail.co.uk',
    '   @bellsouth.net',

];
const thoughts = [
    'The weather today is perfect!',
    `I can't believe how fast time flies!`,
    `I'm excited for the weekend!`,
    'I wish I could travel more often.',
    'Spending time with loved ones is the best feeling.',
    'I really need to get more sleep.',
    'Pizza is the ultimate comfort food.',
    'I wonder what the future holds.',
    'Music always brightens my day.',
    'The stars look so mesmerizing tonight.',
    'Coffee is my lifesaver in the mornings.',
    'Learning something new is so rewarding.',
    'I miss the times when life was simpler.',
    'Life is full of surprises and twists.',
    'I hope everyone is having a good day!',
];
const reactions = [
    '😀',
    '😂',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '🥰',
    '🙂',
    '🤗',
    '🤩',
    "That's interesting!",
    "Tell me more about it!",
    "I can see why you feel that way.",
    "Wow, that's great!",
    "How do you handle that?",
    "I've never thought about it that way.",
    "I completely understand.",
    "That must be fun!",
    "You're not alone in that.",
    "I appreciate your perspective.",
    "That sounds wonderful!",
    "I get it.",
    "Thanks for sharing.",
    "I can relate to that.",
    "That's a unique thought.",
];
const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Gets a random email
//const getRandomEmail = () => `${getRandomArrItem(names).trim()}${getRandomArrItem(emails).trim()}`;

// Gets a random reaction
const getRandomReactions = (int) => {
    // if (int === 1) {
    //     return getRandomArrItem(reactions);
    // }
    const reactionArr = [];
    for (let i = 0; i < int; i++) {
        reactionArr.push({
            reactionBody: getRandomArrItem(reactions),
            username: getRandomName(),
        });
    }
    return reactionArr;
};

// Function to check if the username exists in the friends array
const isUsernameInFriends = (username, friends) => {
    return friends.some((friend) => friend.username === username);
};


// Gets a random thought with a random number of reactions
const getRandomThought = (int) => {
    // Generate a random number of reactions (max 5 reactions for demonstration)
    const numReactions = Math.floor(Math.random() * 6)+ 1;
    const thoughtArr = [];
    for (let i = 0; i < int; i++) {
        thoughtArr.push({
            thoughtText: getRandomArrItem(thoughts),
            username: getRandomName(),
            reactions: [...getRandomReactions(numReactions)],
        });
    }
    return thoughtArr;
};

// Gets a random user with a random number of thoughts and reactions    
const getRandomUser = () => {
    // Generate a random number of thoughts (max 5 thoughts for demonstration)
    const numThoughts = Math.floor(Math.random() * 6);
    // Gets a random user with a random number of thoughts and reactions
        const username = getRandomName();
        const email =  `${username.replace(/\s+/g, '')}${getRandomArrItem(emails).trim()}`;
        //const thoughts = [...getRandomThought(numThoughts)];
        const thoughts = [];
        const friends = [];

        const user = {
            username,
            email,
            thoughts,
           friends,
        };
        return user;
}

// Function to get a random number of friends (between 1 and maxFriends)
const getRandomFriends = (maxFriends) => {
    return Math.floor(Math.random() * maxFriends) + 1;
  };

module.exports = {getRandomUser, getRandomThought, getRandomReactions, getRandomArrItem, getRandomFriends};


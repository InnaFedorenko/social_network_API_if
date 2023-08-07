const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought, getRandomReactions, getRandomFriends } = require('./data');
connection.on('error', (err) => err);


// Function to add random friends to a user
const addRandomFriendsToUser = async (userID, userIDs) => {
    const user = await User.findById(userID);

    if (!user) {
        console.log('User not found');
        return;
    }

    const maxFriends = userIDs.length - 1; // Maximum number of possible friends (excluding the user itself)

    // Get a random number of friends for the user (between 1 and maxFriends)
    const numFriends = getRandomFriends(maxFriends);

    // Shuffle the userIDs array to get random friends for the user
    const shuffledUserIDs = userIDs.filter((id) => id !== userID); // Exclude the user itself from possible friends
    const randomFriends = shuffledUserIDs.sort(() => 0.5 - Math.random()).slice(0, numFriends);

    // Update the user's friends with the randomFriends array
    user.friends = randomFriends;

    // Save the updated user
    await user.save();
};
const addRandomThoughtsToUser = async (userID, thoughtIDs) => {
    const user = await User.findById(userID);
    console.log(thoughtIDs + '' + userID);
    if (!user) { console.log('User not found'); return; }
    const randomThoughts = thoughtIDs.sort(() => 0.5 - Math.random()).slice(0, 3);
    user.thoughts = randomThoughts;
    await user.save();
}


connection.once('open', async () => {
    console.log('connected');
    // Drop the thoughts collections in the database to start fresh
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }
    // Drop the users collection in the database to start fresh
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    const thoughts = getRandomThought(10);
    const createdThoughts = await Thought.collection.insertMany(thoughts);



    // Create the users and thoughts collections with sample data
    let users = [];
    for (i = 0; i < 10; i++) {
        const user = getRandomUser();
        users.push(user);
    }
    // Insert the sample data into the database
    const createdUsers = await User.collection.insertMany(users);

    // Extract the array of user IDs for the newly created users
    const userIDs = Object.values(createdUsers.insertedIds).map((idObject) => idObject.toString());
    const thoughtIDs = Object.values(createdThoughts.insertedIds).map((idObject) => idObject.toString());

    // Now you can call the addRandomFriendsToUser function for each user
    for (const userID of userIDs) {
        await addRandomFriendsToUser(userID, userIDs);
        await addRandomThoughtsToUser(userID, thoughtIDs);
    }


    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(thoughts);
    //console.log(JSON.stringify(thoughts, null, 2));
    console.info('Seeding complete! 🌱');
    process.exit(0);
});  
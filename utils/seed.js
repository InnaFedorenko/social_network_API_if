const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought, getRandomReactions } = require('./data');
connection.on('error', (err) => err);

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
    // Create the users and thoughts collections with sample data
    let users = [];
    for(i=0; i<10; i++){
        const user = getRandomUser();
        users.push(user);
    }
    const thoughts = getRandomThought(10);

    // Insert the sample data into the database
    const createdUsers = await User.collection.insertMany(users);
    const createdThoughts = await Thought.collection.insertMany(thoughts);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});  
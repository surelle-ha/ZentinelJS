const mongoose = require('mongoose');
const userFactory = require('../factories/userFactory');

const db_setup = require("../../config/mongodb");

db_setup();

async function seedUsers() {
    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = userFactory();
        users.push(user.save()); // Save each user to the database
    }

    // Wait for all users to be saved
    await Promise.all(users);
    console.log('Users have been seeded');
}

seedUsers().then(() => {
    mongoose.disconnect();
    console.log('Disconnected from database');
}).catch(err => {
    console.error('Error seeding users:', err);
    mongoose.disconnect();
});

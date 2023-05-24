const mongoose = require('mongoose');
const User = require('../models/user'); // Import the User model

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/partymaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an array of user data to seed the model
const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
    dateOfBirth: new Date('1990-01-01'),
    profilePic: 'profile1.jpg',
    comments: [],
    friends: [],
    assistingEvents: [],
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
    dateOfBirth: new Date('1995-02-02'),
    profilePic: 'profile2.jpg',
    comments: [],
    friends: [],
    assistingEvents: [],
  },
  // Add more user objects as needed
];

// Function to seed the User model
const seedUsers = async () => {
  try {
    // Clear existing data
    await User.deleteMany();

    // Create new users using the userData array
    const createdUsers = await User.create(userData);

    console.log('User model seeded successfully:', createdUsers);
  } catch (error) {
    console.error('Error seeding User model:', error);
  } finally {
    // Disconnect from the MongoDB database
    mongoose.disconnect();
  }
};

module.exports = seedUsers;
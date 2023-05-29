const User = require("../models/User"); // Import the User model

// Create an array of user data to seed the model
const userData = [
  {
    username: "CaptainHero",
    email: "captainhero@example.com",
    password: "supersecret",
    dateOfBirth: "1990-05-20",
    profilePic: "captainhero_profile.jpg",
  },
  {
    username: "MysticMind",
    email: "mysticmind@example.com",
    password: "mindbender",
    dateOfBirth: "1995-12-10",
    profilePic: "mysticmind_profile.jpg",
  },
];

// Function to seed the User model
const seedUsers = async () => {
  try {
    // Clear existing data
    await User.deleteMany();

    // Create new users using the userData array
    const createdUsers = await User.create(userData);

    console.log("User model seeded successfully:", createdUsers);
  } catch (error) {
    console.error("Error seeding User model:", error);
  } finally {
    console.log("Users Seed Done");
  }
};

module.exports = seedUsers;

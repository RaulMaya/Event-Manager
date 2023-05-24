const mongoose = require("mongoose");
const seedUsers = require("./seedUsers");
const seedEvents = require("./seedEvents");
const seedComments = require("./seedComments");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/partymaster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Seed users
    await seedUsers();

    console.log("Users seeded successfully.");

    // Seed events
    await seedEvents();

    console.log("Events seeded successfully.");

    // Seed comments
    await seedComments();

    console.log("Comments seeded successfully.");

    // All seeding completed
    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Disconnect from the MongoDB database
    console.log("=== ALL SEEDS SEEDED ===");
    // Disconnect from the MongoDB database
    mongoose.disconnect();
  }
};

// Call the seedData function to start seeding the data sequentially
seedData();

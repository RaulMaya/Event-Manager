const mongoose = require("mongoose");
const Comment = require('../models/Comment'); // Import the Comment model
const User = require('../models/User'); // Import the User model
const Event = require('../models/Event'); // Import the Event model

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/partymaster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an array of comment data to seed the model
const commentData = [
  {
    commentText: "Comment 1",
    user: null, // We'll populate this with the actual user object later
    event: null, // We'll populate this with the actual event object later
  },
  {
    commentText: "Comment 2",
    user: null, // We'll populate this with the actual user object later
    event: null, // We'll populate this with the actual event object later
  },
  // Add more comment objects as needed
];

// Function to seed the Comment model
const seedComments = async () => {
  try {
    // Clear existing data
    await Comment.deleteMany();

    // Find all users
    const users = await User.find();

    // Find all events
    const events = await Event.find();

    // Update user and event references in commentData array
    commentData.forEach((comment, index) => {
      // Assign a random user to the comment
      comment.user = users[Math.floor(Math.random() * users.length)]._id;

      // Assign a random event to the comment
      comment.event = events[Math.floor(Math.random() * events.length)]._id;
    });

    // Create new comments using the updated commentData array
    const createdComments = await Comment.create(commentData);

    console.log("Comment model seeded successfully:", createdComments);
  } catch (error) {
    console.error("Error seeding Comment model:", error);
  } finally {
    // Disconnect from the MongoDB database
    mongoose.disconnect();
  }
};

// Call the seedComments function to start seeding the model
module.exports = seedComments;

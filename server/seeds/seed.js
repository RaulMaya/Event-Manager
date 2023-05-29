const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const Comment = require("../models/Comment");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/partymaster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Event.deleteMany({});
    await Comment.deleteMany({});
    // Create users
    const user1 = await User.create({
      username: "johndoe",
      email: "john@example.com",
      password: "password#123",
      dateOfBirth: "1990-05-15",
      profilePic: "john.jpg",
    });

    const user2 = await User.create({
      username: "janesmith",
      email: "jane@example.com",
      password: "password#456",
      dateOfBirth: "1992-09-20",
      profilePic: "jane.jpg",
    });

    const user3 = await User.create({
      username: "ironman",
      email: "tony@example.com",
      password: "password#789",
      dateOfBirth: "1970-10-05",
      profilePic: "tony.jpg",
    });

    // Create events
    const event1 = await Event.create({
      eventName: "Avengers Party",
      eventDescription: "Join us for an epic gathering of Avengers fans!",
      mainImg: "avengers-party.jpg",
      portraitImg: "avengers-portrait.jpg",
      tags: ["superheroes", "marvel", "party"],
      eventStartDate: "2023-06-15",
      eventLocation: {
        address: "123 Stark Tower",
        city: "New York",
        country: "USA",
        state: "NY",
        lat: 40.7128,
        lon: -74.006,
      },
      eventType: "Party",
      eventCapacity: 100,
      eventInvitation: true,
      minAge: 18,
      createdBy: user3._id,
      usersAssisting: [user1._id, user2._id],
    });

    const event2 = await Event.create({
      eventName: "Game Night",
      eventDescription: "Bring your favorite board games for a night of fun!",
      mainImg: "game-night.jpg",
      portraitImg: "game-portrait.jpg",
      tags: ["games", "friends", "fun"],
      eventStartDate: "2023-07-20",
      eventLocation: {
        address: "456 Boardgame Lane",
        city: "Los Angeles",
        country: "USA",
        state: "CA",
        lat: 34.0522,
        lon: -118.2437,
      },
      eventType: "Social",
      eventCapacity: 50,
      eventInvitation: false,
      minAge: 16,
      createdBy: user1._id,
      usersAssisting: [user2._id],
    });

    const event3 = await Event.create({
      eventName: "Beach Day",
      eventDescription: "Enjoy a sunny day at the beach with friends!",
      mainImg: "beach-day.jpg",
      portraitImg: "beach-portrait.jpg",
      tags: ["beach", "fun", "sun"],
      eventStartDate: "2023-08-10",
      eventLocation: {
        address: "789 Sandy Beach",
        city: "Miami",
        country: "USA",
        state: "FL",
        lat: 25.7617,
        lon: -80.1918,
      },
      eventType: "Outdoor",
      eventCapacity: 200,
      eventInvitation: true,
      minAge: 16,
      createdBy: user2._id,
      usersAssisting: [user1._id],
    });

    const event4 = await Event.create({
      eventName: "Cosplay Convention",
      eventDescription:
        "Show off your best cosplay costumes at the convention!",
      mainImg: "cosplay-convention.jpg",
      portraitImg: "cosplay-portrait.jpg",
      tags: ["cosplay", "convention", "costumes"],
      eventStartDate: "2023-09-25",
      eventLocation: {
        address: "101 Cosplay Street",
        city: "Tokyo",
        country: "Japan",
        state: "Tokyo",
        lat: 35.6895,
        lon: 139.6917,
      },
      eventType: "Convention",
      eventCapacity: 500,
      eventInvitation: true,
      minAge: 16,
      createdBy: user1._id,
      usersAssisting: [user2._id, user3._id],
    });

    // Create comments
    const comment1 = await Comment.create({
      commentText: "Looking forward to the Avengers Party!",
      user: user1._id,
      event: event1._id,
    });

    const comment2 = await Comment.create({
      commentText: "I'll be there with my Iron Man costume!",
      user: user2._id,
      event: event1._id,
    });

    const comment3 = await Comment.create({
      commentText: "Game Night sounds like a lot of fun!",
      user: user2._id,
      event: event2._id,
    });

    // Update user relationships
    user1.comments.push(comment1._id, comment2._id);
    user1.friends.push(user2._id, user3._id);
    user1.assistingEvents.push(event2._id, event4._id);
    user1.createdEvents.push(event2._id, event4._id);
    await user1.save();

    user2.comments.push(comment3._id);
    user2.friends.push(user1._id, user3._id);
    user2.assistingEvents.push(event1._id, event2._id);
    user2.createdEvents.push(event3._id, event4._id);
    await user2.save();

    user3.friends.push(user1._id, user2._id);
    user3.createdEvents.push(event1._id);
    await user3.save();

    console.log("Dummy data seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding dummy data:", error);
  }
};

// Call the seedData function to start seeding the data sequentially
seedData();

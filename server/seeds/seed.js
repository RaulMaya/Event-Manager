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
      username: "johncena",
      email: "johncena@example.com",
      password: "password#123",
      dateOfBirth: "1990-05-15",
      profilePic:
        "https://pbs.twimg.com/profile_images/839539770384662528/2DkQOk3r_400x400.jpg",
    });

    const user2 = await User.create({
      username: "anadearmas",
      email: "anadearmas@example.com",
      password: "password#456",
      dateOfBirth: "1992-09-20",
      profilePic:
        "https://www.themoviedb.org/t/p/original/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg",
    });

    const user3 = await User.create({
      username: "ironman",
      email: "tony@example.com",
      password: "password#789",
      dateOfBirth: "1970-10-05",
      profilePic:
        "https://scontent.ftam1-1.fna.fbcdn.net/v/t1.6435-9/83323529_10158011544627290_2299282377949577216_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5YNpmEYWwCMAX8N5d6B&_nc_ht=scontent.ftam1-1.fna&oh=00_AfBtV6D_XqhPvScxeUOaWDz5DKV9dNTkYZG-Fy1yIoUikw&oe=649F4CD7",
    });

    const event1 = await Event.create({
      eventName: "Pizza Party",
      eventDescription: "Join us for a delicious pizza feast!",
      mainImg:
        "https://www.allrecipes.com/thmb/ULiSEmH8Tje7Hh-TW1aN2P8dC98=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg",
      portraitImg: "https://example.com/pizza-party-portrait.jpg",
      tags: ["food", "party", "pizza"],
      eventStartDate: "2023-06-15",
      eventLocation: {
        address: "123 Pizza Avenue",
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
      usersAssisting: [],
    });

    const event2 = await Event.create({
      eventName: "Game Night",
      eventDescription: "Bring your favorite board games for a night of fun!",
      mainImg:
        "https://static.vecteezy.com/system/resources/previews/002/187/599/non_2x/game-night-neon-signs-style-text-free-vector.jpg",
      portraitImg: "https://example.com/game-night-portrait.jpg",
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
      usersAssisting: [],
    });

    const event3 = await Event.create({
      eventName: "Beach Bonanza",
      eventDescription: "Enjoy a day of sun, sand, and water at the beach!",
      mainImg:
        "https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1920-80.jpg.webp",
      portraitImg: "https://example.com/beach-bonanza-portrait.jpg",
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
      usersAssisting: [],
    });

    const event4 = await Event.create({
      eventName: "Comic Con",
      eventDescription: "Experience the ultimate celebration of pop culture!",
      mainImg:
        "https://ca-times.brightspotcdn.com/dims4/default/6c1b204/2147483647/strip/true/crop/3710x3264+0+0/resize/1200x1056!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3d%2Fcb%2Fb0cd7d234a098a40cf2c24f98966%2F3085409-sd-me-comic-con-saturday-10.JPG",
      portraitImg: "https://example.com/comic-con-portrait.jpg",
      tags: ["comic", "convention", "pop culture"],
      eventStartDate: "2023-09-25",
      eventLocation: {
        address: "101 Comic Street",
        city: "San Diego",
        country: "USA",
        state: "CA",
        lat: 32.7157,
        lon: -117.1611,
      },
      eventType: "Convention",
      eventCapacity: 500,
      eventInvitation: true,
      minAge: 16,
      createdBy: user1._id,
      usersAssisting: [],
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

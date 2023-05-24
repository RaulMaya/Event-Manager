const Event = require('../models/Event');  // Import the Event model

// Create an array of event data to seed the model
const eventData = [
  {
    eventName: "Event 1",
    eventDescription: "Description of Event 1",
    mainImg: "main1.jpg",
    portraitImg: "portrait1.jpg",
    comments: [],
    tags: ["tag1", "tag2"],
    usersAssisting: [],
    eventStartDate: new Date("2023-06-01"),
    eventLocation: {
      address: "123 Main St",
      city: "City 1",
      country: "Country 1",
      state: "State 1",
      lat: 123.456,
      lon: 789.012,
    },
    eventType: "Type 1",
    eventCapacity: 100,
    eventInvitation: false,
  },
  {
    eventName: "Event 2",
    eventDescription: "Description of Event 2",
    mainImg: "main2.jpg",
    portraitImg: "portrait2.jpg",
    comments: [],
    tags: ["tag3", "tag4"],
    usersAssisting: [],
    eventStartDate: new Date("2023-06-15"),
    eventLocation: {
      address: "456 Elm St",
      city: "City 2",
      country: "Country 2",
      state: "State 2",
      lat: 789.012,
      lon: 345.678,
    },
    eventType: "Type 2",
    eventCapacity: 200,
    eventInvitation: true,
  },
  // Add more event objects as needed
];

// Function to seed the Event model
const seedEvents = async () => {
  try {
    // Clear existing data
    await Event.deleteMany();

    // Create new events using the eventData array
    const createdEvents = await Event.create(eventData);

    console.log("Event model seeded successfully:", createdEvents);
  } catch (error) {
    console.error("Error seeding Event model:", error);
  } finally {
    console.log("Events Created")
  }
};

// Call the seedEvents function to start seeding the model

module.exports = seedEvents;

const Event = require("../models/Event"); // Import the Event model

// Create an array of event data to seed the model
const eventData = [
  {
    eventName: "Superhero Convention",
    eventCategory: "Entertainment",
    eventDescription:
      "Join your favorite superheroes for a day of fun and adventure!",
    mainImg: "superhero_convention.jpg",
    portraitImg:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b",
    tags: ["superheroes", "cosplay", "comics"],
    eventStartDate: "2023-06-01",
    eventLocation: {
      address: "123 Main Street",
      city: "Comicville",
      country: "Superland",
      state: "Metropolis",
      lat: 40.7128,
      lon: -74.006,
    },
    eventType: "Convention",
    eventCapacity: 500,
    eventInvitation: false,
    minAge: 10,
  },
  {
    eventName: "Alien Invasion Escape Room",
    eventCategory: "Gaming",
    eventDescription:
      "Can you and your team escape from an alien-infested spaceship?",
    mainImg: "alien_escape_room.jpg",
    portraitImg:
      "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=",
    tags: ["escape room", "aliens", "puzzles"],
    eventStartDate: "2023-06-15",
    eventLocation: {
      address: "789 Elm Street",
      city: "Mysteryville",
      country: "Enigmatopia",
      state: "Puzzleland",
      lat: 35.6895,
      lon: 139.6917,
    },
    eventType: "Escape Room",
    eventCapacity: 8,
    eventInvitation: true,
    minAge: 16,
  },
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
    console.log("Events Created");
  }
};

// Call the seedEvents function to start seeding the model

module.exports = seedEvents;

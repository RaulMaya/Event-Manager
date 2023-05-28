const { Comment, Event, User } = require("../models");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({})
    },
    events: async () => {
      return await Event.find({})
    },
    event: async (parent, args) => {
      return await Event.findById(args.id)
    },
    users: async () => {
      return await User.find({}).populate("createdEvents");
    },
    user: async (parent, args) => {
      return await User.findById(args.id).populate("createdEvents");
    },
  },
  Mutation: {
    addComment: async (parent, args) => {
      // find the user
      const userObj = User.findById(args.userId);

      // find the event
      const eventObj = Event.findById(args.eventId);

      // Create and return the new Comment object
      return await Comment.create({
        commentText: args.commentText,
        user: userObj,
        event: eventObj,
      });
    },

    createUser: async (parent, args) => {
      return await User.create(args);
    },

    updateUser: async (parent, args) => {
      return await User.findOneAndUpdate(
        { _id: args.id },
        {
          username: args.username,
          email: args.email,
          password: args.password,
          profilePic: args.profilePic,
        },
        { new: true }
      );
    },
    deleteUser: async (parent, args) => {
      return await User.findOneAndRemove({ _id: args.id });
    },

    createEvent: async (parent, args) => {
      const {
        eventName,
        eventCategory,
        eventDescription,
        mainImg,
        portraitImg,
        tags,
        eventStartDate,
        eventLocation,
        eventType,
        eventCapacity,
        eventInvitation,
        minAge,
        createdBy,
      } = args;

      // Here, you can use the 'createdBy' ID to fetch the corresponding user
      // and establish the relationship between the user and the event.

      // Example code to fetch the user by ID (this may vary depending on your data source):
      const user = await User.findById(createdBy);
      console.log(user)
      if (!user) {
        throw new Error("User not found");
      }

      // Create the event with the user relationship
      const event = await Event.create({
        eventName,
        eventCategory,
        eventDescription,
        mainImg,
        portraitImg,
        tags,
        eventStartDate,
        eventLocation,
        eventType,
        eventCapacity,
        eventInvitation,
        minAge,
        createdBy: user, // Set the createdBy field to the user object
      });

      // Add the created event to the user's createdEvents array
      user.createdEvents.push(event);
      await user.save();

      // Return the created event
      return event;
    },

    updateEvent: async (parent, args) => {
      return await Event.findOneAndUpdate(
        { _id: args.id },
        {
          eventName: args.eventName,
          eventCategory: args.eventCategory,
          eventDescription: args.eventDescription,
          mainImg: args.mainImg,
          portraitImg: args.portraitImg,
          tags: args.tags,
          eventStartDate: args.eventStartDate,
          eventLocation: args.eventLocation,
          eventType: args.eventType,
          eventCapacity: args.eventCapacity,
          eventInvitation: args.eventInvitation,
          minAge: args.minAge,
        },
        { new: true }
      );
    },
    deleteEvent: async (parent, args) => {
      return await Event.findOneAndRemove({ _id: args.id });
    },
  },
};

module.exports = resolvers;

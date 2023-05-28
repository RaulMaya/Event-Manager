const { Comment, Event, User } = require("../models");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({}).populate("user");
    },
    events: async () => {
      return await Event.find({}).populate("usersAssisting").populate({
        path: "usersAssisting",
        populate: "comments",
      });
    },
    event: async (parent, args) => {
      return await Event.findById(args.id);
    },
    users: async () => {
      return await User.find({}).populate("comments");
    },
    user: async (parent, args) => {
      return await User.findById(args.id);
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
      return await Event.create(args);
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

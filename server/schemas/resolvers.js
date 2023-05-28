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
    users: async () => {
      return await User.find({}).populate("comments");
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
        { email: args.email, password: args.password },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

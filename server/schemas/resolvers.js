const { Comment, Event, User } = require("../models");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({});
    },
    events: async () => {
      return await Event.find({}).populate("professor");
    },
    users: async () => {
      return await User.find({}).populate("comments").populate("events");
    },
  },
};

module.exports = resolvers;

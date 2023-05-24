const { Comment, Event, User } = require("../models");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({});
    },
    events: async () => {
      return await Event.find({});
    },
    users: async () => {
      return await User.find({});
    },
  },
};

module.exports = resolvers;

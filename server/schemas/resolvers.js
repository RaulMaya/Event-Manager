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
};

module.exports = resolvers;
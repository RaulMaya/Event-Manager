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
    createUser: async (parent, args) => {
    return await User.create(args);
    },
    
    updateUser: async (parent, args) => {
    return await User.findOneAndUpdate({_id:args.id}, {email:args.email, password: args.password }, {new:true});
      }
  }

};

module.exports = resolvers;

const { Comment, Event, User } = require("../models");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({}).populate("user");
    },
    comment: async (parent, args) => {
      return await Comment.findById(args.id).populate("user");
    },
    events: async () => {
      return await Event.find({}).populate("comments").populate({
        path: "comments",
        populate: "user",
      });;
    },
    event: async (parent, args) => {
      return await Event.findById(args.id).populate("comments");
    },
    users: async () => {
      return await User.find({})
        .populate("createdEvents")
        .populate("assistingEvents")
        .populate("comments");
    },
    user: async (parent, args) => {
      return await User.findById(args.id)
        .populate("createdEvents")
        .populate("assistingEvents")
        .populate("comments");
    },
  },
  Mutation: {
    createComment: async (parent, { eventId, userId, commentText }) => {
      try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
          throw new Error("Event not found");
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Create the new comment
        const comment = new Comment({
          commentText,
          user: user._id,
          event: event._id,
        });

        // Save the comment
        await comment.save();

        // Add the comment to the event's comments array
        event.comments.push(comment._id);
        await event.save();

        // Add the comment to the user's comments array
        user.comments.push(comment._id);
        await user.save();

        // Return the created comment
        return comment;
      } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Failed to create comment");
      }
    },
    deleteComment: async (parent, args) => {
      return await Comment.findOneAndRemove({ _id: args.id });
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

      const user = await User.findById(createdBy);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }

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
    assistEvent: async (parent, { eventId, userId }) => {
      try {
        // Find the user and event
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
          throw new Error("User or event not found");
        }

        // Add the user to the event's usersAssisting array
        event.usersAssisting.push(user);
        await event.save();

        // Add the event to the user's assistingEvents array
        user.assistingEvents.push(event);
        await user.save();

        // Return the updated event
        return event;
      } catch (error) {
        throw new Error("Error attending event");
      }
    },
  },
};

module.exports = resolvers;

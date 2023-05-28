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
      });
    },
    event: async (parent, args) => {
      return await Event.findById(args.id).populate("comments");
    },
    users: async () => {
      return await User.find({})
        .populate("createdEvents")
        .populate("assistingEvents")
        .populate("comments")
        .populate("friends");
    },
    user: async (parent, args) => {
      return await User.findById(args.id)
        .populate("createdEvents")
        .populate("assistingEvents")
        .populate("comments")
        .populate("friends");
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
    updateComment: async (parent, { commentId, commentText }) => {
      try {
        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }

        // Update the comment text
        comment.commentText = commentText;

        // Save the updated comment
        await comment.save();

        // Return the updated comment
        return comment;
      } catch (error) {
        console.error("Error updating comment:", error);
        throw new Error("Failed to update comment");
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
    addFriend: async (parent, { userId, friendId }) => {
      try {
        // Check if both users exist
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
          throw new Error("User or friend not found");
        }

        // Check if the user is already friends with the friend
        if (user.friends.includes(friendId)) {
          throw new Error("You already have this user as a friend");
        }

        // Add friend to the user's friends array
        user.friends.push(friend._id);
        await user.save();

        // Return the updated user
        return user;
      } catch (error) {
        console.error("Error adding friend:", error);
        throw new Error("Failed to add friend");
      }
    },
    removeFriend: async (parent, { userId, friendId }) => {
      try {
        // Check if both users exist
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
          throw new Error("User or friend not found");
        }

        // Check if the friend exists in the user's friends array
        if (!user.friends.includes(friendId)) {
          throw new Error("This user is not in your friends list");
        }

        // Remove the friend from the user's friends array
        user.friends = user.friends.filter(
          (friend) => friend.toString() !== friendId
        );
        await user.save();

        // Return the updated user
        return user;
      } catch (error) {
        console.error("Error removing friend:", error);
        throw new Error("Failed to remove friend");
      }
    },
  },
};

module.exports = resolvers;

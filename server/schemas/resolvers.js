const { Comment, Event, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find({})
        .populate("user")
        .populate("event")
        .populate({
          path: "event",
          populate: "createdBy",
        });
    },
    comment: async (parent, args) => {
      return await Comment.findById(args.id)
        .populate("user")
        .populate("event")
        .populate({
          path: "comments",
          populate: "user",
        });
    },
    events: async () => {
      return await Event.find({})
        .populate("comments")
        .populate({
          path: "comments",
          populate: "user",
        })
        .populate("createdBy")
        .populate("usersAssisting");
    },
    event: async (parent, args) => {
      return await Event.findById(args.id)
        .populate("comments")
        .populate({
          path: "comments",
          populate: "user",
        })
        .populate("createdBy")
        .populate("usersAssisting");
    },

    users: async () => {
      return await User.find({})
        .populate("createdEvents")
        .populate("assistingEvents")
        .populate("comments")
        .populate({
          path: "comments",
          populate: "event",
        })
        .populate("friends");
    },
    user: async (parent, args) => {
      return await User.findById(args.id)
        .populate("createdEvents")
        .populate({
          path: "createdEvents",
          populate: {
            path: "comments",
            populate: {
              path: "user",
              model: "User",
            },
          },
        })
        .populate("assistingEvents")
        .populate("comments")
        .populate({
          path: "comments",
          populate: "event",
        }) //s
        .populate("friends");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("createdEvents")
          .populate({
            path: "createdEvents",
            populate: {
              path: "comments",
              populate: {
                path: "user",
                model: "User",
              },
            },
          })
          .populate("assistingEvents")
          .populate("comments")
          .populate({
            path: "comments",
            populate: "event",
          })
          .populate("friends");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      try {
        // Find the user by username or email
        const user = await User.findOne({ username });
        if (!user) {
          throw new AuthenticationError("Invalid username/email");
        }

        // Compare the provided password with the stored password hash
        const isPasswordMatch = await user.isCorrectPassword(password);

        if (!isPasswordMatch) {
          throw new AuthenticationError("Invalid password");
        }

        // Password is correct, return the user
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Failed to log in");
      }
    },
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
      const userCreated = await User.create(args);
      const token = signToken(userCreated);

      return { token, user: userCreated };
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
      try {
        const userId = args.id;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Find the events created by the user
        const userEvents = await Event.find({ createdBy: userId });

        // Delete the comments associated with the user's events
        const eventIds = userEvents.map((event) => event._id);
        await Comment.deleteMany({ event: { $in: eventIds } });

        // Delete the events created by the user
        await Event.deleteMany({ createdBy: userId });

        // Remove the user
        await User.findOneAndRemove({ _id: userId });

        return user;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
      }
    },

    createEvent: async (parent, args, { user }) => {
      console.log(user);
      if (user) {
        const {
          eventName,
          eventCategory,
          eventDescription,
          mainImg,
          portraitImg,
          tags,
          eventStartDate,
          eventLocation,
          eventCapacity,
          eventInvitation,
          minAge,
        } = args;

        const authUser = await User.findById(user._id);
        if (!authUser) {
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
          eventCapacity,
          eventInvitation,
          minAge,
          createdBy: authUser._id,
        });

        // Add the created event to the user's createdEvents array
        authUser.createdEvents.push(event);
        await authUser.save();

        // Return the created event
        return event;
      } else {
        throw new AuthenticationError("Invalid username/email");
      }
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
          eventCapacity: args.eventCapacity,
          eventInvitation: args.eventInvitation,
          minAge: args.minAge,
        },
        { new: true }
      );
    },
    deleteEvent: async (parent, args) => {
      try {
        const eventId = args.id;

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
          throw new Error("Event not found");
        }

        // Delete the comments associated with the event
        await Comment.deleteMany({ event: eventId });

        // Remove the event
        await Event.findOneAndRemove({ _id: eventId });

        return event;
      } catch (error) {
        console.error("Error deleting event:", error);
        throw new Error("Failed to delete event");
      }
    },
    assistEvent: async (parent, args, { user }) => {
      try {
        // Find the user and event
        const authUser = await User.findById(user._id);
        const event = await Event.findById(args.eventId);
        console.log(event, authUser);
        if (!authUser || !event) {
          throw new Error("User or event not found");
        }

        // Check if the user is already attending the event
        if (event.usersAssisting.includes(user._id)) {
          throw new Error("You are already attending this event");
        }

        // Add the user to the event's usersAssisting array
        event.usersAssisting.push(authUser);
        await event.save();

        // Add the event to the user's assistingEvents array
        authUser.assistingEvents.push(event);
        await authUser.save();

        // Return the updated event
        return event;
      } catch (error) {
        console.log(error);
        throw new Error("Error attending event");
      }
    },
    unconfirmEvent: async (parent, args, { user }) => {
      try {
        // Find the user and event
        const authUser = await User.findById(user._id);
        const event = await Event.findById(args.eventId);

        if (!authUser || !event) {
          throw new Error("User or event not found");
        }

        // Remove the user from the event's usersAssisting array
        event.usersAssisting = event.usersAssisting.filter(
          (user) => user.toString() !== user._id.toString()
        );
        await event.save();

        // Remove the event from the user's assistingEvents array
        authUser.assistingEvents = authUser.assistingEvents.filter(
          (event) => event.toString() !== args.eventId
        );
        await authUser.save();

        // Return the updated event
        return event;
      } catch (error) {
        throw new Error("Error unconfirming event attendance");
      }
    },
    addFriend: async (parent, { userId, friendId }) => {
      try {
        // Check if both users exist
        const user = await User.findById(userId).populate("friends");
        const friend = await User.findById(friendId).select("username email");

        if (!user || !friend) {
          throw new Error("User or friend not found");
        }

        // Check if the user is already friends with the friend
        if (user.friends.some((friend) => friend._id.toString() === friendId)) {
          throw new Error("You already have this user as a friend");
        }

        // Add friend to the user's friends array
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { friends: friend } },
          { new: true }
        ).populate("friends");

        // Return the updated user
        return updatedUser;
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

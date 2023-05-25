const { Comment, User, Event } = require("../models");

const commentController = {
  // get all comments
  async getComments(req, res) {
    try {
      const comments = await Comment.find().populate("user").populate("event");
      res.json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all comments for a specific event
  async getCommentsByEvent(req, res) {
    try {
      const comments = await Comment.find({ event: req.params.eventId })
        .populate("user")
        .populate("event");
      if (!comments) {
        return res
          .status(404)
          .json({ message: "No comments for this event ID" });
      }
      res.json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get single comment by ID
  async getComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.commentId)
        .populate("user")
        .populate("event");
      if (!comment) {
        return res.status(404).json({ message: "No comment with that ID" });
      }
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new comment
  async createComment(req, res) {
    try {
      const { userId, eventId, thoughtText } = req.body;
      const newComment = await Comment.create({
        user: userId,
        event: eventId,
        thoughtText,
      });
      // Push the new comment to the corresponding user's and event's comments
      await User.findByIdAndUpdate(
        userId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
      await Event.findByIdAndUpdate(
        eventId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a comment by ID
  async updateComment(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      );
      if (!comment) {
        return res.status(404).json({ message: "No comment with that ID" });
      }
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a comment by ID
  async deleteComment(req, res) {
    try {
      const comment = await Comment.findByIdAndRemove(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: "No comment with that ID" });
      }
      // Pull the deleted comment from the corresponding user's and event's comments
      await User.findByIdAndUpdate(
        comment.user,
        { $pull: { comments: comment._id } },
        { new: true }
      );
      await Event.findByIdAndUpdate(
        comment.event,
        { $pull: { comments: comment._id } },
        { new: true }
      );
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;

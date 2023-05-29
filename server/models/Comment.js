const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    // Added timestamp in order to have more information that can be displayed
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Modified the username variable since it wasn´t connected to the user model
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Added event and conected it to the Events model so that the connection works also
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;

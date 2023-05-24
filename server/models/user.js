const { Schema, model, Types } = require("mongoose");
const { hashPassword, checkPassword } = require("../utils/helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      set: hashPassword, // We use Mongoose's 'set' to automatically hash passwords before they are stored
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    profilePic: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assistingEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
      transform: function (doc, ret) {
        delete ret.password; // Ensure password hashes don't get sent with API responses
        return ret;
      },
    },
    id: false,
  }
);

userSchema.methods = {
  checkPassword: function (password) {
    // Use the helper function for comparing passwords
    return checkPassword(password, this.password);
  },
};

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;

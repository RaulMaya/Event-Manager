const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 1,
    },
    eventCategory: {
      type: String,

      // On the front end. The input should be a select category. It will be chosen in the front end.
    },
    eventDescription: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    // For the images we supose that links are being passed
    mainImg: {
      type: String,
    },
    // For the images we supose that links are being passed
    portraitImg: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    tags: {
      type: [String],
    },
    usersAssisting: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventStartDate: {
      type: Date,
      required: true,
    },
    eventLocation: {
      address: String,
      city: String,
      country: String,
      state: String,
      lat: Number,
      lon: Number,
    },
    eventType: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    eventCapacity: {
      type: Number,
      required: true,
    },
    eventInvitation: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Event = model("Event", eventSchema);
module.exports = Event;

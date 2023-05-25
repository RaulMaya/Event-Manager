const { Events } = require("../models");

const eventController = {
  // GET all events
  async getEvents(req, res) {
    try {
      const events = await Events.find();
      res.json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single event by id
  async getSingleEvent(req, res) {
    try {
      const event = await Events.findOne({ _id: req.params.eventId }).select(
        "-__v"
      );

      if (!event) {
        return res.status(404).json({ message: "No event with that ID" });
      }

      res.json(event);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // CREATE a new event
  async createEvent(req, res) {
    try {
      console.log(req.body);
      const dbEventData = await Events.create(req.body);
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // UPDATE an existing event by id
  async updateEvent(req, res) {
    try {
      const dbEventData = await Events.findOneAndUpdate(
        { _id: req.params.eventId },
        { $set: req.body },
        { new: true }
      );
      if (!dbEventData) {
        return res.status(404).json({ message: "No event with that ID" });
      }
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE an event by id
  async deleteEvent(req, res) {
    try {
      const dbEventData = await Events.findOneAndDelete({
        _id: req.params.eventId,
      });
      if (!dbEventData) {
        return res.status(404).json({ message: "No event with that ID" });
      }
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = eventController;

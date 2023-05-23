const { Comment, User, Events } = require('../models');
//we will probably add stuff with user and events later.

const eventController = {
  
  async getEvents(req, res) {
    try {
      const events = await Events.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleEvent(req, res) {
    try {
      const events = await Events.findOne({ _id: req.params.userId })
        .select('-__v')


      if (!events) {
        return res.status(404).json({ message: 'No event with that ID' });
      }

      res.json(Events);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  },
  // create a new user
  async createEvent(req, res) {
    try {
      console.log(req.body);
      const dbUserData = await Event.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateEvent(req, res) {
    const dbUserData = await Event.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    res.json (dbUserData);

  },
  async deleteEvent(req, res) {
    const dbUserData = await Event.findOneAndDelete(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
  );
  if (!dbUserData) {
    return res.status(404).json({ message: 'No event with that ID' });
  }
  res.json (dbUserData);
  
},

};

module.exports = eventController;
const { Comment, User, Events } = require('../models');


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
  async createUser(req, res) {
    try {
      console.log(req.body);
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
      // Sets to true so updated document is returned; Otherwise original document will be returned
    );
    res.json (dbUserData);

  },
  async deleteUser(req, res) {
    const dbUserData = await User.findOneAndDelete(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
  );
  if (!dbUserData) {
    return res.status(404).json({ message: 'No user with that ID' });
  }
  res.json (dbUserData);
  
},

};

module.exports = eventController;
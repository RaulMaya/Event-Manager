const { User } = require('../models');


const userController = {
  
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
//        .populate('comments')
//        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
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

module.exports = userController;
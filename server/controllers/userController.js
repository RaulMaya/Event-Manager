const { User } = require("../models");

const userController = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // CREATE a new user
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
// not done yet, needs testing.
  async addFriend(req, res) {
    try {
      const { userId, friendID } = req.body;
      await User.findByIdAndUpdate(
        userId,
        { $push: { friends: friendID } },
        { new: true }
      );
      res.json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // needs testing
  async deleteFriend(req, res) {
    try {
      if (!comment) {
        return res.status(404).json({ message: "No comment with that ID" });
      }
      await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }},
//not done yet, need testing.
      
  // UPDATE an existing user by id
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE a user by id
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;

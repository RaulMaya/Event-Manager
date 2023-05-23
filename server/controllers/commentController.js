const { Comment, User } = require('../models');


const commentController =
  {   
    async getComment(req, res) {
      try {
        const users = await Comment.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async getSingleComment(req, res) {
      try {
        const thought = await Comment.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }, 
    async createComment(req, res) {
      try {
        const dbThoughtData = await Comment.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
          { _id: req.body.userId },
          {$push: {comment: dbThoughtData._id}},
          // Sets to true so updated document is returned; Otherwise original document will be returned
          { new: true })
          if(!dbUserData) {
            return res.status(404).json({message: "error"});
          }

          res.json (dbThoughtData);
      } catch (err) {

        console.log(err)
        res.status(500).json(err);
      }

    },
    async updateComment(req, res) {
      // Uses findOneAndUpdate() method on model
          const dbUserData = await Comment.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            // Sets to true so updated document is returned; Otherwise original document will be returned
            { new: true }
          );
          res.json (dbUserData);
    },
    async deleteComment(req, res) {
        const dbUserData = await Comment.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        if (!dbUserData) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json (dbUserData);
        
    },

  };
  


module.exports = commentController
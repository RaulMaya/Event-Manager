const router = require("express").Router();
const {
  getCommentsByEvent,
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

// Get comments by event
router.route("/:eventId").get(getCommentsByEvent);

// Create a new comment
router.route("/create").post(createComment);

// Update or delete a comment
router.route("/:commentId").put(updateComment).delete(deleteComment);

// Add or remove a friend
// Uncomment this line if you have implemented addFriend and deleteFriend methods
// router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

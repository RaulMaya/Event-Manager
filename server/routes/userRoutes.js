const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUsers);

router.route("/create").post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Assuming the addFriend and deleteFriend methods are defined in the userController
// router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

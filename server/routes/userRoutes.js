const router = require('express').Router();
const {

  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
  //view friend
  //view friend's events
} = require('../controllers/userController');

router.route('/create').post(createUser);

router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
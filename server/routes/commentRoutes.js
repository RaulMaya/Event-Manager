
const router = require('express').Router();
const {
//   get comment? idk
//   viewFriendsComments?
    createComment,
    deleteComment,
    updateComment,
} = require('../controllers/eventController')



router.route('/create').post(createComment);

router.route('/:userId').put(updateComment).delete(deleteComment);


router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
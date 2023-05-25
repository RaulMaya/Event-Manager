const router = require('express').Router();
const {
    getEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    //view friend's events
    //view friends in the event
} = require('../controllers/eventController')

router.route('/').get(getEvents)

router.route('/create').post(createEvent);

router.route('/:userId').get(getSingleEvent).put(updateEvent).delete(deleteEvent);


router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
const router = require("express").Router();
const {
  getEvents,
  getSingleEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

router.route("/").get(getEvents);

router.route("/create").post(createEvent);

router
  .route("/:eventId")
  .get(getSingleEvent)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;

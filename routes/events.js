const router = require("express").Router();
const EventController = require("../controllers/EventController");

router.get("/", EventController.getAllEvents);
router.get("/user/:user_id", EventController.getAllEventsByUserId);
router.post("/", EventController.addEvent);

module.exports = router;

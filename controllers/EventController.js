const Event = require("../models/Events");
let controller = {};

controller.addEvent = async (req, res) => {
  const data = req.body;
  const dateStart = new Date(parseInt(data.start));
  dateStart.setTime(
    dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  data.start = dateStart;

  const dateEnd = new Date(parseInt(data.end));
  dateEnd.setTime(
    dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );

  data.end = dateEnd;
  Event.findOne({
    $and: [
      {
        "location.latLng.lng": data.location.latLng.lng,
        "location.latLng.lat": data.location.latLng.lat,
        start: {
          $gte: data.start
        },
        end: {
          $lte: data.end
        }
      }
    ]
  })
    .then(document => {
      if (document) {
        res.status(500).json({
          success: false,
          message: "An Event already exist at this venue on this day"
        });
      } else {
        Event.create(data)
          .then(event => {
            res.status(200).json({
              success: true,
              event
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: "An Error Occured, please try again later"
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Internal error accured"
      });
    });
};

controller.getAllEvents = async (req, res) => {
  Event.find({})
    .then(events => {
      res.json({ success: true, events });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "An Error Occured, please try again later"
      });
    });
};

controller.getAllEventsByUserId = async (req, res) => {
  if (req.params.user_id) {
    Event.find({ user_id: req.params.user_id })
      .then(events => {
        res.status(200).json({ success: true, events });
      })
      .catch(err => {
        res.status(500).json({ msg: "failed" });
      });
  } else {
    res.status(400).json({
      success: false,
      msg: "Invalid request"
    });
  }
};

module.exports = controller;

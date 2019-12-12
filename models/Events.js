const mongoose = require("mongoose");

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    end: { type: Date, required: true },
    start: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Events", EventSchema);

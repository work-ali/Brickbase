const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_created: { type: String },
  date_modified: { type: String }
});

module.exports = mongoose.model("Users", UserSchema);

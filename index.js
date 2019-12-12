const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/code-test", {
  useNewUrlParser: true
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/events", eventRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Application listening in port ", PORT));

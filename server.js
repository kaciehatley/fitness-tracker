const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

app.post("/api/workouts", ({body}, res) => {
  const workout = new Workout(body);

  Workout.create(workout)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
      console.log("Here it is: " + dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// HTML Routes
const path = require("path");


app.get("/", function(req, res) {
  console.log("homeeeee");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/exercise", function(req, res) {
  console.log("exerciseee");
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});
app.get("/stats", function(req, res) {
  console.log("statsssss");
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
// API Routes 

const Workout = require("../models/workout");

module.exports= function(app) {
app.post("/api/workouts", (req, res) => {
    Workout.create({})
      .then(workoutdata => {
        res.json(workoutdata);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(dbworkout => {
        res.json(dbworkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then(dbworkout => {
        res.json(dbworkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body }})
        .then(exerciseData => res.json(exerciseData))
        .catch(error => {
            console.log("error", error)
            res.json(error)
        })
  });

}
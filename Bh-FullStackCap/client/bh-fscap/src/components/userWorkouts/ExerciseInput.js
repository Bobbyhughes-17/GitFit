import React, { useState } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import "./Log.css";

const ExerciseInput = ({ exercise, onLogWorkout, loggedWorkout }) => {
  console.log(loggedWorkout);
  const [weekNumber, setWeekNumber] = useState(1);
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [weight, setWeight] = useState(0);
  const [allSets, setAllSets] = useState([]);

  const handleLog = () => {
    const newSet = {
      exerciseId: exercise.exerciseID,
      weekNumber,
      sets,
      reps,
      weight,
    };
    setAllSets([...allSets, newSet]);
    onLogWorkout(newSet);
  };

  return (
    <div className="card my-3 p-3">
      <h5 className="mb-3">{exercise.exerciseName}</h5>
      <div className="row">
        <FormGroup className="col-md-3">
          <Label for="WeekNumber">Week Number</Label>
          <Input
            type="number"
            name="WeekNumber"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-md-3">
          <Label for="Sets">Set Number</Label>
          <Input
            type="number"
            name="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-md-3">
          <Label for="Reps">Reps</Label>
          <Input
            type="number"
            name="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-md-3">
          <Label for="Weight">Weight</Label>
          <Input
            type="number"
            name="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </FormGroup>
      </div>
      <Button onClick={handleLog} className="mt-2">
        Log Workout for {exercise.exerciseName}
      </Button>
    </div>
  );
};
export default ExerciseInput;

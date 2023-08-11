import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addUserWorkout,
  getAllUserWorkoutsByUserId,
} from "../../Managers/UserWorkoutsManager";
import { getWorkoutSplitById } from "../../Managers/WorkoutSplitManager";
import { Container, Button } from "reactstrap";
import ExerciseInput from "./ExerciseInput";
import "./Log.css";

export const DailyLog = () => {
  const { splitId } = useParams();
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);
  const [exercisesForSplit, setExercisesForSplit] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const defaultWorkoutForm = {
    UserID: JSON.parse(localStorage.getItem("userProfile")).id,
    SplitID: splitId,
    ExerciseID: "",
    DatePerformed: new Date().toISOString().split("T")[0],
    WeekNumber: 1,
    Sets: 1,
    Reps: 1,
    Weight: 0,
  };

  useEffect(() => {
    refreshLoggedWorkouts();
    fetchExercisesForSplit();
  }, [splitId, currentWeek, selectedDate]);

  const refreshLoggedWorkouts = () => {
    const userId = defaultWorkoutForm.UserID;
    getAllUserWorkoutsByUserId(userId)
      .then(setLoggedWorkouts)
      .catch((error) =>
        console.error("Error fetching detailed workouts:", error)
      );
  };

  const fetchExercisesForSplit = () => {
    if (!splitId) return;

    getWorkoutSplitById(splitId)
      .then((workoutSplit) => {
        setExercisesForSplit(workoutSplit.workoutDetails);
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  };

  const handleLogWorkout = ({ exerciseId, weekNumber, sets, reps, weight }) => {
    const workoutData = {
      ...defaultWorkoutForm,
      ExerciseID: exerciseId,
      WeekNumber: currentWeek,
      Sets: parseInt(sets),
      Reps: parseInt(reps),
      Weight: parseInt(weight),
    };

    addUserWorkout(workoutData).then(() => {
      refreshLoggedWorkouts();
    });
  };
  const exercisesForCurrentDay = exercisesForSplit.filter(
    (exercise) => exercise.dayOfWeek === currentDay
  );

  const goToNextWorkout = () => {
    const uniqueDays = [...new Set(exercisesForSplit.map((e) => e.dayOfWeek))];

    const currentDayIndex = uniqueDays.indexOf(currentDay);
    if (currentDayIndex < uniqueDays.length - 1) {
      setCurrentDay(uniqueDays[currentDayIndex + 1]);
    } else {
      setCurrentDay(uniqueDays[0]);
    }
  };
  const handleNavigation = () => {
    navigate("/logged-workouts");
  };
  return (
    <Container className="daily-log mt-4 text-center">
      <h4 className="mb-4">Log Your Workout for Day {currentDay}</h4>
      <Button className="mb-4" color="primary" onClick={handleNavigation}>
        Logged Workouts
      </Button>
      <Button className="mb-4" color="primary" onClick={goToNextWorkout}>
        Next Workout
      </Button>

      <div className="exercise-list">
        {exercisesForCurrentDay.map((exercise) => {
          const loggedWorkoutForExercise = loggedWorkouts.find(
            (workout) => workout.exerciseID === exercise.exerciseID
          );

          return (
            <ExerciseInput
              key={exercise.id}
              exercise={exercise}
              onLogWorkout={handleLogWorkout}
              loggedWorkout={loggedWorkoutForExercise}
            />
          );
        })}
      </div>

      <Button className="mt-4 mb-2" color="primary" onClick={goToNextWorkout}>
        Next Workout
      </Button>

      <h5 className="mt-4">Logged Workouts</h5>
      <ul className="list-unstyled">
        {loggedWorkouts.map((workout) => (
          <li key={workout.Id} className="my-2">
            <strong>Exercise:</strong> {workout.exerciseName},
            <strong>Split:</strong> {workout.splitName},<strong>Date:</strong>{" "}
            {new Date(workout.datePerformed).toLocaleDateString()},
            <strong>Sets:</strong> {workout.sets},<strong>Reps:</strong>{" "}
            {workout.reps},<strong>Weight:</strong> {workout.weight} lbs
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default DailyLog;

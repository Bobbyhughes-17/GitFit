import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import { UserProfile } from "./userProfiles/UserProfile";
import { UserProfileEdit } from "./userProfiles/UserProfileEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import { WorkoutSplits } from "./workoutSplits/WorkoutSplitList";
import { WorkoutSplitDetails } from "./workoutSplits/WorkoutSplitDetails";
import MuscleGroupsList from "./exercises/MuscleGroupsList";
import { ExercisesList } from "./exercises/ExercisesList";
import { AddSplitDetails } from "./workoutSplits/AddSplitDetails";
import { AddWorkoutSplits } from "./workoutSplits/AddWorkoutSplit";


export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/userProfile/:id" element={<UserProfile />} />
      <Route path="/userprofile/edit/:id" element={<UserProfileEdit />} />
      <Route path="/register" element={<Register />} />
      <Route path="/WorkoutSplit" element={<WorkoutSplits />} />
      <Route path="/WorkoutSplit/:id" element={<WorkoutSplitDetails />} />
      <Route path="/info" element={<MuscleGroupsList />} />
      <Route path="/exercise/:muscleGroupId" element={<ExercisesList />} />
      <Route path="/api/WorkoutSplit/addSplit" element={<AddWorkoutSplits />} />
      <Route path="/WorkoutDetails/:splitId" element={<AddSplitDetails /> } />
    </Routes>
  );
}

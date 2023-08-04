import React, { useState } from "react";

export const AddExerciseForm = ({ muscleGroupId, onAddExercise }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExercise = {
      exerciseName,
      description,
      muscleGroupId,
    };
    onAddExercise(newExercise);
    setExerciseName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Exercise Name:</label>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

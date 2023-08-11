import React, { useState } from "react";
import "./Muscles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <form onSubmit={handleSubmit} className="exercise-form">
      <div className="input-group">
        <label>Exercise Name:</label>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

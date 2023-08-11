import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./Muscles.css";

export const EditExerciseForm = ({ exercise, onUpdateExercise }) => {
  const [updatedExercise, setUpdatedExercise] = useState(exercise);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...updatedExercise };
    stateToChange[evt.target.id] = evt.target.value;
    setUpdatedExercise(stateToChange);
  };

  const saveUpdatedExercise = (evt) => {
    evt.preventDefault();
    if (updatedExercise.exerciseName && updatedExercise.description) {
      onUpdateExercise(updatedExercise);
    } else {
      alert("Please fill in all fields");
    }
  };

  useEffect(() => {
    setUpdatedExercise(exercise);
  }, [exercise]);

  return (
    <form>
      <input
        className="form-input"
        type="text"
        id="exerciseName"
        onChange={handleFieldChange}
        value={updatedExercise.exerciseName}
      />
      <textarea
        className="form-input"
        id="description"
        onChange={handleFieldChange}
        value={updatedExercise.description}
      />
      <Button type="submit" onClick={saveUpdatedExercise}>
        <FontAwesomeIcon icon={faEdit} /> Update
      </Button>
    </form>
  );
};

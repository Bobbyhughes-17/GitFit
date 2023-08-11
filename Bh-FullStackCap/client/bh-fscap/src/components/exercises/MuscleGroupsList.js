import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMuscleGroups } from "../../Managers/ExerciseManager";
import "./Muscles.css";
const MuscleGroupsList = () => {
  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    getAllMuscleGroups().then((data) => setMuscleGroups(data));
  }, []);

  return (
    <div className="muscle-groups-container">
      <h2>Muscle Groups</h2>
      <div className="muscle-groups-grid">
        {muscleGroups.map((muscleGroup) => (
          <Link
            to={`/exercise/${muscleGroup.id}`}
            key={muscleGroup.id}
            className="muscle-group-card"
          >
            <span>{muscleGroup.muscleGroupName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MuscleGroupsList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMuscleGroups } from "../../Managers/ExerciseManager";

const MuscleGroupsList = () => {
  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    getAllMuscleGroups().then((data) => setMuscleGroups(data));
  }, []);

  return (
    <div>
      <h2>Muscle Groups</h2>
      <ul>
        {muscleGroups.map((muscleGroup) => (
          <li key={muscleGroup.id}>
            <Link to={`/exercise/${muscleGroup.id}`}>
              {muscleGroup.muscleGroupName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MuscleGroupsList;

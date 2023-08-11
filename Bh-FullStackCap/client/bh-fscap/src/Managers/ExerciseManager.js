const apiUrl = "https://localhost:5001";

export const getAllMuscleGroups = () => {
  return fetch(`${apiUrl}/api/MuscleGroup`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching all muscle groups:", error);
    });
};

export const getMuscleGroupById = (id) => {
  return fetch(`${apiUrl}/api/MuscleGroup/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching muscle group by ID:", error);
    });
};

export const getAllExercises = () => {
  return fetch(`${apiUrl}/api/Exercise`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching all exercises:", error);
    });
};

export const getExerciseById = (id) => {
  return fetch(`${apiUrl}/api/Exercise/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching exercise by ID:", error);
    });
};

export const getExercisesByMuscleGroupId = (muscleGroupId) => {
  return fetch(`${apiUrl}/api/exercise/muscleGroup/${muscleGroupId}`).then(
    (response) => response.json()
  );
};

export const addExercise = (exerciseData) => {
  return fetch(`${apiUrl}/api/Exercise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseData),
  });
};

export const updateExercise = (id, exercise) => {
  return fetch(`${apiUrl}/api/Exercise/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  }).catch((error) => {
    console.error("Error updating exercise:", error);
  });
};

export const deleteExercise = (id) => {
  return fetch(`${apiUrl}/api/Exercise/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error deleting exercise:", error);
  });
};

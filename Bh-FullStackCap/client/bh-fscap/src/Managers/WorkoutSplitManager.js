const apiUrl = "https://localhost:5001";

export const getAllWorkoutDetails = () => {
  return fetch(`${apiUrl}/api/WorkoutDetails`);
};

export const getUserWorkoutSplitsByUserId = (userId) => {
  return fetch(`${apiUrl}/api/workoutSplit/userWorkoutSplits/${userId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export const getAllWorkoutSplitDetails = (id) => {
  return fetch(`${apiUrl}/api/WorkoutSplit/${id}/details`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getWorkoutDetailsById = (Id) => {
  return fetch(`${apiUrl}/api/WorkoutDetails/${Id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching workout details:", error);
    });
};

export const addWorkoutDetails = (workoutDetails) => {
  return fetch(`${apiUrl}/api/WorkoutDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutDetails),
  });
};

export const updateWorkoutDetails = (workoutDetails) => {
  return fetch(`${apiUrl}/api/WorkoutSplit/edit/${workoutDetails.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutDetails),
  });
};

export const deleteWorkoutDetails = (id) => {
  return fetch(`${apiUrl}/api/WorkoutDetails/${id}`, {
    method: "DELETE",
  });
};

export const getAllWorkoutSplits = () => {
  return fetch(`${apiUrl}/api/WorkoutSplit`).then((response) =>
    response.json()
  );
};

export const getWorkoutSplitById = (id) => {
  if (!id) {
    throw new Error("id is undefined");
  }
  return fetch(`${apiUrl}/api/workoutSplit/${id}`).then((response) =>
    response.json()
  );
};

export const updateWorkoutSplit = (Id, workoutSplitData) => {
  return fetch(`${apiUrl}/api/WorkoutSplit/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutSplitData),
  });
};

export const deleteWorkoutSplit = (Id) => {
  return fetch(`${apiUrl}/api/WorkoutSplit/${Id}`, {
    method: "DELETE",
  });
};

export const addWorkoutSplit = (workoutSplit) => {
  return fetch(`${apiUrl}/api/WorkoutSplit/addSplit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutSplit),
  });
};

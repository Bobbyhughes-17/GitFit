const apiUrl = "https://localhost:5001";

export const getUserWorkoutById = (id) => {
  return fetch(`${apiUrl}/api/UserWorkout/${id}`);
};

export const addUserWorkout = (userWorkout) => {
  return fetch(`${apiUrl}/api/UserWorkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userWorkout),
  });
};

export const updateUserWorkout = (id, userWorkout) => {
  return fetch(`${apiUrl}/api/UserWorkout/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userWorkout),
  });
};

export const deleteUserWorkout = (id) => {
  return fetch(`${apiUrl}/api/UserWorkout/${id}`, {
    method: "DELETE",
  });
};

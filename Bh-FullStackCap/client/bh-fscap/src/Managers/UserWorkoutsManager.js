const apiUrl = "https://localhost:5001";

export const getAllUserWorkoutsByUserId = (userId) => {
  return fetch(`${apiUrl}/api/UserWorkout/user/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was an error fetching the data:", error);
    });
};

export const getUserWorkoutByDate = (userId, datePerformed) => {
  return fetch(`${apiUrl}/api/UserWorkout/user/${userId}/date/${datePerformed}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Failed to retrieve user's workout for the specific date"
        );
      }
    })
    .catch((error) => {
      console.error("Error in getUserWorkoutByDate:", error);
      throw error;
    });
};

export const addUserWorkout = (userWorkout) => {
  return fetch(`${apiUrl}/api/UserWorkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userWorkout),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errText) => {
          throw new Error("Network response was not ok: " + errText);
        });
      }
      return response.json();
    })

    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
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

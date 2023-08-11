const apiUrl = "https://localhost:5001/api/UserSplit";

export const getAllByUserId = (userId) => {
  return fetch(`${apiUrl}/user/${userId}`).then((res) => res.json());
};

export const getById = (id) => {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};
export const addUserSplit = (userId, splitId) => {
  return fetch(`${apiUrl}/api/userSplit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, splitId }),
  });
};
export const updateUserSplit = (id, userSplit) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userSplit),
  }).then((res) => res.json());
};

export const deleteUserSplit = (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
};

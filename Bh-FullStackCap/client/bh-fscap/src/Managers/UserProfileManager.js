const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
    .then((userProfile) => {
      if (userProfile && userProfile.id && userProfile.isActive) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile;
      } else {
        throw new Error("Invalid email or account deactivated");
      }
    })
    .catch((error) => {
      throw new Error("Invalid email or account deactivated");
    });
};

export const logout = () => {};

export const getUserStatus = (email) => {
  return fetch(`${apiUrl}/api/UserProfile/GetByEmail?email=${email}`).then(
    (res) => res.json()
  );
};

export const register = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
    .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
    });
};

export const getAllUserProfiles = () => {
  return fetch(`${apiUrl}/api/UserProfile`).then((response) => response.json());
};

export const getUserProfileById = (id) => {
  if (!id) {
    throw new Error("User ID is undefined");
  }
  return fetch(`${apiUrl}/api/UserProfile/${id}`).then((response) =>
    response.json()
  );
};

export const editUserProfile = (userProfile) => {
  return fetch(`${apiUrl}/api/userprofile/edit/${userProfile.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  });
};

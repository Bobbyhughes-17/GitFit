import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  editUserProfile,
  getUserProfileById,
} from "../../Managers/UserProfileManager";

export const UserProfileEdit = () => {
  const [editedUserProfile, setEditedUserProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfileById(id).then(setEditedUserProfile);
  }, [id]);

  const handleInputChange = (event) => {
    // create new copy of the editedUserProfile with the updated value from the input
    const newProfile = { ...editedUserProfile };
    newProfile[event.target.id] = event.target.value;

    // update the state with the new user data
    setEditedUserProfile(newProfile);
  };

  const handleSave = () => {
    editUserProfile(editedUserProfile).then(() =>
      navigate(`/userprofile/${editedUserProfile.id}`)
    );
  };

  if (!editedUserProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Form>
      <FormGroup>
        <Label for="displayName">Display Name</Label>
        <Input
          type="text"
          id="displayName"
          onChange={handleInputChange}
          value={editedUserProfile.displayName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          id="name"
          onChange={handleInputChange}
          value={editedUserProfile.fullName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="maxBench">Max Bench </Label>
        <Input
          type="text"
          id="maxBench"
          onChange={handleInputChange}
          value={editedUserProfile.maxBench}
        />
      </FormGroup>
      <FormGroup>
        <Label for="maxSquat">Max Squat</Label>
        <Input
          type="text"
          id="maxSquat"
          onChange={handleInputChange}
          value={editedUserProfile.maxSquat}
        />
      </FormGroup>
      <FormGroup>
        <Label for="maxDeadlift">Max Deadlift</Label>
        <Input
          type="text"
          id="maxDeadlift"
          onChange={handleInputChange}
          value={editedUserProfile.maxDeadlift}
        />
      </FormGroup>

      <Button onClick={handleSave}>Save</Button>
    </Form>
  );
};

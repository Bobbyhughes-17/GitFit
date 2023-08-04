import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [maxBench, setMaxBench] = useState();
  const [maxSquat, setMaxSquat] = useState();
  const [maxDeadlift, setMaxDeadlift] = useState();
  const [userWeight, setUserWeight] = useState();
  const [userHeight, setUserHeight] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (!email || !displayName) {
      alert("Please fill out all required fields.");
      return;
    }

    const userProfile = {
      displayName,
      fullName,
      email,
      imageLocation,
      maxBench,
      maxSquat,
      maxDeadlift,
      userWeight,
      userHeight,
    };
    console.log(userProfile);
    register(userProfile)
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="displayName">Username</Label>
          <Input
            id="displayName"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input
            id="imageLocation"
            type="text"
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="maxBench">Max Bench</Label>
          <Input
            id="maxBench"
            type="text"
            onChange={(e) => setMaxBench(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="maxSquat">max squat</Label>
          <Input
            id="maxSquat"
            type="text"
            onChange={(e) => setMaxSquat(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="maxDeadlift">Max Deadlift</Label>
          <Input
            id="password"
            type="text"
            onChange={(e) => setMaxDeadlift(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="userWeight">weight</Label>
          <Input
            id="userWeight"
            type="test"
            onChange={(e) => setUserWeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="userHeight">height</Label>
          <Input
            id="userHeight"
            type="text"
            onChange={(e) => setUserHeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  Modal,
  ModalFooter,
  ModalBody,
  Tooltip,
} from "reactstrap";
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
  const [tooltipOpenBench, setTooltipOpenBench] = useState(false);
  const toggleBench = () => setTooltipOpenBench(!tooltipOpenBench);

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
        navigate("/info");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <Form onSubmit={registerClick}>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Personal Details</CardTitle>
          <FormGroup>
            <Label htmlFor="displayName">Username</Label>
            <Input
              id="displayName"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your username"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fullName">Name</Label>
            <Input
              id="fullName"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="imageLocation">Profile Image URL</Label>
            <Input
              id="imageLocation"
              type="text"
              onChange={(e) => setImageLocation(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <CardTitle>Fitness Information</CardTitle>

          <FormGroup>
            <Label htmlFor="maxBench" id="maxBenchTooltip">
              Max Bench
            </Label>
            <Tooltip
              target="maxBenchTooltip"
              isOpen={tooltipOpenBench}
              toggle={toggleBench}
              placement="right"
            >
              Your maximum bench press weight indicates the heaviest weight you
              can lift in one repetition. It's often used as a benchmark for
              upper body strength.
            </Tooltip>
            <Input
              id="maxBench"
              type="text"
              onChange={(e) => setMaxBench(e.target.value)}
              placeholder="Enter your max bench weight"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="maxSquat" id="maxSquatTooltip">
              Max Squat
            </Label>
            <Tooltip target="maxSquatTooltip" placement="right">
              Your maximum squat weight reflects the heaviest weight you can
              squat down and stand up with in one repetition. This exercise
              gauges the strength of your lower body, primarily your quads and
              glutes.
            </Tooltip>
            <Input
              id="maxSquat"
              type="text"
              onChange={(e) => setMaxSquat(e.target.value)}
              placeholder="Enter your max squat weight"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="maxDeadlift" id="maxDeadliftTooltip">
              Max Deadlift
            </Label>
            <Tooltip target="maxDeadliftTooltip" placement="right">
              Your maximum deadlift weight is the heaviest weight you can lift
              off the ground to a standing position in one go. This lift tests
              the strength of your back, glutes, and hamstrings, and it's a good
              measure of overall strength.
            </Tooltip>
            <Input
              id="maxDeadlift"
              type="text"
              onChange={(e) => setMaxDeadlift(e.target.value)}
              placeholder="Enter your max deadlift weight"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userHeight">Height: </Label>
            <Input
              id="userHeight"
              type="number"
              onChange={(e) => setUserHeight(e.target.value)}
              placeholder="Enter your height here"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userWeight">Weight: </Label>
            <Input
              id="userWeight"
              type="number"
              onChange={(e) => setUserWeight(e.target.value)}
              placeholder="Enter your weight in lbs"
            />
          </FormGroup>
        </CardBody>
      </Card>

      <FormGroup className="text-center">
        <Button size="lg">Register</Button>
      </FormGroup>
    </Form>
  );
}

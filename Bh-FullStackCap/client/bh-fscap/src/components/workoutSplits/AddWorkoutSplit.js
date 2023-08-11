import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { addWorkoutSplit } from "../../Managers/WorkoutSplitManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faListAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export const AddWorkoutSplits = () => {
  const [splitName, setSplitName] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [splitDescription, setSplitDescription] = useState("");
  const navigate = useNavigate();

  const handleAddWorkoutSplit = () => {
    const newWorkoutSplit = {
      splitName: splitName,
      daysPerWeek: daysPerWeek,
      splitDescription: splitDescription,
    };

    addWorkoutSplit(newWorkoutSplit).then(() => {
      navigate("/WorkoutSplit");
    });
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle>Add a New Workout Split</CardTitle>
          <Form>
            <FormGroup>
              <Label for="splitName">
                <FontAwesomeIcon icon={faEdit} /> Split Name
              </Label>
              <Input
                type="text"
                name="splitName"
                id="splitName"
                value={splitName}
                onChange={(e) => setSplitName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="daysPerWeek">
                <FontAwesomeIcon icon={faCalendarAlt} /> Days Per Week
              </Label>
              <Input
                type="number"
                name="daysPerWeek"
                id="daysPerWeek"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="splitDescription">
                <FontAwesomeIcon icon={faListAlt} /> Description
              </Label>
              <Input
                type="textarea"
                name="splitDescription"
                id="splitDescription"
                value={splitDescription}
                onChange={(e) => setSplitDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
          <Button onClick={handleAddWorkoutSplit}>Add Split</Button>
        </CardBody>
      </Card>
    </Container>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { addWorkoutSplit } from '../../Managers/WorkoutSplitManager';

export const AddWorkoutSplits = () => {
  const [splitName, setSplitName] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const navigate = useNavigate();

  const handleAddWorkoutSplit = () => {
    const newWorkoutSplit = {
      splitName: splitName,
      daysPerWeek: daysPerWeek
    };

    addWorkoutSplit(newWorkoutSplit)
      .then((response) => {
        navigate("/WorkoutSplit");
      })
      .catch((error) => {
        console.error('Error adding workout split:', error);
      });
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle>Add a New Workout Split</CardTitle>
          <Form>
            <FormGroup>
              <Label for="splitName">Split Name</Label>
              <Input
                type="text"
                name="splitName"
                id="splitName"
                value={splitName}
                onChange={(e) => setSplitName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="daysPerWeek">Days Per Week</Label>
              <Input
                type="number"
                name="daysPerWeek"
                id="daysPerWeek"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
              />
            </FormGroup>
          </Form>
          <Button onClick={handleAddWorkoutSplit}>Add Split</Button>
        </CardBody>
      </Card>
    </Container>
  );
};



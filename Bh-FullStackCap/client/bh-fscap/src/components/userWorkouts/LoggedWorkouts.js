import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import { getAllUserWorkoutsByUserId } from "../../Managers/UserWorkoutsManager";
import "./Log.css";

export const LoggedWorkouts = () => {
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);
  const currentUserId = JSON.parse(localStorage.getItem("userProfile")).id;

  const fetchData = async () => {
    const data = await getAllUserWorkoutsByUserId(currentUserId);
    // sort the data by date
    const sortedData = [...data].sort(
      (a, b) => new Date(a.datePerformed) - new Date(b.datePerformed)
    );

    // sort by date and exerciseId
    const groupedData = sortedData.reduce((acc, workout) => {
      const date = workout.datePerformed;
      if (!acc[date]) acc[date] = {};
      const exerciseId = workout.exerciseID;
      if (!acc[date][exerciseId]) acc[date][exerciseId] = [];
      acc[date][exerciseId].push(workout);
      return acc;
    }, {});

    setLoggedWorkouts(groupedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // formats the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <Container className="logged-container">
      {Object.keys(loggedWorkouts).map((date) => (
        <Card className="mb-4" key={date}>
          <CardBody>
            <CardTitle className="card-date-title">
              <strong>{formatDate(date)}</strong> |{" "}
              <strong>
                Week:{" "}
                {
                  loggedWorkouts[date][Object.keys(loggedWorkouts[date])[0]][0]
                    .weekNumber
                }
              </strong>
            </CardTitle>

            {Object.keys(loggedWorkouts[date]).map((exerciseId) => (
              <div key={exerciseId}>
                <div className="card-exercise-title">
                  <strong>Exercise: </strong>{" "}
                  {loggedWorkouts[date][exerciseId][0].exerciseName}
                </div>
                <ListGroup>
                  {loggedWorkouts[date][exerciseId].map((workoutDetail) => (
                    <ListGroupItem key={workoutDetail.id}>
                      <Row>
                        <Col xs="4">
                          <strong>Set:</strong> {workoutDetail.sets}
                        </Col>
                        <Col xs="4">
                          <strong>Reps: </strong> {workoutDetail.reps}
                        </Col>
                        <Col xs="4">
                          <strong>Weight:</strong> {workoutDetail.weight} lbs
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default LoggedWorkouts;

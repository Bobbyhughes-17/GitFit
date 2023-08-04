import React, { useState, useEffect } from "react";
import { getWorkoutSplitById } from "../../Managers/WorkoutSplitManager";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteWorkoutDetails } from "../../Managers/WorkoutSplitManager";

export const WorkoutSplitDetails = () => {
  const [workoutSplit, setWorkoutSplit] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupedWorkoutDetails, setGroupedWorkoutDetails] = useState({});

  useEffect(() => {
    getWorkoutSplitById(id).then(setWorkoutSplit);
  }, [id]);

  useEffect(() => {
    // Group workout details by day of week to create tabs for each day
    const groupedDetails = {};
    if (workoutSplit) {
      workoutSplit.workoutDetails.forEach((exercise) => {
        if (!groupedDetails[exercise.dayOfWeek]) {
          groupedDetails[exercise.dayOfWeek] = [];
        }
        groupedDetails[exercise.dayOfWeek].push(exercise);
      });
      setGroupedWorkoutDetails(groupedDetails);
    }
  }, [workoutSplit]);

  if (!workoutSplit) {
    return <div>Loading...</div>;
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleGoBack = () => {
    navigate("/workoutSplit");
  };

  const handleDeleteWorkoutDetails = () => {
    const workoutDetailId = workoutSplit.id;
    deleteWorkoutDetails(workoutDetailId)
      .then(() => {
        const updatedGroupedWorkoutDetails = { ...groupedWorkoutDetails };
        delete updatedGroupedWorkoutDetails[activeTab];
        setGroupedWorkoutDetails(updatedGroupedWorkoutDetails);
        console.log("Workout detail deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting workout detail:", error);
      });
  };

  return (
    <div className="card-container">
      <Card className="m-4 text-center wo-profile-card">
        <CardBody>
          <Button onClick={handleGoBack}>Close</Button>
          <div>
            <strong>Split Name:</strong> {workoutSplit.splitName}
            <br />
            <strong>Days Per Week:</strong> {workoutSplit.daysPerWeek}
          </div>
          <hr />
          <div>
            <h5>Workout Details:</h5>
            <Nav tabs>
              {Object.keys(groupedWorkoutDetails).map((day) => (
                <NavItem key={day}>
                  <NavLink
                    href="#"
                    active={activeTab === day}
                    onClick={() => toggleTab(day)}
                  >
                    Day {day}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {Object.keys(groupedWorkoutDetails).map((day) => (
                <TabPane key={day} tabId={day}>
                  {groupedWorkoutDetails[day].map((exercise) => (
                    <div key={exercise.id}>
                      <strong>Exercise Name:</strong> {exercise.exerciseName}
                      <br />
                      <strong>Description:</strong> {exercise.description}
                      <br />
                      <strong>Sets:</strong> {exercise.sets}
                      <br />
                      <strong>Reps:</strong> {exercise.reps}
                      <br />
                      <Button
                        color="danger"
                        onClick={() => handleDeleteWorkoutDetails(exercise.id)}
                      >
                        Delete Exercise
                      </Button>
                      <hr />
                    </div>
                  ))}
                </TabPane>
              ))}
            </TabContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

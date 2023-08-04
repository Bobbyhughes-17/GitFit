import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  getExercisesByMuscleGroupId,
  getMuscleGroupById,
  addExercise,
} from "../../Managers/ExerciseManager";
import { AddExerciseForm } from "./AddExerciseForm";

export const ExercisesList = () => {
  const { muscleGroupId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [muscleGroupName, setMuscleGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // fetch exercises and muscle group data when "muscleGroupId" changes
  useEffect(() => {
    // fetch exercises for specific muscle groups
    getExercisesByMuscleGroupId(muscleGroupId).then(setExercises);

    // fetch details of muscle groups with id
    getMuscleGroupById(muscleGroupId).then((muscleGroup) => {
      //if muscle group exists update the state with its name
      setMuscleGroupName(muscleGroup?.muscleGroupName || "");
    });
  }, [muscleGroupId]);

  // if exercises array is empty show loading message
  if (!exercises.length) {
    return <div>Loading...</div>;
  }

  const handleBackButtonClick = () => {
    navigate("/info");
  };

  const handleAddExercise = (exercise) => {
    addExercise(exercise)
      .then((newExercise) => {
        setExercises([...exercises, newExercise]);
        console.log("Exercise added successfully");
        getExercisesByMuscleGroupId(muscleGroupId).then(setExercises);
        toggleModal();
      })
      .catch((error) => {
        console.error("Error adding exercise:", error);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <h2>Exercises for {muscleGroupName}</h2>
      <Button color="primary" onClick={handleBackButtonClick}>
        Go Back
      </Button>
      <Button color="success" onClick={toggleModal}>
        Add Exercise
      </Button>
      <div className="d-flex flex-wrap">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="col-md-4 mb-4">
            <Card style={{ height: "100%" }}>
              <CardBody>
                <CardTitle>
                  <strong>{exercise.exerciseName}</strong>
                </CardTitle>
                <CardText>{exercise.description}</CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Exercise</ModalHeader>
        <ModalBody>
          <AddExerciseForm
            muscleGroupId={muscleGroupId}
            onAddExercise={handleAddExercise}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

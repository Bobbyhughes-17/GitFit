import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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
  updateExercise,
  deleteExercise,
} from "../../Managers/ExerciseManager";
import { AddExerciseForm } from "./AddExerciseForm";
import "./Muscles.css";
import { EditExerciseForm } from "./EditExerciseForm";

export const ExercisesList = () => {
  const { muscleGroupId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
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

  const handleDeleteExercise = (id) => {
    deleteExercise(id)
      .then(() => {
        const newExercisesList = exercises.filter(
          (exercise) => exercise.id !== id
        );
        setExercises(newExercisesList);
        console.log("Exercise deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting exercise:", error);
      });
  };
  const handleUpdateExercise = (updatedExercise) => {
    updateExercise(updatedExercise)
      .then(() => {
        const updatedExercisesList = exercises.map((exercise) =>
          exercise.id === updatedExercise.id ? updatedExercise : exercise
        );
        setExercises(updatedExercisesList);
        console.log("Exercise updated successfully");
        toggleEditModal();
      })
      .catch((error) => {
        console.error("Error updating exercise:", error);
      });
  };
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditExercise = (exercise) => {
    setExerciseToEdit(exercise);
    toggleEditModal();
  };

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
    <div className="exercises-container">
      <h2>Exercises for {muscleGroupName}</h2>
      <Button color="primary" onClick={handleBackButtonClick}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>

      <Button color="success" onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <div className="exercises-grid">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="exercise-card">
            <CardBody>
              <CardTitle>
                <strong>{exercise.exerciseName}</strong>
              </CardTitle>
              <CardText>{exercise.description}</CardText>
            </CardBody>
            <div>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => handleEditExercise(exercise)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteExercise(exercise.id)}
              />
            </div>
          </Card>
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
      <Modal
        className="custom-modal"
        isOpen={editModalOpen}
        toggle={toggleEditModal}
      >
        <ModalHeader toggle={toggleEditModal}>Edit Exercise</ModalHeader>
        <ModalBody>
          {exerciseToEdit && (
            <EditExerciseForm
              exercise={exerciseToEdit}
              onUpdateExercise={handleUpdateExercise}
            />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

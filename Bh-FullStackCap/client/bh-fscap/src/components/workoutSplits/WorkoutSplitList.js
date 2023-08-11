import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { getAllWorkoutSplits } from "../../Managers/WorkoutSplitManager";
import { addUserSplit } from "../../Managers/UserSplitManager";
import "./Split.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEye,
  faInfoCircle,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

export const WorkoutSplits = ({ loggedInUser }) => {
  console.log("loggedInUser:", loggedInUser);

  const [workoutSplits, setWorkoutSplits] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkoutSplits().then(setWorkoutSplits);
  }, []);

  const selectSplit = (id) => {
    if (!loggedInUser || !loggedInUser.id) {
      console.error("loggedInUser or its ID is missing.");
      return;
    }

    const userId = loggedInUser.id;

    addUserSplit(userId, id)
      .then(() => {
        navigate(`userWorkout`);
      })
      .catch((error) => {
        console.error("Error adding split for user:", error);
      });
  };

  const toggleModal = (descriptionOrEvent = "") => {
    if (typeof descriptionOrEvent === "string") {
      setCurrentDescription(descriptionOrEvent);
    } else {
      setCurrentDescription("");
    }
    setModalOpen(!isModalOpen);
  };

  if (!workoutSplits.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-splits-container">
      <div className="container mt-4">
        <Link
          to="/api/WorkoutSplit/addSplit"
          className="btn"
          style={{ backgroundColor: "#ADD8E6" }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Link>

        <div className="row">
          {workoutSplits.map((split) => (
            <div key={split.id} className="col-md-4 mb-4">
              <Card className="h-100">
                <CardBody>
                  <CardTitle tag="h5" className="text-center">
                    <FontAwesomeIcon icon={faDumbbell} /> {split.splitName}
                    <br />
                    <Button
                      color="link"
                      onClick={() => toggleModal(split.splitDescription)}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} /> Description
                    </Button>
                  </CardTitle>
                </CardBody>
                <div className="text-center mb-3">
                  <Link
                    to={`/WorkoutSplit/${split.id}`}
                    className="btn btn-primary"
                    style={{ backgroundColor: "#0000FF" }}
                  >
                    <FontAwesomeIcon icon={faEye} /> Details
                  </Link>
                  <br></br>
                  <Link
                    to={`/WorkoutDetails/${split.id}`}
                    className="btn btn-info"
                    style={{ backgroundColor: "#ADD8E6" }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Add
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Split Description</ModalHeader>
          <ModalBody>{currentDescription}</ModalBody>
        </Modal>
      </div>
    </div>
  );
};

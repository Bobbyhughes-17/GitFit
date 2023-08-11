import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { getUserProfileById } from "../../Managers/UserProfileManager";
import "./UserProfile.css";
import { UserProfileEdit } from "./UserProfileEdit";
import { getUserWorkoutSplitsByUserId } from "../../Managers/WorkoutSplitManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userSplits, setUserSplits] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUserProfile = () => {
    getUserProfileById(id).then(setUserProfile);
  };

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
    getUserWorkoutSplitsByUserId(id).then(setUserSplits);
  }, [id]);

  const handleNavigation = () => {
    navigate("/logged-workouts");
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="userprofile-wrapper">
      <div className="userprofile-left-section">
        <img
          src={userProfile.imageLocation}
          alt="User"
          className="user-profile-image"
        />
        <div className="user-display-name">{userProfile.displayName}</div>

        <div className="user-details">
          <div>
            <strong></strong> <span>{userProfile.fullName}</span>
          </div>
          <div>
            <strong>Training max bench:</strong>{" "}
            <span>{userProfile.maxBench}</span>
          </div>
          <div>
            <strong>Training max squat:</strong>{" "}
            <span>{userProfile.maxSquat}</span>
          </div>
          <div>
            <strong>Training max deadlift:</strong>{" "}
            <span>{userProfile.maxDeadlift}</span>
          </div>
        </div>

        <Button color="primary" onClick={handleNavigation}>
          <FontAwesomeIcon icon={faCircleInfo} />
          View Logs
        </Button>
        <Button
          onClick={() => setIsEditModalOpen(true)}
          className="btn btn-info edit-button"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        toggle={() => setIsEditModalOpen(!isEditModalOpen)}
      >
        <ModalHeader toggle={() => setIsEditModalOpen(!isEditModalOpen)}>
          Edit Profile
        </ModalHeader>
        <ModalBody>
          <UserProfileEdit
            onSaved={() => {
              setIsEditModalOpen(false);
              fetchUserProfile();
            }}
          />
        </ModalBody>
      </Modal>

      <div className="current-training-splits">
        <h4>Training Splits:</h4>
        {userSplits.map((split) => (
          <div key={split.id}>
            <Link to={`/userWorkout/${split.id}`}>{split.splitName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

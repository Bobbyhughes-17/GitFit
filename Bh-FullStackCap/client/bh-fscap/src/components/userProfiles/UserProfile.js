import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getUserProfileById } from "../../Managers/UserProfileManager";
import "./UserProfile.css";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      <Card className="m-4 text-center user-profile-card">
        <CardBody>
          <div className="user-profile-content">
            <img
              src={userProfile.imageLocation}
              alt="User"
              className="user-profile-image"
            />
            <div>
              <strong>Display Name:</strong> {userProfile.displayName}
            </div>
            <div>
              <strong>Name: </strong> {userProfile.fullName}
            </div>
            <div>
              <strong>Training max bench: </strong> {userProfile.maxBench}
            </div>
            <div>
              <strong>Training max squat: </strong> {userProfile.maxSquat}
            </div>
            <div>
              <strong>Training max deadlift: </strong> {userProfile.maxDeadlift}
            </div>
          </div>
        </CardBody>
        <Link
          to={`/userprofile/edit/${userProfile.id}`}
          className="btn btn-info edit-button"
        >
          Edit
        </Link>
      </Card>
    </div>
  );
};

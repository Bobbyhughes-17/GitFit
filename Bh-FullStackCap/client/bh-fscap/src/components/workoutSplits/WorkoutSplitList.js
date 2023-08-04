import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllWorkoutSplits } from "../../Managers/WorkoutSplitManager";

export const WorkoutSplits = () => {
  const [workoutSplits, setWorkoutSplits] = useState([]);

  useEffect(() => {
    getAllWorkoutSplits().then(setWorkoutSplits);
  }, []);

  if (!workoutSplits.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Link to="/api/WorkoutSplit/addSplit" className="btn btn-info">
        add new split
      </Link>
      <div className="row">
        {workoutSplits.map((split) => (
          <div key={split.id} className="col-md-4 mb-4">
            <Card className="h-100">
              <CardBody>
                <CardTitle tag="h5" className="text-center">
                  {split.splitName}
                </CardTitle>
              </CardBody>
              <div className="text-center mb-3">
                <Link
                  to={`/WorkoutSplit/${split.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
                <Link
                  to={`/WorkoutDetails/${split.id}`}
                  className="btn btn-info"
                >
                  add
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

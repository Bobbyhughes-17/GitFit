import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import {
  addWorkoutDetails,
  getAllWorkoutSplits,
  getWorkoutSplitById
} from "../../Managers/WorkoutSplitManager";
import {
  getAllMuscleGroups,
  getExercisesByMuscleGroupId,
} from "../../Managers/ExerciseManager";
import classnames from "classnames";

export const AddSplitDetails = () => {
  const { splitId } = useParams();
  console.log("splitId:", splitId);
  const [workoutDays, setWorkoutDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState({});
  const [selectedExercise, setSelectedExercise] = useState({});
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [orderInDay, setOrderInDay] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [splitName, setSplitName] = useState("");


  const toggle = (tabId) => {
    if (activeTab !== tabId) setActiveTab(tabId);
  };

  useEffect(() => {
    setSelectedDay(workoutDays[parseInt(activeTab) - 1]);
  }, [activeTab, workoutDays]);

  useEffect(() => {
    const fetchWorkoutSplits = async () => {
      try {
        // get all the workout splits and set the state with the data
        const splits = await getAllWorkoutSplits();
        setWorkoutDays(splits);
        const currentSplit = await getWorkoutSplitById(splitId);
        setSplitName(currentSplit.splitName)
      } catch (error) {
        console.error("Error fetching workout splits:", error);
      }
    };

    getAllMuscleGroups()
      .then((data) => setMuscleGroups(data))
      .catch((error) => console.error("Error fetching muscle groups:", error));

    fetchWorkoutSplits();
  }, []);

  const fetchExercisesByMuscleGroup = async (muscleGroupId) => {
    try {
      // get exercises by "muscleGroupId" and set state with the data
      const exercisesData = await getExercisesByMuscleGroupId(muscleGroupId);
      setExercises(exercisesData);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleAddWorkout = () => {
    const newWorkout = {
      splitID: splitId,
      exerciseID: selectedExercise.id,
      dayOfWeek: activeTab,
      orderInDay,
      sets,
      reps,
      weightPercentage: exerciseWeight,
      exerciseName: selectedExercise.exerciseName,
      description: selectedExercise.description,
      muscleGroupId: selectedMuscleGroup.id,
    };

    addWorkoutDetails(newWorkout)
      .then((response) => {
        console.log("Workout added successfully:", response);
        setWorkouts([...workouts, newWorkout]);
      })
      .catch((error) => {
        console.error("Error adding workout:", error);
      });
  };

  return (
    <Container>
      <h2>{splitName}</h2>
      <Nav tabs>
        {workoutDays.map((day, index) => (
          <NavItem key={day.id}>
            <NavLink
              className={classnames({
                active: activeTab === `${index + 1}`,
              })}
              onClick={() => {
                toggle(`${index + 1}`);
              }}
            >
              Day {index + 1}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {workoutDays.map((day, index) => {
          if (!day) return null;
          return (
            <TabPane tabId={`${index + 1}`}>
              <FormGroup>
                <Label for={`muscleGroupDropdown_${day.id}`}>
                  Select Muscle Group
                </Label>
                <Input
                  type="select"
                  name={`muscleGroupDropdown_${day.id}`}
                  id={`muscleGroupDropdown_${day.id}`}
                  value={
                    selectedMuscleGroup && selectedMuscleGroup.id
                      ? selectedMuscleGroup.id
                      : ""
                  }
                  onChange={(e) => {
                    const selectedMuscleGroupId = parseInt(e.target.value, 10);
                    const foundMuscleGroup = muscleGroups.find(
                      (muscleGroup) => muscleGroup.id === selectedMuscleGroupId
                    );
                    setSelectedMuscleGroup(foundMuscleGroup);
                    fetchExercisesByMuscleGroup(selectedMuscleGroupId);
                  }}
                >
                  <option value="">Select a Muscle Group</option>
                  {muscleGroups.map(
                    (muscleGroup) =>
                      muscleGroup && (
                        <option key={muscleGroup.id} value={muscleGroup.id}>
                          {muscleGroup.muscleGroupName}
                        </option>
                      )
                  )}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for={`exerciseDropdown_${day.id}`}>
                  Select Exercise
                </Label>
                <Input
                  type="select"
                  name={`exerciseDropdown_${day.id}`}
                  id={`exerciseDropdown_${day.id}`}
                  value={
                    selectedExercise && selectedExercise.id
                      ? selectedExercise.id
                      : ""
                  }
                  onChange={(e) => {
                    const selectedExerciseId = parseInt(e.target.value, 10);
                    const foundExercise = exercises.find(
                      (exercise) => exercise.id === selectedExerciseId
                    );
                    setSelectedExercise(foundExercise);
                  }}
                >
                  <option value="">Select an Exercise</option>
                  {exercises.map(
                    (exercise) =>
                      exercise && (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.exerciseName}
                        </option>
                      )
                  )}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for={`weightInput_${day.id}`}>Weight Percentage</Label>
                <Input
                  type="number"
                  name={`weightInput_${day.id}`}
                  id={`weightInput_${day.id}`}
                  value={exerciseWeight}
                  onChange={(e) => setExerciseWeight(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for={`orderInDayInput_${day.id}`}>Order In Day</Label>
                <Input
                  type="number"
                  name={`orderInDayInput_${day.id}`}
                  id={`orderInDayInput_${day.id}`}
                  value={orderInDay}
                  onChange={(e) => setOrderInDay(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for={`setsInput_${day.id}`}>Sets</Label>
                <Input
                  type="number"
                  name={`setsInput_${day.id}`}
                  id={`setsInput_${day.id}`}
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for={`repsInput_${day.id}`}>Reps</Label>
                <Input
                  type="number"
                  name={`repsInput_${day.id}`}
                  id={`repsInput_${day.id}`}
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </FormGroup>

              <Button color="primary" onClick={handleAddWorkout}>
                Add Workout
              </Button>
              <ul>
                {workouts.map((workout, index) => (
                  <li key={index}>
                    {`Day ${workout.dayOfWeek}, Exercise ${workout.exerciseName}, sets: ${workout.sets}, reps: ${workout.reps}`}
                  </li>
                ))}
              </ul>
            </TabPane>
          );
        })}
      </TabContent>
    </Container>
  );
};

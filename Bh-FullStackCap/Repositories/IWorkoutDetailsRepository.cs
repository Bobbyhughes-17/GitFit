using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IWorkoutDetailsRepository
    {
        List<WorkoutDetails> GetAllWorkoutDetails();
        WorkoutDetails GetWorkoutDetailsById(int id);
        void AddWorkoutDetails(WorkoutDetails workoutDetails);
        void UpdateWorkoutDetails(WorkoutDetails workoutDetails);
        void DeleteWorkoutDetails(int id);
        List<WorkoutDetails> GetWorkoutSplitDetails(int id);
    }
}

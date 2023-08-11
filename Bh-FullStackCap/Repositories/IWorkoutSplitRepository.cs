using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IWorkoutSplitRepository
    {
        List<WorkoutSplit> GetAllWorkoutSplits();
        List<WorkoutSplit> GetUserWorkoutSplitsByUserId(int userId);
        WorkoutSplit GetWorkoutSplitById(int id);
        void AddWorkoutSplit(WorkoutSplit workoutSplit);
        void UpdateWorkoutSplit(WorkoutSplit workoutSplit);
        void DeleteWorkoutSplit(int id);
      

    }
}

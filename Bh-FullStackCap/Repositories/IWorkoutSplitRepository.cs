using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IWorkoutSplitRepository
    {
        List<WorkoutSplit> GetAllWorkoutSplits();
        WorkoutSplit GetWorkoutSplitById(int id);
        void AddWorkoutSplit(WorkoutSplit workoutSplit);
        void UpdateWorkoutSplit(WorkoutSplit workoutSplit);
        void DeleteWorkoutSplit(int id);
      
    }
}

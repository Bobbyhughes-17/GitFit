using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IExerciseRepository
    {
        List<Exercises> GetAllExercises();
        Exercises GetExerciseById(int id);
        List<Exercises> GetExercisesByMuscleGroupId(int muscleGroupId);
        void AddExercise(Exercises exercise);
        void UpdateExercise(Exercises exercise);
        void DeleteExercise(int id);
    }
}

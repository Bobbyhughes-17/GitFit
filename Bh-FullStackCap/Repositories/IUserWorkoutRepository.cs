using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IUserWorkoutRepository
    {
     
        UserWorkout GetUserWorkoutById(int id);
        void AddUserWorkout(UserWorkout userWorkout);
        void UpdateUserWorkout(UserWorkout userWorkout);
        void DeleteUserWorkout(int id);
    }
}

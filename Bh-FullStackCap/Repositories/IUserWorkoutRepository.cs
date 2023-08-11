using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IUserWorkoutRepository
    {
      
        public List<UserWorkout> GetAllUserWorkoutsByUserId(int userId);
        public List<UserWorkout> GetUserWorkoutByDate(int userId, DateTime datePerformed);
        void AddUserWorkout(UserWorkout userWorkout);
        void UpdateUserWorkout(UserWorkout userWorkout);
        void DeleteUserWorkout(int id);
    }
}

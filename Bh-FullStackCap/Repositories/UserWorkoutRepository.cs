using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Utils;
using System;
using System.Collections.Generic;

namespace Bh_FullStackCap.Repositories
{
    public class UserWorkoutRepository : BaseRepository, IUserWorkoutRepository
    {
        public UserWorkoutRepository(IConfiguration config)
            : base(config) { }

      



        public UserWorkout GetUserWorkoutById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserID, SplitID, ExerciseID, DatePerformed, WeekNumber, Sets, Reps, Weight, WeightPercentage
                        FROM User_Workouts
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new UserWorkout()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserID = DbUtils.GetInt(reader, "UserID"),
                                SplitID = DbUtils.GetInt(reader, "SplitID"),
                                ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                DatePerformed = DbUtils.GetDateTime(reader, "DatePerformed"),
                                WeekNumber = DbUtils.GetInt(reader, "WeekNumber"),
                                Sets = DbUtils.GetInt(reader, "Sets"),
                                Reps = DbUtils.GetInt(reader, "Reps"),
                                Weight = DbUtils.GetFloat(reader, "Weight"),
                                WeightPercentage = DbUtils.GetFloat(reader, "WeightPercentage")

                            };
                        }
                    }
                }
            }

            return null;
        }

        public void AddUserWorkout(UserWorkout userWorkout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User_Workouts (UserID, SplitID, ExerciseID, DatePerformed, WeekNumber, Sets, Reps, Weight, WeightPercentage)
                        OUTPUT INSERTED.ID
                        VALUES (@UserID, @SplitID, @ExerciseID, @DatePerformed, @WeekNumber, @Sets, @Reps, @Weight";

                    DbUtils.AddParameter(cmd, "@UserID", userWorkout.UserID);
                    DbUtils.AddParameter(cmd, "@SplitID", userWorkout.SplitID);
                    DbUtils.AddParameter(cmd, "@ExerciseID", userWorkout.ExerciseID);
                    DbUtils.AddParameter(cmd, "@DatePerformed", userWorkout.DatePerformed);
                    DbUtils.AddParameter(cmd, "@WeekNumber", userWorkout.WeekNumber);
                    DbUtils.AddParameter(cmd, "@Sets", userWorkout.Sets);
                    DbUtils.AddParameter(cmd, "@Reps", userWorkout.Reps);
                    DbUtils.AddParameter(cmd, "@Weight", userWorkout.Weight);
                  

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateUserWorkout(UserWorkout userWorkout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User_Workouts
                        SET UserID = @UserID, SplitID = @SplitID, ExerciseID = @ExerciseID, DatePerformed = @DatePerformed,
                            WeekNumber = @WeekNumber, Sets = @Sets, Reps = @Reps, Weight = @Weight
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userWorkout.Id);
                    DbUtils.AddParameter(cmd, "@UserID", userWorkout.UserID);
                    DbUtils.AddParameter(cmd, "@SplitID", userWorkout.SplitID);
                    DbUtils.AddParameter(cmd, "@ExerciseID", userWorkout.ExerciseID);
                    DbUtils.AddParameter(cmd, "@DatePerformed", userWorkout.DatePerformed);
                    DbUtils.AddParameter(cmd, "@WeekNumber", userWorkout.WeekNumber);
                    DbUtils.AddParameter(cmd, "@Sets", userWorkout.Sets);
                    DbUtils.AddParameter(cmd, "@Reps", userWorkout.Reps);
                    DbUtils.AddParameter(cmd, "@Weight", userWorkout.Weight);
                    

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUserWorkout(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM User_Workouts WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

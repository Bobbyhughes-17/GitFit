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





        public List<UserWorkout> GetUserWorkoutByDate(int userId, DateTime datePerformed)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            SELECT Id, UserID, SplitID, ExerciseID, DatePerformed, WeekNumber, Sets, Reps, Weight, WeightPercentage
            FROM User_Workouts
            WHERE UserID = @UserId AND CAST(DatePerformed AS DATE) = @DatePerformedDate
            ";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@DatePerformedDate", datePerformed.Date);

                    var workouts = new List<UserWorkout>();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            workouts.Add(new UserWorkout()
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
                            });
                        }
                    }
                    return workouts;
                }
            }
        }

        public List<UserWorkout> GetAllUserWorkoutsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT uw.Id, uw.UserID, uw.SplitID, uw.ExerciseID, uw.DatePerformed, 
                       uw.WeekNumber, uw.Sets, uw.Reps, uw.Weight, uw.WeightPercentage,
                       s.SplitName, e.ExerciseName
                FROM User_Workouts uw
                JOIN Workout_Splits s ON uw.SplitID = s.Id
                JOIN Exercises e ON uw.ExerciseID = e.Id
                WHERE uw.UserID = @UserId
                ORDER BY uw.DatePerformed DESC";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var workouts = new List<UserWorkout>();
                    while (reader.Read())
                    {
                        workouts.Add(new UserWorkout()
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
                            WeightPercentage = DbUtils.GetFloat(reader, "WeightPercentage"),
                            SplitName = DbUtils.GetString(reader, "SplitName"),
                            ExerciseName = DbUtils.GetString(reader, "ExerciseName")
                        });
                    }
                    reader.Close();
                    return workouts;
                }
            }
        }



        public void AddUserWorkout(UserWorkout userWorkout)
        {
      
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                   
                    cmd.CommandText = "SELECT Id FROM UserProfile WHERE Id = @UserID";
                    DbUtils.AddParameter(cmd, "@UserID", userWorkout.UserID);

                    if (cmd.ExecuteScalar() == null)
                        throw new Exception($"UserID {userWorkout.UserID} ");

                   
                    cmd.CommandText = "SELECT Id FROM Workout_Splits WHERE Id = @SplitID";
                    DbUtils.AddParameter(cmd, "@SplitID", userWorkout.SplitID);

                    if (cmd.ExecuteScalar() == null)
                        throw new Exception($"SplitID {userWorkout.SplitID} ");

                   
                    cmd.CommandText = "SELECT Id FROM Exercises WHERE Id = @ExerciseID";
                    DbUtils.AddParameter(cmd, "@ExerciseID", userWorkout.ExerciseID);

                    if (cmd.ExecuteScalar() == null)
                        throw new Exception($"ExerciseID {userWorkout.ExerciseID}");

                    cmd.CommandText = @"
                INSERT INTO User_Workouts (UserID, SplitID, ExerciseID, DatePerformed, WeekNumber, Sets, Reps, Weight)
                OUTPUT INSERTED.ID
                VALUES (@UserID, @SplitID, @ExerciseID, @DatePerformed, @WeekNumber, @Sets, @Reps, @Weight)";

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

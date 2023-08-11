using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Utils;

namespace Bh_FullStackCap.Repositories
{
    public class WorkoutSplitRepository : BaseRepository, IWorkoutSplitRepository
    {
        public WorkoutSplitRepository(IConfiguration config)
            : base(config) { }

        public List<WorkoutSplit> GetAllWorkoutSplits()
        {
            List<WorkoutSplit> workoutSplits = new List<WorkoutSplit>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, SplitName, DaysPerWeek, SplitDescription
                        FROM Workout_Splits";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            WorkoutSplit workoutSplit = new WorkoutSplit()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                SplitName = DbUtils.GetString(reader, "SplitName"),
                                DaysPerWeek = DbUtils.GetInt(reader, "DaysPerWeek"),
                                SplitDescription = DbUtils.GetString(reader, "SplitDescription"),
                            };

                            workoutSplits.Add(workoutSplit);
                        }
                    }
                }
            }

            return workoutSplits;
        }

        public List<WorkoutSplit> GetUserWorkoutSplitsByUserId(int userId)
        {
            List<WorkoutSplit> workoutSplits = new List<WorkoutSplit>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT 
                    ws.Id, ws.SplitName, ws.DaysPerWeek, ws.SplitDescription,
                    wsd.ExerciseID, wsd.DayOfWeek, wsd.OrderInDay, wsd.Sets, wsd.Reps, wsd.WeightPercentage,
                    e.ExerciseName, e.Description, e.MuscleGroupId
                FROM User_Splits us
                JOIN Workout_Splits ws ON us.SplitId = ws.Id
                LEFT JOIN Workout_Split_Details wsd ON ws.Id = wsd.SplitID
                LEFT JOIN Exercises e ON wsd.ExerciseID = e.Id
                WHERE us.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int currentId = DbUtils.GetInt(reader, "Id");
                            var currentWorkoutSplit = workoutSplits.FirstOrDefault(ws => ws.Id == currentId);

                            if (currentWorkoutSplit == null)
                            {
                                currentWorkoutSplit = new WorkoutSplit()
                                {
                                    Id = currentId,
                                    SplitName = DbUtils.GetString(reader, "SplitName"),
                                    DaysPerWeek = DbUtils.GetInt(reader, "DaysPerWeek"),
                                    SplitDescription = DbUtils.GetString(reader, "SplitDescription"),
                                    WorkoutDetails = new List<WorkoutDetails>()
                                };
                                workoutSplits.Add(currentWorkoutSplit);
                            }

                            var detail = new WorkoutDetails()
                            {
                                Id = DbUtils.GetInt(reader, "Id"), 
                                ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                SplitID = currentId,
                                DayOfWeek = DbUtils.GetInt(reader, "DayOfWeek"),
                                OrderInDay = DbUtils.GetInt(reader, "OrderInDay"),
                                Sets = DbUtils.GetInt(reader, "Sets"),
                                Reps = DbUtils.GetInt(reader, "Reps"),
                                WeightPercentage = DbUtils.GetFloat(reader, "WeightPercentage"),
                                ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                            };
                            currentWorkoutSplit?.WorkoutDetails.Add(detail);
                        }
                    }
                }
            }

            return workoutSplits;
        }



        public WorkoutSplit GetWorkoutSplitById(int id)
        {
            WorkoutSplit workoutSplit = null;

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT ws.Id AS SplitId, ws.SplitName, ws.DaysPerWeek, ws.SplitDescription,
                       wsd.Id AS WorkoutDetailId, wsd.ExerciseID, wsd.SplitID, wsd.DayOfWeek,
                       wsd.OrderInDay, wsd.Sets, wsd.Reps, e.ExerciseName, e.Description, e.MuscleGroupId
                FROM Workout_Splits ws
                LEFT JOIN Workout_Split_Details wsd ON ws.Id = wsd.SplitID
                LEFT JOIN Exercises e ON wsd.ExerciseID = e.Id
                WHERE ws.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            if (workoutSplit == null)
                            {
                                workoutSplit = new WorkoutSplit()
                                {
                                    Id = DbUtils.GetInt(reader, "SplitId"),
                                    SplitName = DbUtils.GetString(reader, "SplitName"),
                                    DaysPerWeek = DbUtils.GetInt(reader, "DaysPerWeek"),
                                    SplitDescription = DbUtils.GetString(reader, "SplitDescription"),
                                    WorkoutDetails = new List<WorkoutDetails>()
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "WorkoutDetailId"))  
                            {
                                workoutSplit?.WorkoutDetails.Add(new WorkoutDetails()
                                {
                                    Id = DbUtils.GetInt(reader, "WorkoutDetailId"),
                                    ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                    SplitID = DbUtils.GetInt(reader, "SplitID"),
                                    DayOfWeek = DbUtils.GetInt(reader, "DayOfWeek"),
                                    OrderInDay = DbUtils.GetInt(reader, "OrderInDay"),
                                    Sets = DbUtils.GetInt(reader, "Sets"),
                                    Reps = DbUtils.GetInt(reader, "Reps"),
                                    ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                                });
                            }
                        }
                    }
                }
            }

            return workoutSplit;
        }

        public void AddWorkoutSplit(WorkoutSplit workoutSplit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Workout_Splits (SplitName, DaysPerWeek, SplitDescription)
                OUTPUT INSERTED.ID
                VALUES (@SplitName, @DaysPerWeek, @Description)";
                

                    DbUtils.AddParameter(cmd, "@SplitName", workoutSplit.SplitName);
                    DbUtils.AddParameter(cmd, "@DaysPerWeek", workoutSplit.DaysPerWeek);
                    DbUtils.AddParameter(cmd, "@Description", workoutSplit.SplitDescription);

                    workoutSplit.Id = (int)cmd.ExecuteScalar();

                }
            }
        }



        public void UpdateWorkoutSplit(WorkoutSplit workoutSplit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Workout_Splits
                        SET SplitName = @SplitName,
                            DaysPerWeek = @DaysPerWeek
                            SplitDescription = @SplitDescription
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", workoutSplit.Id);
                    DbUtils.AddParameter(cmd, "@SplitName", workoutSplit.SplitName);
                    DbUtils.AddParameter(cmd, "@DaysPerWeek", workoutSplit.DaysPerWeek);
                    DbUtils.AddParameter(cmd, "@SplitDescription", workoutSplit.SplitDescription);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteWorkoutSplit(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Workout_Splits
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

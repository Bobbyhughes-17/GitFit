using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Utils;

namespace Bh_FullStackCap.Repositories
{
    public class WorkoutDetailsRepository : BaseRepository, IWorkoutDetailsRepository
    {
        public WorkoutDetailsRepository(IConfiguration config)
            : base(config) { }

        public List<WorkoutDetails> GetAllWorkoutDetails()
        {
            List<WorkoutDetails> workoutDetails = new List<WorkoutDetails>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT wsd.Id, wsd.ExerciseID, wsd.SplitID, wsd.DayOfWeek, wsd.OrderInDay, wsd.Sets, wsd.Reps,
                       e.ExerciseName, e.Description, e.MuscleGroupId
                FROM Workout_Split_Details wsd
                INNER JOIN Exercises e ON wsd.ExerciseID = e.Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            WorkoutDetails workoutSplitDetails = new WorkoutDetails()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                SplitID = DbUtils.GetInt(reader, "SplitID"),
                                DayOfWeek = DbUtils.GetInt(reader, "DayOfWeek"),
                                OrderInDay = DbUtils.GetInt(reader, "OrderInDay"),
                                Sets = DbUtils.GetInt(reader, "Sets"),
                                Reps = DbUtils.GetInt(reader, "Reps"),
                                ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                            };

                            workoutDetails.Add(workoutSplitDetails);
                        }
                    }
                }
            }

            return workoutDetails;
        }

        public List<WorkoutDetails> GetWorkoutSplitDetails(int id)
        {
            List<WorkoutDetails> workoutDetails = new List<WorkoutDetails>();

            try
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                    SELECT wsd.Id, wsd.ExerciseID, wsd.SplitID, wsd.DayOfWeek, wsd.OrderInDay, wsd.Sets, wsd.Reps,
                           e.ExerciseName, e.Description, e.MuscleGroupId
                    FROM Workout_Split_Details wsd
                    INNER JOIN Exercises e ON wsd.ExerciseID = e.Id
                    WHERE wsd.SplitID = @SplitId";

                        DbUtils.AddParameter(cmd, "@SplitId", id);

                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                WorkoutDetails workoutDetail = new WorkoutDetails()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                    SplitID = DbUtils.GetInt(reader, "SplitID"),
                                    DayOfWeek = DbUtils.GetInt(reader, "DayOfWeek"),
                                    OrderInDay = DbUtils.GetInt(reader, "OrderInDay"),
                                    Sets = DbUtils.GetInt(reader, "Sets"),
                                    Reps = DbUtils.GetInt(reader, "Reps"),
                                    ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                                };

                                workoutDetails.Add(workoutDetail);
                            }
                        }
                    }
                }

                return workoutDetails;
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public void AddWorkoutDetails(WorkoutDetails workoutDetails)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Workout_Split_Details (ExerciseID, SplitID, DayOfWeek, OrderInDay, Sets, Reps, WeightPercentage)
                VALUES (@ExerciseID, @SplitID, @DayOfWeek, @OrderInDay, @Sets, @Reps, @WeightPercentage)";

                    DbUtils.AddParameter(cmd, "@ExerciseID", workoutDetails.ExerciseID);
                    DbUtils.AddParameter(cmd, "@SplitID", workoutDetails.SplitID);
                    DbUtils.AddParameter(cmd, "@DayOfWeek", workoutDetails.DayOfWeek);
                    DbUtils.AddParameter(cmd, "@OrderInDay", workoutDetails.OrderInDay);
                    DbUtils.AddParameter(cmd, "@Sets", workoutDetails.Sets);
                    DbUtils.AddParameter(cmd, "@Reps", workoutDetails.Reps);
                    DbUtils.AddParameter(cmd, "@WeightPercentage", workoutDetails.WeightPercentage);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void UpdateWorkoutDetails(WorkoutDetails workoutDetails)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Workout_Split_Details
                        SET ExerciseID = @ExerciseID, SplitID = @SplitID, DayOfWeek = @DayOfWeek,
                            OrderInDay = @OrderInDay, Sets = @Sets, Reps = @Reps, WeightPercentage = @WeightPercentage
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", workoutDetails.Id);
                    DbUtils.AddParameter(cmd, "@ExerciseID", workoutDetails.ExerciseID);
                    DbUtils.AddParameter(cmd, "@SplitID", workoutDetails.SplitID);
                    DbUtils.AddParameter(cmd, "@DayOfWeek", workoutDetails.DayOfWeek);
                    DbUtils.AddParameter(cmd, "@OrderInDay", workoutDetails.OrderInDay);
                    DbUtils.AddParameter(cmd, "@Sets", workoutDetails.Sets);
                    DbUtils.AddParameter(cmd, "@Reps", workoutDetails.Reps);
                    DbUtils.AddParameter(cmd, "@WeightPercentage", workoutDetails.WeightPercentage);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteWorkoutDetails(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Workout_Split_Details WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public WorkoutDetails GetWorkoutDetailsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ExerciseID, SplitID, DayOfWeek, OrderInDay, Sets, Reps
                        FROM Workout_Split_Details
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new WorkoutDetails()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ExerciseID = DbUtils.GetInt(reader, "ExerciseID"),
                                SplitID = DbUtils.GetInt(reader, "SplitID"),
                                DayOfWeek = DbUtils.GetInt(reader, "DayOfWeek"),
                                OrderInDay = DbUtils.GetInt(reader, "OrderInDay"),
                                Sets = DbUtils.GetInt(reader, "Sets"),
                                Reps = DbUtils.GetInt(reader, "Reps")
                            };
                        }
                    }
                }
            }

            return null;
        }
    }
}

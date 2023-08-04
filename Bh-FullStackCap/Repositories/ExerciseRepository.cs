using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Utils;

namespace Bh_FullStackCap.Repositories
{
    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(IConfiguration config)
            : base(config) { }

        public List<Exercises> GetAllExercises()
        {
            List<Exercises> exercises = new List<Exercises>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ExerciseName, Description, MuscleGroupId
                        FROM Exercises";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Exercises exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                            };

                            exercises.Add(exercise);
                        }
                    }
                }
            }

            return exercises;
        }

        public List<Exercises> GetExercisesByMuscleGroupId(int muscleGroupId)
        {
            List<Exercises> exercises = new List<Exercises>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ExerciseName, Description, MuscleGroupId
                        FROM Exercises
                        WHERE MuscleGroupId = @MuscleGroupId";

                    DbUtils.AddParameter(cmd, "@MuscleGroupId", muscleGroupId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Exercises exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                            };

                            exercises.Add(exercise);
                        }
                    }
                }
            }

            return exercises;
        }

        public Exercises GetExerciseById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ExerciseName, Description, MuscleGroupId
                        FROM Exercises
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ExerciseName = DbUtils.GetString(reader, "ExerciseName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MuscleGroupId = DbUtils.GetInt(reader, "MuscleGroupId")
                            };
                        }
                    }
                }
            }

            return null;
        }

        public void AddExercise(Exercises exercise)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Exercises (ExerciseName, Description, MuscleGroupId)
                        OUTPUT INSERTED.ID
                        VALUES (@ExerciseName, @Description, @MuscleGroupId)";

                    DbUtils.AddParameter(cmd, "@ExerciseName", exercise.ExerciseName);
                    DbUtils.AddParameter(cmd, "@Description", exercise.Description);
                    DbUtils.AddParameter(cmd, "@MuscleGroupId", exercise.MuscleGroupId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateExercise(Exercises exercises)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Exercises
                        SET ExerciseName = @ExerciseName,
                            Description = @Description,
                            MuscleGroupId = @MuscleGroupId
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", exercises.Id);
                    DbUtils.AddParameter(cmd, "@ExerciseName", exercises.ExerciseName);
                    DbUtils.AddParameter(cmd, "@Description", exercises.Description);
                    DbUtils.AddParameter(cmd, "@MuscleGroupId", exercises.MuscleGroupId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteExercise(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Exercises
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

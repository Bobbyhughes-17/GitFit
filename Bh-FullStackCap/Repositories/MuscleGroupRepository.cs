using System.Collections.Generic;
using Bh_FullStackCap.Models;
using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Utils;
using Microsoft.Data.SqlClient;

namespace Bh_FullStackCap.Repositories
{
    public class MuscleGroupRepository : BaseRepository, IMuscleGroupRepository
    {
        public MuscleGroupRepository(IConfiguration config)
            : base(config) { }

        public List<MuscleGroups> GetAllMuscleGroups()
        {
            List<MuscleGroups> muscleGroups = new List<MuscleGroups>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, MuscleGroupName
                        FROM MuscleGroups";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            MuscleGroups group = new MuscleGroups()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                MuscleGroupName = DbUtils.GetString(reader, "MuscleGroupName")
                            };

                            muscleGroups.Add(group);
                        }
                    }
                }
            }

            return muscleGroups;
        }

        public MuscleGroups GetMuscleGroupById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, MuscleGroupName
                        FROM MuscleGroups
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new MuscleGroups()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                MuscleGroupName = DbUtils.GetString(reader, "MuscleGroupName")
                            };
                        }
                    }
                }
            }

            return null;
        }
    }
}

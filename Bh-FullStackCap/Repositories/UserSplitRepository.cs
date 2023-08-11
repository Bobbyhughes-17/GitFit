using System.Collections.Generic;
using Bh_FullStackCap.Models;
using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Utils;
using Microsoft.Data.SqlClient;

namespace Bh_FullStackCap.Repositories
{
    public class UserSplitRepository : BaseRepository, IUserSplitRepository
    {
        public UserSplitRepository(IConfiguration config)
            : base(config) { }

        public List<UserSplit> GetUserSplitsByUserId(int userId)
        {
            var userSplits = new List<UserSplit>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, SplitId
                        FROM User_Splits
                        WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var userSplit = new UserSplit()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                SplitId = DbUtils.GetInt(reader, "SplitId")
                            };

                            userSplits.Add(userSplit);
                        }
                    }
                }
            }

            return userSplits;
        }

        public void AddUserSplit(UserSplit userSplit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User_Splits (UserId, SplitId) 
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @SplitId)";

                    DbUtils.AddParameter(cmd, "@UserId", userSplit.UserId);
                    DbUtils.AddParameter(cmd, "@SplitId", userSplit.SplitId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public UserSplit GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserId, SplitId
                    FROM User_Splits
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new UserSplit()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                SplitId = DbUtils.GetInt(reader, "SplitId")
                            };
                        }
                    }
                }
            }

            return null;
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM User_Splits
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(UserSplit userSplit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE User_Splits
                    SET UserId = @UserId,
                        SplitId = @SplitId
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userSplit.Id);
                    DbUtils.AddParameter(cmd, "@UserId", userSplit.UserId);
                    DbUtils.AddParameter(cmd, "@SplitId", userSplit.SplitId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

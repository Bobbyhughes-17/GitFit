using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Utils;

namespace Bh_FullStackCap.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config)
            : base(config) { }

        public List<UserProfile> GetAll()
        {
            List<UserProfile> userProfiles = new List<UserProfile>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT up.Id, up.DisplayName, up.FullName, 
                       up.Email, up.CreateDateTime, up.ImageLocation, up.MaxBench, up.MaxSquat, up.MaxDeadlift, up.UserTypeId,
                       up.UserWeight, up.UserHeight, ut.Name AS UserTypeName
                FROM UserProfile up
                INNER JOIN UserType ut ON up.UserTypeId = ut.Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                MaxBench = DbUtils.GetInt(reader, "MaxBench"),
                                MaxSquat = DbUtils.GetInt(reader, "MaxSquat"),
                                MaxDeadlift = DbUtils.GetInt(reader, "MaxDeadlift"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserWeight = DbUtils.GetInt(reader, "UserWeight"),
                                UserHeight = DbUtils.GetInt(reader, "UserHeight"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            };

                            userProfiles.Add(userProfile);
                        }
                    }
                }
            }

            return userProfiles;
        }



        public UserProfile GetById(int id)
        {
            UserProfile userProfile = null;

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT up.Id, up.DisplayName, up.FullName, 
                       up.Email, up.CreateDateTime, up.ImageLocation, up.MaxBench, up.MaxSquat, up.MaxDeadlift, up.UserTypeId,
                       up.UserWeight, up.UserHeight, ut.Name AS UserTypeName, up.IsActive
                FROM UserProfile up
                INNER JOIN UserType ut ON up.UserTypeId = ut.Id
                WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                MaxBench = DbUtils.GetInt(reader, "MaxBench"),
                                MaxSquat = DbUtils.GetInt(reader, "MaxSquat"),
                                MaxDeadlift = DbUtils.GetInt(reader, "MaxDeadlift"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserWeight = DbUtils.GetInt(reader, "UserWeight"),
                                UserHeight = DbUtils.GetInt(reader, "UserHeight"),
                                IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            };
                        }
                    }
                }
            }

            return userProfile;
        }
        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT up.Id, up.DisplayName, up.FullName, 
                       up.Email, up.CreateDateTime, up.ImageLocation, up.MaxBench, up.MaxSquat, up.MaxDeadlift, up.UserTypeId,
                       ut.Name AS UserTypeName, up.IsActive, up.UserWeight, up.UserHeight
                  FROM UserProfile up
                       LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                 WHERE Email = @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    UserProfile userProfile = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                MaxBench = DbUtils.GetInt(reader, "MaxBench"),
                                MaxSquat = DbUtils.GetInt(reader, "MaxSquat"),
                                MaxDeadlift = DbUtils.GetInt(reader, "MaxDeadlift"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserWeight = DbUtils.GetInt(reader, "UserWeight"),
                                UserHeight = DbUtils.GetInt(reader, "UserHeight"),
                                IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            };
                        }
                    }

                    return userProfile;
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FullName, DisplayName, 
                                                         Email, CreateDateTime, ImageLocation, MaxBench, MaxSquat, MaxDeadlift, UserTypeId, UserWeight, UserHeight, IsActive)
                                OUTPUT INSERTED.ID
                                VALUES (@FullName, @DisplayName, 
                                        @Email, @CreateDateTime, @ImageLocation, @MaxBench, @MaxSquat, @MaxDeadlift, @UserTypeId, @UserWeight, @UserHeight, @IsActive)";
                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@MaxBench", userProfile.MaxBench);
                    DbUtils.AddParameter(cmd, "@MaxSquat", userProfile.MaxSquat);
                    DbUtils.AddParameter(cmd, "@MaxDeadlift", userProfile.MaxDeadlift);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@UserWeight", userProfile.UserWeight);
                    DbUtils.AddParameter(cmd, "@UserHeight", userProfile.UserHeight);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            UPDATE UserProfile
            SET
            [FullName] = @fullName,
            [DisplayName] = @displayName,
            [Email] = @email,
            [ImageLocation] = @imageLocation,
            [MaxBench] = @maxBench,
            [MaxSquat] = @maxSquat,
            [MaxDeadlift] = @maxDeadlift,
            [UserWeight] = @userWeight,
            [UserHeight] = @userHeight
            WHERE Id = @id
            ";

                    cmd.Parameters.AddWithValue("@fullName", userProfile.FullName);
                    cmd.Parameters.AddWithValue("@displayName", userProfile.DisplayName);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email);
                    cmd.Parameters.AddWithValue("@imageLocation", userProfile.ImageLocation);
                    cmd.Parameters.AddWithValue("@maxBench", userProfile.MaxBench);
                    cmd.Parameters.AddWithValue("@maxSquat", userProfile.MaxSquat);
                    cmd.Parameters.AddWithValue("@maxDeadlift", userProfile.MaxDeadlift);
                    cmd.Parameters.AddWithValue("@userWeight", userProfile.UserWeight);
                    cmd.Parameters.AddWithValue("@userHeight", userProfile.UserHeight);
                    cmd.Parameters.AddWithValue("@id", userProfile.Id); 

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
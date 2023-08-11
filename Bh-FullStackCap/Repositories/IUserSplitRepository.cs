using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IUserSplitRepository
    {
        void AddUserSplit(UserSplit userSplit);
        UserSplit GetById(int id);
        List<UserSplit> GetUserSplitsByUserId(int userId);
        void Delete(int id);
        void Update(UserSplit userSplit);
    }
}

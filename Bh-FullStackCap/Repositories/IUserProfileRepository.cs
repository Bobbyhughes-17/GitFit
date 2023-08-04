using Bh_FullStackCap.Models;
using System.Collections.Generic;


namespace Bh_FullStackCap.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);

        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        void Update(UserProfile userProfile);
    }
}

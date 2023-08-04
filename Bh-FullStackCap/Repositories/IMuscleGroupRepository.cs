using System.Collections.Generic;
using Bh_FullStackCap.Models;

namespace Bh_FullStackCap.Repositories
{
    public interface IMuscleGroupRepository
    {
        List<MuscleGroups> GetAllMuscleGroups();
        MuscleGroups GetMuscleGroupById(int id);
    }
}

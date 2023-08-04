using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuscleGroupController : ControllerBase
    {
        private readonly IMuscleGroupRepository _muscleGroupRepository;

        public MuscleGroupController(IMuscleGroupRepository muscleGroupRepository)
        {
            _muscleGroupRepository = muscleGroupRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MuscleGroups>> GetAllMuscleGroups()
        {
            List<MuscleGroups> muscleGroups = _muscleGroupRepository.GetAllMuscleGroups();
            return Ok(muscleGroups);
        }

        [HttpGet("{id}")]
        public ActionResult<MuscleGroups> GetMuscleGroupById(int id)
        {
            MuscleGroups muscleGroup = _muscleGroupRepository.GetMuscleGroupById(id);
            if (muscleGroup == null)
            {
                return NotFound();
            }
            return Ok(muscleGroup);
        }
    }
}

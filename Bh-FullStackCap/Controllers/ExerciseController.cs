using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseRepository _exerciseRepository;

        public ExerciseController(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Exercises>> GetAllExercises()
        {
            List<Exercises> exercises = _exerciseRepository.GetAllExercises();
            return Ok(exercises);
        }

        [HttpGet("muscleGroup/{muscleGroupId}")]
        public IActionResult GetExercisesByMuscleGroupId(int muscleGroupId)
        {
            var exercises = _exerciseRepository.GetExercisesByMuscleGroupId(muscleGroupId);
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public ActionResult<Exercises> GetExerciseById(int id)
        {
            Exercises exercise = _exerciseRepository.GetExerciseById(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return Ok(exercise);
        }

        [HttpPost]
        public ActionResult<Exercises> Post(Exercises exercise)
        {
            try
            {
                _exerciseRepository.AddExercise(exercise);
                return Ok(exercise);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExercise(int id, Exercises exercises)
        {
            try
            {
                if (id != exercises.Id)
                {
                    return BadRequest("Exercise ID mismatch");
                }
                var existingExercise = _exerciseRepository.GetExerciseById(id);
                if (existingExercise == null)
                {
                    return NotFound($"Exercise with ID {id} not found");
                }

                _exerciseRepository.UpdateExercise(exercises);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExercise(int id)
        {
            try
            {
                var exercise = _exerciseRepository.GetExerciseById(id);
                if (exercise == null)
                {
                    return NotFound($"Exercise with ID {id} not found");
                }

                _exerciseRepository.DeleteExercise(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}

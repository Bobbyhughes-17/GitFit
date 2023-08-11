using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutSplitController : ControllerBase
    {
        private readonly IWorkoutSplitRepository _workoutSplitRepository;

        public WorkoutSplitController(IWorkoutSplitRepository workoutSplitRepository)
        {
            _workoutSplitRepository = workoutSplitRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WorkoutSplit>> GetAllWorkoutSplits()
        {
            List<WorkoutSplit> workoutSplits = _workoutSplitRepository.GetAllWorkoutSplits();
            return Ok(workoutSplits);
        }
        [HttpGet("userWorkoutSplits/{userId}")]
        public ActionResult<IEnumerable<WorkoutSplit>> GetUserWorkoutSplitsByUserId(int userId)
        {
            var workoutSplits = _workoutSplitRepository.GetUserWorkoutSplitsByUserId(userId);
            return Ok(workoutSplits);
        }


        [HttpGet("{id}")]
        public ActionResult<WorkoutSplit> GetWorkoutSplitById(int id)
        {
            var workoutSplit = _workoutSplitRepository.GetWorkoutSplitById(id);
            if (workoutSplit == null)
            {
                return NotFound();
            }
            return Ok(workoutSplit);
        }

        [HttpPost("addSplit")]
        public ActionResult<WorkoutSplit> AddWorkoutSplit(WorkoutSplit workoutSplit)
        {
            try
            {
                _workoutSplitRepository.AddWorkoutSplit(workoutSplit);
                return Ok(workoutSplit);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdateWorkoutSplit(int id, WorkoutSplit workoutSplit)
        {
            if (id != workoutSplit.Id)
            {
                return BadRequest();
            }

            _workoutSplitRepository.UpdateWorkoutSplit(workoutSplit);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteWorkoutSplit(int id)
        {
            var workoutSplit = _workoutSplitRepository.GetWorkoutSplitById(id);
            if (workoutSplit == null)
            {
                return NotFound();
            }

            _workoutSplitRepository.DeleteWorkoutSplit(id);
            return NoContent();
        }
    }
}

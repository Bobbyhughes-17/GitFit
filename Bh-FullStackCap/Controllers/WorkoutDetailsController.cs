using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutDetailsController : ControllerBase
    {
        private readonly IWorkoutDetailsRepository _workoutDetailsRepository;

        public WorkoutDetailsController(IWorkoutDetailsRepository workoutDetailsRepository)
        {
            _workoutDetailsRepository = workoutDetailsRepository;
        }


        [HttpGet]
        public ActionResult<IEnumerable<WorkoutDetails>> GetAllWorkoutDetails()
        {
            try
            {
                var workoutDetails = _workoutDetailsRepository.GetAllWorkoutDetails();
                return Ok(workoutDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<WorkoutDetails> GetWorkoutDetailsById(int id)
        {
            var workoutDetails = _workoutDetailsRepository.GetWorkoutDetailsById(id);
            if (workoutDetails == null)
            {
                return NotFound();
            }
            return Ok(workoutDetails);
        }

        [HttpPost]
        public IActionResult AddWorkoutDetails(WorkoutDetails workoutDetails)
        {
            try
            {
                _workoutDetailsRepository.AddWorkoutDetails(workoutDetails);
                return CreatedAtAction(nameof(GetWorkoutDetailsById), new { id = workoutDetails.Id }, workoutDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdateWorkoutDetails(int id, WorkoutDetails workoutDetails)
        {
            try
            {
                if (id != workoutDetails.Id)
                {
                    return BadRequest("Invalid workout details ID.");
                }

                _workoutDetailsRepository.UpdateWorkoutDetails(workoutDetails);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWorkoutDetails(int id)
        {
            try
            {
                var existingWorkoutDetails = _workoutDetailsRepository.GetWorkoutDetailsById(id);
                if (existingWorkoutDetails == null)
                {
                    return NotFound();
                }

                _workoutDetailsRepository.DeleteWorkoutDetails(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}

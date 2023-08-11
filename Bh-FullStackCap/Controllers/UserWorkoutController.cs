using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWorkoutController : ControllerBase
    {
        private readonly IUserWorkoutRepository _userWorkoutRepository;

        public UserWorkoutController(IUserWorkoutRepository userWorkoutRepository)
        {
            _userWorkoutRepository = userWorkoutRepository;
        }





        [HttpGet("user/{userId}")]
        public IActionResult GetAllUserWorkoutsByUser(int userId)
        {
            var workouts = _userWorkoutRepository.GetAllUserWorkoutsByUserId(userId);
            if (workouts == null)
            {
                return NotFound();
            }

            return Ok(workouts);
        }

        [HttpGet("user/{userId}/date/{datePerformed}")]
        public IActionResult GetUserWorkoutByDate(int userId, DateTime datePerformed)
        {
            var workouts = _userWorkoutRepository.GetUserWorkoutByDate(userId, datePerformed);
            if (workouts == null || !workouts.Any())
            {
                return NotFound();
            }

            return Ok(workouts);
        }



        [HttpPost]
        public ActionResult<UserWorkout> AddUserWorkout(UserWorkout userWorkout)
        {
           
                _userWorkoutRepository.AddUserWorkout(userWorkout);
                return Ok(userWorkout);
          
        }


        [HttpPut("{id}")]
        public IActionResult UpdateUserWorkout(int id, UserWorkout userWorkout)
        {
            try
            {
                var existingUserWorkout = _userWorkoutRepository.GetAllUserWorkoutsByUserId(id);
                if (existingUserWorkout == null)
                    return NotFound();

                _userWorkoutRepository.UpdateUserWorkout(userWorkout);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserWorkout(int id)
        {
            try
            {
                var existingUserWorkout = _userWorkoutRepository.GetAllUserWorkoutsByUserId(id);
                if (existingUserWorkout == null)
                    return NotFound();

                _userWorkoutRepository.DeleteUserWorkout(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

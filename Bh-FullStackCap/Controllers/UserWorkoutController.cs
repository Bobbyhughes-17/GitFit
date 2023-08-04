using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;
using System;
using System.Collections.Generic;

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

  

        [HttpGet("{id}")]
        public ActionResult<UserWorkout> GetUserWorkoutById(int id)
        {
            
           
                var userWorkout = _userWorkoutRepository.GetUserWorkoutById(id);
                if (userWorkout == null)
                    return NotFound();

                return Ok(userWorkout);
            
           
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
                var existingUserWorkout = _userWorkoutRepository.GetUserWorkoutById(id);
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
                var existingUserWorkout = _userWorkoutRepository.GetUserWorkoutById(id);
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

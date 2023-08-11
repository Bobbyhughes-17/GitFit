using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSplitController : ControllerBase
    {
        private readonly IUserSplitRepository _userSplitRepository;

        public UserSplitController(IUserSplitRepository userSplitRepository)
        {
            _userSplitRepository = userSplitRepository;
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<UserSplit>> GetUserSplitsByUserId(int userId)
        {
            var userSplits = _userSplitRepository.GetUserSplitsByUserId(userId);
            return Ok(userSplits);
        }

        [HttpPost]
        public ActionResult AddUserSplit(UserSplit userSplit)
        {
            _userSplitRepository.AddUserSplit(userSplit);
            return CreatedAtAction(nameof(GetById), new { id = userSplit.Id }, userSplit); 
        }
        [HttpGet("{id}")]
        public ActionResult<UserSplit> GetById(int id)
        {
            var userSplit = _userSplitRepository.GetById(id);
            if (userSplit == null)
            {
                return NotFound();
            }
            return Ok(userSplit);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _userSplitRepository.Delete(id);
            return NoContent();  // 204 No Content is typical for successful DELETE requests.
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, UserSplit userSplit)
        {
            if (id != userSplit.Id)
            {
                return BadRequest("ID in the URL and ID in the provided data do not match.");
            }

            _userSplitRepository.Update(userSplit);
            return NoContent();
        }
    }
}

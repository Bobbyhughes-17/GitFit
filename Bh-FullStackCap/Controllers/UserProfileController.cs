using Microsoft.AspNetCore.Mvc;
using Bh_FullStackCap.Models;
using Bh_FullStackCap.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Bh_FullStackCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
      

        public UserProfileController(
         
            IUserProfileRepository userProfileRepository
        )
        {
            _userProfileRepository = userProfileRepository;
          
        }

        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        // GET: api/<UserProfileController>/5 
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userProfileRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.USER_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("GetByEmail", new { email = userProfile.Email }, userProfile);
        }
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, [FromBody] UserProfile userProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);

            return NoContent();
        }


    }
}
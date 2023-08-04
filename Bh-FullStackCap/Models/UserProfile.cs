using System.ComponentModel.DataAnnotations;

namespace Bh_FullStackCap.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(75)]
        public string? FullName { get; set; }

        [Required]
        [MaxLength(50)]
        public string? DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string? Email { get; set; }

        public DateTime? CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string? ImageLocation { get; set; } = "default-image.png";
        public int? UserTypeId { get; set; }
        public UserType? UserType { get; set; }
        public Boolean? IsActive { get; set; } = true;

        public int? MaxBench { get; set; }
        public int? MaxSquat { get; set; }
        public int? MaxDeadlift { get; set; }
        public int? UserWeight { get; set; }
        public int? UserHeight { get; set; }


    }
}
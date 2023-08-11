namespace Bh_FullStackCap.Models
{
    public class WorkoutDetails
    {
        public int Id { get; set; }
        public int ExerciseID { get; set; }
        public int SplitID { get; set; }
        public int DayOfWeek { get; set; }
        public int OrderInDay { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public float? WeightPercentage { get; set; }
        public string? ExerciseName { get; set; }
        public string? Description { get; set; }
        public int MuscleGroupId { get; set; }
     
    
    }
}

namespace Bh_FullStackCap.Models
{
    public class UserWorkout
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int SplitID { get; set; }
        public int ExerciseID { get; set; }
        public DateTime DatePerformed { get; set; }
        public int WeekNumber { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public float? Weight { get; set; }
        public float? WeightPercentage { get; set; }
      
    }
}

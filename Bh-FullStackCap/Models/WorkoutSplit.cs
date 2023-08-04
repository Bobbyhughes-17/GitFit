namespace Bh_FullStackCap.Models
{
    public class WorkoutSplit
    {
        public int Id { get; set; }
        public string SplitName { get; set; }
        public int DaysPerWeek { get; set; }
        public ICollection<WorkoutDetails>? WorkoutDetails { get; set; }
    }
}

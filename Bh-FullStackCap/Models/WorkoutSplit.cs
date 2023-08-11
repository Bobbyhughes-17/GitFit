namespace Bh_FullStackCap.Models
{
    public class WorkoutSplit
    {
        public int Id { get; set; }
        public string? SplitName { get; set; }
        public int DaysPerWeek { get; set; }
        public string? SplitDescription { get; set; }
        public List<WorkoutDetails>? WorkoutDetails { get; set; }
    }
}

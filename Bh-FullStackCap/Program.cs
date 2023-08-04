using Bh_FullStackCap.Repositories;


namespace Bh_FullStackCap
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();     
            builder.Services.AddTransient<IUserProfileRepository, UserProfileRepository>();
            builder.Services.AddTransient<IWorkoutSplitRepository, WorkoutSplitRepository>();
            builder.Services.AddTransient<IWorkoutDetailsRepository, WorkoutDetailsRepository>();
            builder.Services.AddTransient<IUserWorkoutRepository, UserWorkoutRepository>();
            builder.Services.AddTransient<IMuscleGroupRepository, MuscleGroupRepository>();
            builder.Services.AddTransient<IExerciseRepository, ExerciseRepository>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors(policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });

          
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}

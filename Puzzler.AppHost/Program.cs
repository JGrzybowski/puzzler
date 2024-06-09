var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Puzzler_Server>("puzzler-server");

builder.Build().Run();

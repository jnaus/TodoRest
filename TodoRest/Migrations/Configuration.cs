namespace TodoRest.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TodoRest.Models.TodoRestContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(TodoRest.Models.TodoRestContext context)
        {
			//  This method will be called after migrating to the latest version.
			var rand = new Random();

			var items = Enumerable.Range(1, 20).Select(i => new TodoItem
			{
				Todo = "todo " + i.ToString(),
				DueDate = DateTime.Now.AddMonths(- rand.Next(1,12)).AddDays(-rand.Next(1,28)),
				Priority = (byte) rand.Next(10)
			}).ToArray();

			context.TodoItems.AddOrUpdate(item => new { item.Todo }, items);
        }
    }
}

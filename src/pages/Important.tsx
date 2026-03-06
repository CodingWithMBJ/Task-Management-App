import { useTasksOutlet } from "../hooks/useTasksOutlet";

const Important: React.FC = () => {
  const { tasks, toggleCompleteTask, toggleImportantTask, deleteTask } =
    useTasksOutlet();

  const importantTasks = tasks.filter((t) => t.important);

  return (
    <section className="important-task section">
      <h2 className="title">Important</h2>

      {importantTasks.length === 0 ? (
        <p>No important tasks yet.</p>
      ) : (
        importantTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />
            <span
              className={
                task.completed ? "task-title task-title-done" : "task-title"
              }
            >
              {task.title}
            </span>

            <button
              type="button"
              className="task-icon-btn"
              onClick={() => toggleImportantTask(task.id)}
              title="Toggle important"
            >
              {task.important ? "⭐" : "☆"}
            </button>

            <button className="task-delete" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default Important;

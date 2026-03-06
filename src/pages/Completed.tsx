import { useTasksOutlet } from "../hooks/useTasksOutlet";

const Completed: React.FC = () => {
  const { tasks, toggleCompleteTask, deleteTask } = useTasksOutlet();
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <section className="completed section">
      <h2 className="title">Completed</h2>

      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />
            <span className="task-title task-title-done">{task.title}</span>
            <button className="task-delete" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default Completed;

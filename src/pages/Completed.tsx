import { useTaskContext } from "../context/TaskContext";

const Completed: React.FC = () => {
  const { tasks, toggleCompleted, deleteTask } = useTaskContext();
  const completedTasks = tasks.filter((task) => task.completed);

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
              onChange={() => toggleCompleted(task.id)}
            />

            <span className="task-title task-title-done">{task.title}</span>

            <button
              type="button"
              className="task-delete"
              onClick={() => deleteTask(task.id)}
            >
              🗑️
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default Completed;

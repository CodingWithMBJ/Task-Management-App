import { useTasksOutlet } from "../hooks/useTasksOutlet";

const DueTasks: React.FC = () => {
  const { tasks, toggleCompleteTask, deleteTask } = useTasksOutlet();

  const now = Date.now();

  const dueTasks = tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      const dueTime = new Date(task.dueDate).getTime();
      return !Number.isNaN(dueTime) && dueTime <= now && !task.completed;
    })
    .sort((a, b) => {
      const aTime = new Date(a.dueDate!).getTime();
      const bTime = new Date(b.dueDate!).getTime();
      return aTime - bTime; // earliest due first
    });

  return (
    <section className="due-task section">
      <h2 className="title">Due Tasks</h2>

      {dueTasks.length === 0 ? (
        <p>No tasks currently due.</p>
      ) : (
        dueTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />

            <div className="task-content">
              <span className="task-title">{task.title}</span>

              {task.dueDate && (
                <small className="task-due">
                  Due: {new Date(task.dueDate).toLocaleString()}
                </small>
              )}
            </div>

            <button className="task-delete" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default DueTasks;

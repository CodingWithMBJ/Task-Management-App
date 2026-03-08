import { useTaskContext } from "../context/TaskContext";

const DueTasks: React.FC = () => {
  const { tasks, toggleCompleted, deleteTask } = useTaskContext();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  const dueTasks = tasks
    .filter((task) => task.dueDate && !task.completed)
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    );

  const getDueLabel = (dueDate: string) => {
    const due = new Date(dueDate);

    if (due < todayStart) return "Overdue";
    if (due >= todayStart && due < tomorrowStart) return "Due today";
    return "Upcoming";
  };

  return (
    <section className="due-task section">
      <h2 className="title">Due Tasks</h2>

      {dueTasks.length === 0 ? (
        <p>No tasks with due dates.</p>
      ) : (
        dueTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />

            <div className="task-content">
              <span className="task-title">{task.title}</span>

              {task.dueDate && (
                <>
                  <small className="task-due">
                    Due: {new Date(task.dueDate).toLocaleString()}
                  </small>
                  <small className="task-status-label">
                    {getDueLabel(task.dueDate)}
                  </small>
                </>
              )}
            </div>

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

export default DueTasks;

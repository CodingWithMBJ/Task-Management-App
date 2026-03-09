import { useTaskContext } from "../context/TaskContext";

const getDueDateTime = (dueDate?: string, dueTime?: string): Date | null => {
  if (!dueDate) return null;

  const value = dueTime ? `${dueDate}T${dueTime}` : `${dueDate}T23:59`;
  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatTime = (time?: string) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const hourNum = Number(hours);

  if (Number.isNaN(hourNum)) return time;

  const suffix = hourNum >= 12 ? "PM" : "AM";
  const formattedHour = hourNum % 12 || 12;

  return `${formattedHour}:${minutes} ${suffix}`;
};

const DueTasks: React.FC = () => {
  const { tasks, deleteTask, cycleStatus } = useTaskContext();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  const dueTasks = tasks
    .filter((task) => {
      const dueAt = getDueDateTime(task.dueDate, task.dueTime);
      return dueAt && task.status !== "Completed";
    })
    .sort((a, b) => {
      const aDue = getDueDateTime(a.dueDate, a.dueTime);
      const bDue = getDueDateTime(b.dueDate, b.dueTime);

      return (aDue?.getTime() ?? Infinity) - (bDue?.getTime() ?? Infinity);
    });

  const getDueLabel = (dueDate?: string, dueTime?: string) => {
    const due = getDueDateTime(dueDate, dueTime);
    if (!due) return "";

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
            <button
              type="button"
              className={`task-status status-${task.status
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              onClick={() => cycleStatus(task.id)}
            >
              {task.status}
            </button>

            <div className="task-content">
              <span className="task-title">{task.title}</span>

              {task.dueDate && (
                <>
                  <small className="task-due">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                    {task.dueTime ? ` at ${formatTime(task.dueTime)}` : ""}
                  </small>

                  <small className="task-status-label">
                    {getDueLabel(task.dueDate, task.dueTime)}
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

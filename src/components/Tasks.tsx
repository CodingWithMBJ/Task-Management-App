import type { Task } from "../types/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import type React from "react";

type TasksProps = {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onCycleStatus: (id: number) => void;
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

const Tasks: React.FC<TasksProps> = ({
  tasks,
  onEditClick,
  onDeleteTask,
  onCycleStatus,
}) => {
  return (
    <section className="task-items">
      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Click “Add Task”.</p>
      ) : (
        tasks.map((task) => (
          <article key={task.id} className="task-box">
            <section className="task-header">
              <article className="top">
                <h1 className="task-title">{task.title}</h1>
                <p className="task-priority">
                  {task.important ? (
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="important"
                    />
                  ) : (
                    ""
                  )}
                </p>
              </article>

              <article className="bottom">
                <p className="task-description">{task.description}</p>
                <p className="task-date">
                  {task.dueDate ? (
                    <>
                      {new Date(task.dueDate).toLocaleDateString()}
                      {task.dueTime ? ` at ${formatTime(task.dueTime)}` : ""}
                    </>
                  ) : (
                    "No due date"
                  )}
                </p>
              </article>
            </section>

            <section className="task-body">
              <article className="task-body-l">
                <button
                  className={`task-status status-${task.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  onClick={() => onCycleStatus(task.id)}
                >
                  {task.status}
                </button>
              </article>

              <article className="task-body-r">
                <button
                  className="btn edit-button"
                  onClick={() => onEditClick(task)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                  className="btn delete-btn"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </article>
            </section>
          </article>
        ))
      )}
    </section>
  );
};

export default Tasks;

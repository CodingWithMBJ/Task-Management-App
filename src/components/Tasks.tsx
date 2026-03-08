import type { Task } from "../types/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import type React from "react";

type TasksProps = {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

const Tasks: React.FC<TasksProps> = ({
  tasks,
  onEditClick,
  onDeleteTask,
  onToggleComplete,
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
                {" "}
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
                <p className="task-description">{task.description}</p>{" "}
                <p className="task-date">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </article>
            </section>

            <section className="task-body">
              <article className="task-body-l">
                <button
                  className={`task-completion ${task.completed ? "done" : ""}`}
                  onClick={() => onToggleComplete(task.id)}
                >
                  {task.completed ? "Completed" : "Not completed"}
                </button>
              </article>

              <article className="task-body-r">
                <button
                  className="edit-button"
                  onClick={() => onEditClick(task)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                  className="delete-btn"
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

import type { Task } from "../types/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type React from "react";

type TasksProps = {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: number) => void;
};

const Tasks: React.FC<TasksProps> = ({ tasks, onEditClick, onDeleteTask }) => {
  return (
    <section className="task-items">
      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Click “Add Task”.</p>
      ) : (
        tasks.map((task) => (
          <article key={task.id} className="task-box">
            <section className="task-header">
              <h1 className="task-title">{task.title}</h1>

              {/* If important is boolean, render readable text */}
              <p className="task-priority">
                {task.important ? "Important" : "Normal"}
              </p>

              <p className="task-description">{task.description}</p>
            </section>

            <section className="task-body">
              <article className="task-body-l">
                <p className="task-date">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "No due date"}
                </p>

                <p
                  className={`task-completion ${task.completed ? "done" : ""}`}
                >
                  {task.completed ? "Completed" : "Not completed"}
                </p>
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

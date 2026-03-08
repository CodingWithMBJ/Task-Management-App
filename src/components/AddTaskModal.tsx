import { useState, type FormEvent } from "react";
import type { Task, StatusProp } from "../types/Task";

type AddTaskModalProps = {
  onAddTask: (task: Task) => void;
  closeModal: () => void;
};

const AddTaskModal = ({ onAddTask, closeModal }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusProp>("New");
  const [important, setImportant] = useState(false);
  const [dueDateLocal, setDueDateLocal] = useState("");

  const statusOptions: StatusProp[] = ["New", "In Progress", "Completed"];

  const submit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) return;

    const dueDateIso = dueDateLocal
      ? new Date(dueDateLocal).toISOString()
      : undefined;

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription,
      status,
      completed: status === "Completed",
      important,
      dueDate: dueDateIso,
    };

    onAddTask(newTask);
    closeModal();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="add-task-title" className="modal-title">
            Add Task
          </h3>

          <button
            type="button"
            className="modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="modal-form" onSubmit={submit}>
          <div className="modal-field">
            <label className="modal-label" htmlFor="task-title">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details..."
              rows={4}
            />
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="task-due-date">
              Due date (optional)
            </label>

            <div className="modal-inline">
              <input
                id="task-due-date"
                type="datetime-local"
                className="modal-input"
                value={dueDateLocal}
                onChange={(e) => setDueDateLocal(e.target.value)}
              />

              <button
                type="button"
                className="modal-btn"
                onClick={() => setDueDateLocal("")}
                disabled={!dueDateLocal}
                title="Clear due date"
              >
                Clear
              </button>
            </div>

            {dueDateLocal && (
              <small className="modal-help">
                Due: {new Date(dueDateLocal).toLocaleString()}
              </small>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="task-status">
              Status
            </label>
            <select
              id="task-status"
              className="modal-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusProp)}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <label className="modal-check">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
            Mark as important
          </label>

          <div className="modal-actions">
            <button type="button" className="modal-btn" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" className="modal-btn primary">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

import { useRef, useState, type FormEvent } from "react";
import type { Task, StatusProp } from "../types/Task";

type EditTaskModalProps = {
  task: Task;
  onEditTask: (task: Task) => void;
  closeModal: () => void;
};

const EditTaskModal = ({
  task,
  onEditTask,
  closeModal,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState<StatusProp>(task.status);
  const [important, setImportant] = useState(task.important);
  const [dueDateLocal, setDueDateLocal] = useState(task.dueDate ?? "");
  const [dueTimeLocal, setDueTimeLocal] = useState(task.dueTime ?? "");

  const statusOptions: StatusProp[] = ["New", "In Progress", "Completed"];
  const timeRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) return;

    const updatedTask: Task = {
      ...task,
      title: trimmedTitle,
      description: trimmedDescription,
      status,
      completed: status === "Completed",
      important,
      dueDate: dueDateLocal || undefined,
      dueTime: dueTimeLocal || undefined,
    };

    onEditTask(updatedTask);
    closeModal();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="edit-task-title" className="modal-title">
            Edit Task
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
            <label className="modal-label" htmlFor="edit-task-title-input">
              Title
            </label>
            <input
              id="edit-task-title-input"
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
            <label
              className="modal-label"
              htmlFor="edit-task-description-input"
            >
              Description
            </label>
            <textarea
              id="edit-task-description-input"
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details..."
              rows={4}
            />
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="edit-task-due-date">
              Due date (optional)
            </label>

            <div className="modal-inline">
              <input
                id="edit-task-due-date"
                type="date"
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
                Due date: {new Date(dueDateLocal).toLocaleDateString()}
              </small>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="edit-task-due-time">
              Due time (optional)
            </label>

            <div className="modal-inline">
              <input
                ref={timeRef}
                id="edit-task-due-time"
                type="time"
                className="modal-input"
                value={dueTimeLocal}
                onChange={(e) => setDueTimeLocal(e.target.value)}
              />

              <button
                type="button"
                className="modal-btn"
                onClick={() => setDueTimeLocal("")}
                disabled={!dueTimeLocal}
                title="Clear due time"
              >
                Clear
              </button>
            </div>

            {dueTimeLocal && (
              <small className="modal-help">Due time: {dueTimeLocal}</small>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="edit-task-status">
              Status
            </label>
            <select
              id="edit-task-status"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

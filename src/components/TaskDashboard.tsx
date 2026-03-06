import type React from "react";
import { useState } from "react";
import TaskList from "../data/TaskList";
import type { Task } from "../types/Task";
import Tasks from "./Tasks";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(TaskList);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onEditTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
  };

  return (
    <article className="task-list">
      <section className="task-list-header">
        <h2 className="title">Your Task List</h2>

        <button
          type="button"
          className="add-btn btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Task
        </button>
      </section>

      {isAddModalOpen && (
        <AddTaskModal
          onAddTask={addTask}
          closeModal={() => setIsAddModalOpen(false)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          key={editingTask.id}
          task={editingTask}
          onEditTask={onEditTask}
          closeModal={() => setEditingTask(null)}
        />
      )}

      <Tasks
        tasks={tasks}
        onDeleteTask={deleteTask}
        onEditClick={(task) => setEditingTask(task)}
      />
    </article>
  );
};

export default TaskDashboard;

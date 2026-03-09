import type React from "react";
import { useState } from "react";
import type { Task } from "../types/Task";
import Tasks from "./Tasks";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useTaskContext } from "../context/TaskContext";

const TaskDashboard: React.FC = () => {
  const { tasks, addTask, deleteTask, updateTask, cycleStatus } =
    useTaskContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const onEditTask = (updated: Task) => {
    updateTask(updated);
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
        onCycleStatus={cycleStatus}
      />
    </article>
  );
};

export default TaskDashboard;

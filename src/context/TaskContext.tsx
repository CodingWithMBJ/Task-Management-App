import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Task, StatusProp } from "../types/Task";
import TaskList from "../data/TaskList";

const TASKS_KEY = "sessionTasks";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
  toggleCompleted: (id: number) => void;
  toggleImportant: (id: number) => void;
  cycleStatus: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const statusOrder: StatusProp[] = ["New", "In Progress", "Completed"];

function getStoredTasks(): Task[] {
  if (typeof window === "undefined") {
    return TaskList;
  }

  try {
    const stored = sessionStorage.getItem(TASKS_KEY);
    return stored ? (JSON.parse(stored) as Task[]) : TaskList;
  } catch (error) {
    console.error("Failed to load tasks from sessionStorage:", error);
    return TaskList;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => getStoredTasks());

  useEffect(() => {
    try {
      sessionStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to sessionStorage:", error);
    }
  }, [tasks]);

  const addTask = (task: Task): void => {
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const toggleCompleted = (id: number): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "Completed" : "In Progress",
            }
          : task,
      ),
    );
  };

  const toggleImportant = (id: number): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task,
      ),
    );
  };

  const cycleStatus = (id: number): void => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];

        return {
          ...task,
          status: nextStatus,
          completed: nextStatus === "Completed",
        };
      }),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        toggleCompleted,
        toggleImportant,
        cycleStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
}

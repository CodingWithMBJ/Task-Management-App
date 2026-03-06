import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { Task, StatusProp } from "../types/Task";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useScreenSize } from "../hooks/useScreenSize";

export type TasksOutletContext = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleCompleteTask: (id: number) => void;
  toggleImportantTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateStatus: (id: number, status: StatusProp) => void;
};

const PageLayout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDesktop } = useScreenSize();

  // ✅ shared tasks state
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleMenuToggle = (): void => setShowMenu((p) => !p);

  const addTask = (task: Task): void => {
    setTasks((prev) => [task, ...prev]);
  };

  const toggleCompleteTask = (id: number): void => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const toggleImportantTask = (id: number): void => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t)),
    );
  };

  const deleteTask = (id: number): void => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateStatus = (id: number, status: StatusProp): void => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="wrapper max-h-screen w-screen flex-1 m-auto">
      {!isDesktop && <Header handleMenuToggle={handleMenuToggle} />}
      <SideBar showMenu={showMenu} closeMenu={() => setShowMenu(false)} />

      <main className="main">
        <Outlet
          context={
            {
              tasks,
              addTask,
              toggleCompleteTask,
              toggleImportantTask,
              deleteTask,
              updateStatus,
            } satisfies TasksOutletContext
          }
        />
      </main>
    </div>
  );
};

export default PageLayout;

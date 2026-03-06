import TaskList from "../components/TaskDashboard";
import { useTasksOutlet } from "../hooks/useTasksOutlet";

const Home: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleCompleteTask,
    toggleImportantTask,
    deleteTask,
    updateStatus,
  } = useTasksOutlet();

  return (
    <section className="home all-task section">
      <TaskList
        tasks={tasks}
        addTask={addTask}
        toggleCompleteTask={toggleCompleteTask}
        toggleImportantTask={toggleImportantTask}
        deleteTask={deleteTask}
        updateStatus={updateStatus}
      />
    </section>
  );
};

export default Home;

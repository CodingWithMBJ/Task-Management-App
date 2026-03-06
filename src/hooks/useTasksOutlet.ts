import { useOutletContext } from "react-router-dom";
import type { TasksOutletContext } from "../layouts/PageLayout";

export const useTasksOutlet = () => useOutletContext<TasksOutletContext>();

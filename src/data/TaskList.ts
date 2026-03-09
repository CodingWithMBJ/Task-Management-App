import type { Task } from "../types/Task";

const TaskList: Task[] = [
  {
    id: 1,
    title: "Learn Typescript",
    description: "Learning on CodingTemple",
    status: "New",
    completed: true,
    important: true,
    dueDate: "2025-01-15",
    dueTime: "10:00 PM",
  },
  {
    id: 2,
    title: "Learn Typescript",
    description: "Learning on CodingTemple",
    status: "New",
    completed: false,
    important: true,
    dueDate: "2025-01-15",
    dueTime: "10:00 PM",
  },
  {
    id: 3,
    title: "Learn Typescript",
    description: "Learning on CodingTemple",
    status: "New",
    completed: true,
    important: false,
    dueDate: "2025-01-15",
    dueTime: "10:00 PM",
  },
];

export default TaskList;

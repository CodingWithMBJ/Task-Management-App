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
  },
  {
    id: 2,
    title: "Learn Typescript",
    description: "Learning on CodingTemple",
    status: "New",
    completed: false,
    important: true,
  },
  {
    id: 3,
    title: "Learn Typescript",
    description: "Learning on CodingTemple",
    status: "New",
    completed: true,
    important: false,
  },
];

export default TaskList;

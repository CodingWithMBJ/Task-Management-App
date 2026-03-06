export type StatusProp = "New" | "In Progress" | "Completed";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: StatusProp;
  completed: boolean;
  important: boolean;
  dueDate?: string; // ISO string
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  completed: boolean;
  important: boolean;
};

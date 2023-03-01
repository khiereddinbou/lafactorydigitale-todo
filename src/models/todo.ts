export interface TodoModel {
  id: number;
  title: string;
  completed: boolean;
  todoId?: number;
  description?: string;
  endDate?: string;
}

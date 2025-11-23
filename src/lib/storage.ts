import { Todo } from "@/components/TodoItem";

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
}

const TODOS_KEY = "study-planner-todos";
const GOALS_KEY = "study-planner-goals";

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const loadGoals = (): Goal[] => {
  try {
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveGoals = (goals: Goal[]) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

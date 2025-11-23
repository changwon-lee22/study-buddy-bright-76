import { Check, X, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export interface Todo {
  id: string;
  title: string;
  subject: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  date: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground",
};

const priorityLabels = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Card
      className={`p-4 flex items-center gap-3 shadow-card hover:shadow-soft transition-all duration-300 animate-fade-in-up ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
      
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          todo.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground hover:border-primary"
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-primary-foreground" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate ${
            todo.completed ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {todo.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className="text-xs">
            {todo.subject}
          </Badge>
          <Badge className={`text-xs ${priorityColors[todo.priority]}`}>
            {priorityLabels[todo.priority]}
          </Badge>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </Button>
    </Card>
  );
};

export default TodoItem;

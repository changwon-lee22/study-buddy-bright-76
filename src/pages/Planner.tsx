import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import TodoItem, { Todo } from "@/components/TodoItem";
import { loadTodos, saveTodos } from "@/lib/storage";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const subjects = ["수학", "영어", "국어", "과학", "사회", "기타"];

const Planner = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoSubject, setNewTodoSubject] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<"high" | "medium" | "low">("medium");

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const filteredTodos = todos.filter((todo) => todo.date === selectedDateString);

  const handleAddTodo = () => {
    if (!newTodoTitle.trim() || !newTodoSubject) {
      toast.error("제목과 과목을 입력해주세요!");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle.trim(),
      subject: newTodoSubject,
      priority: newTodoPriority,
      completed: false,
      date: selectedDateString,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    
    setNewTodoTitle("");
    setNewTodoSubject("");
    setNewTodoPriority("medium");
    
    toast.success("할 일이 추가되었어요! ✨");
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    toast.success("할 일이 삭제되었어요");
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            플래너
          </h1>
          <p className="text-muted-foreground">일정을 관리하고 할 일을 추가해보세요 📅</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-lg border shadow-soft"
            />
          </Card>

          <div className="space-y-6">
            <Card className="p-6 shadow-card animate-fade-in-up">
              <h2 className="text-lg font-semibold mb-4">할 일 추가</h2>
              <div className="space-y-4">
                <Input
                  placeholder="할 일을 입력하세요"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Select value={newTodoSubject} onValueChange={setNewTodoSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="과목 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newTodoPriority} onValueChange={(value: any) => setNewTodoPriority(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="우선순위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">높음</SelectItem>
                      <SelectItem value="medium">보통</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddTodo} className="w-full gradient-primary border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  추가하기
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-card animate-fade-in-up">
              <h2 className="text-lg font-semibold mb-4">
                {selectedDate.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">이 날짜에 할 일이 없어요</p>
                  <p className="text-sm text-muted-foreground mt-1">위에서 할 일을 추가해보세요!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggleTodo}
                      onDelete={handleDeleteTodo}
                    />
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;

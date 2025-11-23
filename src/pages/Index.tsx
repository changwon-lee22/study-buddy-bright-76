import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ProgressChart from "@/components/ProgressChart";
import MotivationCard from "@/components/MotivationCard";
import TodoItem, { Todo } from "@/components/TodoItem";
import { loadTodos, saveTodos } from "@/lib/storage";
import { BookOpen, CheckCircle2 } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayTodos = todos.filter((todo) => todo.date === today);
  const completedToday = todayTodos.filter((todo) => todo.completed).length;
  const totalToday = todayTodos.length;

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
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            스터디 플래너
          </h1>
          <p className="text-muted-foreground">오늘도 열심히 공부해볼까요? 📚</p>
        </div>

        <div className="grid gap-6 mb-8">
          <MotivationCard />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">오늘의 진행률</h2>
              </div>
              <div className="flex justify-center">
                <ProgressChart completed={completedToday} total={totalToday} />
              </div>
            </Card>

            <Card className="p-6 shadow-card animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-lg font-semibold">학습 통계</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">오늘 할 일</span>
                    <span className="font-semibold">{totalToday}개</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all duration-500"
                      style={{ width: `${totalToday > 0 ? (completedToday / totalToday) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">완료한 할 일</span>
                    <span className="font-semibold text-success">{completedToday}개</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">남은 할 일</span>
                    <span className="font-semibold text-warning">{totalToday - completedToday}개</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 shadow-card animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">오늘 할 일</h2>
          {todayTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">오늘 할 일이 없어요</p>
              <p className="text-sm text-muted-foreground mt-1">플래너 페이지에서 할 일을 추가해보세요!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTodos.map((todo) => (
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
  );
};

export default Index;

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { Goal, loadGoals, saveGoals } from "@/lib/storage";
import { Plus, Target, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: 0,
    deadline: "",
  });

  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.title.trim() || newGoal.target <= 0) {
      toast.error("목표 이름과 목표 횟수를 입력해주세요!");
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      description: newGoal.description.trim(),
      target: newGoal.target,
      current: 0,
      deadline: newGoal.deadline,
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
    
    setNewGoal({ title: "", description: "", target: 0, deadline: "" });
    setShowAddForm(false);
    toast.success("목표가 추가되었어요! 🎯");
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
    toast.success("목표가 삭제되었어요");
  };

  const handleUpdateProgress = (id: string, increment: number) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? { ...goal, current: Math.max(0, Math.min(goal.target, goal.current + increment)) }
        : goal
    );
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            목표 관리
          </h1>
          <p className="text-muted-foreground">나만의 학습 목표를 설정하고 달성해보세요 🎯</p>
        </div>

        <Card className="p-6 shadow-card mb-6 animate-fade-in-up">
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full gradient-primary border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              새 목표 추가
            </Button>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">새 목표 추가</h2>
              <Input
                placeholder="목표 이름 (예: 수학 문제 풀기)"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
              <Textarea
                placeholder="목표 설명 (선택사항)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">목표 횟수</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={newGoal.target || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">마감일</label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddGoal} className="flex-1 gradient-primary border-0">
                  추가
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                  취소
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-4">
          {goals.length === 0 ? (
            <Card className="p-12 text-center shadow-card animate-fade-in-up">
              <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">아직 설정한 목표가 없어요</p>
              <p className="text-sm text-muted-foreground mt-1">위에서 새 목표를 추가해보세요!</p>
            </Card>
          ) : (
            goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const isCompleted = goal.current >= goal.target;
              
              return (
                <Card key={goal.id} className="p-6 shadow-card animate-fade-in-up">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${isCompleted ? "bg-success/10" : "bg-primary/10"}`}>
                        {isCompleted ? (
                          <Target className="w-5 h-5 text-success" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{goal.title}</h3>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        )}
                        {goal.deadline && (
                          <p className="text-xs text-muted-foreground mt-2">
                            마감일: {new Date(goal.deadline).toLocaleDateString("ko-KR")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">진행률</span>
                      <span className="font-semibold">
                        {goal.current} / {goal.target} ({Math.round(progress)}%)
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  {!isCompleted && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateProgress(goal.id, -1)}
                        disabled={goal.current === 0}
                        className="flex-1"
                      >
                        -1
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateProgress(goal.id, 1)}
                        className="flex-1 gradient-primary border-0"
                      >
                        +1
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-center py-2 bg-success/10 rounded-lg">
                      <p className="text-success font-semibold">🎉 목표 달성!</p>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;

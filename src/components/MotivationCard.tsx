import { Sparkles } from "lucide-react";
import { Card } from "./ui/card";

const motivationMessages = [
  "오늘도 화이팅! 🎯",
  "꾸준히 하는 당신이 멋져요! ✨",
  "목표를 향해 한 걸음씩! 🚀",
  "잘하고 있어요! 계속 가요! 💪",
  "노력하는 당신을 응원해요! 🌟",
];

const MotivationCard = () => {
  const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];

  return (
    <Card className="gradient-accent p-6 shadow-card animate-fade-in-up border-0">
      <div className="flex items-center gap-3">
        <div className="bg-accent-foreground/10 p-3 rounded-full">
          <Sparkles className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <p className="text-lg font-bold text-accent-foreground">{randomMessage}</p>
          <p className="text-sm text-accent-foreground/80">오늘의 목표를 이뤄보세요</p>
        </div>
      </div>
    </Card>
  );
};

export default MotivationCard;

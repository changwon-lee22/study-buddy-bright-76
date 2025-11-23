import { NavLink } from "@/components/NavLink";
import { Home, Calendar, Target } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "홈" },
    { to: "/planner", icon: Calendar, label: "플래너" },
    { to: "/goals", icon: Target, label: "목표" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-medium z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-muted-foreground hover:text-primary"
              activeClassName="text-primary bg-primary/10"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

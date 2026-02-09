import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Sword, 
  Scroll, 
  Trophy, 
  User, 
  Menu,
  Battery,
  Wifi,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GameHUDProps {
  children: ReactNode;
}

export function GameHUD({ children }: GameHUDProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);

  // Fake battery drain effect
  useEffect(() => {
    const timer = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev - (Math.random() * 0.5)));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: "Bio", path: "/", icon: User },
    { label: "Quests", path: "/experience", icon: Scroll },
    { label: "Missions", path: "/projects", icon: Sword },
    { label: "Abilities", path: "/skills", icon: Cpu },
    { label: "Trophies", path: "/achievements", icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden font-mono bg-background text-foreground scanlines">
      {/* HUD HEADER (Mobile) / SIDEBAR (Desktop) */}
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 border-b border-primary/20 backdrop-blur-sm p-4 flex justify-between items-center h-16">
        <div className="font-display font-bold text-primary animate-pulse">SYS.OS v2.0</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-primary hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-primary/20 bg-background/50 backdrop-blur-md h-screen fixed left-0 top-0 z-40 p-6 justify-between">
        <div>
          <div className="mb-10 pt-4">
            <h1 className="font-display text-2xl font-bold text-primary glitch-text" data-text="DEV.PORTFOLIO">
              DEV.PORTFOLIO
            </h1>
            <p className="text-xs text-muted-foreground mt-1">SYSTEM ONLINE</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <div className={cn(
                    "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 group relative overflow-hidden",
                    isActive 
                      ? "text-background bg-primary font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  )}>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                      />
                    )}
                    <Icon className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* HUD Stats */}
        <div className="space-y-4 border-t border-primary/20 pt-6">
          <div className="flex justify-between items-center text-xs text-primary/70">
            <span className="flex items-center gap-2"><Battery className="w-4 h-4" /> PWR</span>
            <span>{Math.floor(batteryLevel)}%</span>
          </div>
          <div className="h-1 bg-primary/20 w-full">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${batteryLevel}%` }} />
          </div>
          
          <div className="flex justify-between items-center text-xs text-primary/70">
            <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> NET</span>
            <span className="animate-pulse">CONNECTED</span>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="md:hidden fixed inset-0 z-40 bg-background pt-20 px-6"
          >
            <nav className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <div 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 border border-primary/20 bg-primary/5",
                        location === item.path ? "border-primary bg-primary/20 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-lg font-display uppercase">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen pt-16 md:pt-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 pointer-events-none md:block hidden" />
      <div className="fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 pointer-events-none md:block hidden" />
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 pointer-events-none md:block hidden" />
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 pointer-events-none md:block hidden" />
    </div>
  );
}

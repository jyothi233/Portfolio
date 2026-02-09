import { Skill } from "@shared/schema";
import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";

interface SkillHexProps {
  skill: Skill;
  index: number;
}

export function SkillHex({ skill, index }: SkillHexProps) {
  // Level represents 1-5
  const level = skill.proficiency || 1;
  const isMaxed = level === 5;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05, type: "spring" }}
      className="relative flex flex-col items-center justify-center p-4 aspect-square group"
    >
      {/* Background Hex */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity">
          <polygon 
            points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
            fill="currentColor" 
            className={isMaxed ? "text-accent" : "text-primary"} 
          />
        </svg>
      </div>
      
      {/* Border Hex */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={isMaxed ? "text-accent animate-pulse" : "text-primary/50"} 
          />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <div className="font-display font-bold text-sm md:text-base mb-1 tracking-wider">
          {skill.name}
        </div>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div 
              key={star} 
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                star <= level 
                  ? isMaxed ? "bg-accent shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "bg-primary shadow-[0_0_5px_rgba(6,182,212,0.8)]" 
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Project } from "@shared/schema";
import { ExternalLink, Code2, TrendingUp } from "lucide-react";
import { CyberButton } from "./CyberButton";

interface MissionCardProps {
  mission: Project;
  index: number;
}

export function MissionCard({ mission, index }: MissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card/30 border border-primary/20 p-1 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
      
      <div className="bg-black/40 p-5 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs text-secondary font-mono mb-1">MISSION_ID: 00{mission.order}</div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
              {mission.title}
            </h3>
            {mission.role && <div className="text-sm text-muted-foreground">{mission.role}</div>}
          </div>
          <Code2 className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors" />
        </div>

        <p className="text-sm text-primary/70 mb-6 flex-grow">
          {mission.description}
        </p>

        {/* Tech Stack Chips */}
        {mission.techStack && (
          <div className="flex flex-wrap gap-2 mb-6">
            {mission.techStack.map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs font-mono bg-primary/10 border border-primary/20 text-primary">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Rewards Section */}
        {mission.metrics && (
          <div className="mb-6 bg-accent/5 border border-accent/20 p-3">
            <div className="flex items-center gap-2 text-xs text-accent font-bold uppercase mb-2">
              <TrendingUp className="w-3 h-3" /> Mission Rewards
            </div>
            <ul className="text-xs space-y-1">
              {mission.metrics.map((metric, i) => (
                <li key={i} className="text-accent/80 flex items-start gap-2">
                  <span>+</span> {metric}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-white/5">
          {mission.link ? (
            <a href={mission.link} target="_blank" rel="noopener noreferrer" className="block w-full">
              <CyberButton className="w-full flex items-center justify-center gap-2">
                Deploy <ExternalLink className="w-4 h-4" />
              </CyberButton>
            </a>
          ) : (
            <CyberButton disabled className="w-full opacity-50 cursor-not-allowed">
              Classified
            </CyberButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}

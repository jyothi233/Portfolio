import { motion } from "framer-motion";
import { Experience } from "@shared/schema";
import { Shield, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestCardProps {
  quest: Experience;
  index: number;
}

export function QuestCard({ quest, index }: QuestCardProps) {
  const isPresent = !quest.endDate;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-primary/20 last:pb-0"
    >
      {/* Timeline Node */}
      <div className={cn(
        "absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 bg-background transition-colors",
        isPresent ? "border-accent bg-accent animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "border-primary"
      )} />

      <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-sm hover:border-primary/50 transition-colors group">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              {quest.role}
            </h3>
            <div className="text-lg text-primary/80 font-semibold">{quest.company}</div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className={cn(isPresent && "text-accent font-bold")}>
                {quest.startDate} - {quest.endDate || "PRESENT"}
              </span>
            </div>
            {quest.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {quest.location}
              </div>
            )}
          </div>
        </div>

        {quest.description && (
          <div className="space-y-2 mt-4">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-border w-fit">Quest Objectives</h4>
            <ul className="space-y-2">
              {quest.description.map((item, i) => (
                <li key={i} className="text-sm md:text-base text-primary/80 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

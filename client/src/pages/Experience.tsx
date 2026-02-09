import { useExperiences } from "@/hooks/use-game-data";
import { QuestCard } from "@/components/QuestCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  const { data: experiences, isLoading } = useExperiences();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 border-b border-primary/20 pb-6">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Quest Log</h1>
        <p className="text-primary/60 font-mono">TRACKING CAREER PROGRESSION</p>
      </header>

      <div className="relative">
        {/* Continuous timeline line */}
        <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-primary/20" />
        
        <div className="space-y-8">
          {experiences?.map((exp, index) => (
            <QuestCard key={exp.id} quest={exp} index={index} />
          ))}

          {/* Start Point */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative pl-8 pt-4"
          >
            <div className="absolute left-[3px] top-6 w-3 h-3 rounded-full bg-primary/50" />
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Game Started
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { useAchievements } from "@/hooks/use-game-data";
import { Loader2, Award, Star, Medal } from "lucide-react";
import { motion } from "framer-motion";

export default function Achievements() {
  const { data: achievements, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <header className="mb-12 border-b border-primary/20 pb-6">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Trophy Room</h1>
        <p className="text-primary/60 font-mono">UNLOCKED BADGES & CERTIFICATIONS</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements?.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 bg-gradient-to-br from-card/50 to-transparent border border-white/5 hover:border-accent/50 group transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="w-24 h-24 rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/50 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all">
                {achievement.type === "Award" ? <Star className="w-6 h-6" /> : <Medal className="w-6 h-6" />}
              </div>

              <div className="text-xs text-accent uppercase tracking-wider mb-1">
                {achievement.type}
              </div>
              
              <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {achievement.title}
              </h3>
              
              <div className="text-sm text-muted-foreground mb-4">
                {achievement.issuer}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-primary/70">
                <span>UNLOCKED</span>
                <span>{achievement.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

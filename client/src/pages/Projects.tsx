import { useProjects } from "@/hooks/use-game-data";
import { MissionCard } from "@/components/MissionCard";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <header className="mb-12 border-b border-primary/20 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Missions</h1>
          <p className="text-primary/60 font-mono">DEPLOYED PROJECTS & SIDE QUESTS</p>
        </div>
        <div className="hidden md:block text-right font-mono text-xs text-muted-foreground">
          TOTAL_MISSIONS: {projects?.length || 0}<br/>
          STATUS: ACTIVE
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((project, index) => (
          <MissionCard key={project.id} mission={project} index={index} />
        ))}
      </div>
    </div>
  );
}

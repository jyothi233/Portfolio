import { useSkills } from "@/hooks/use-game-data";
import { SkillHex } from "@/components/SkillHex";
import { Loader2, Cpu, MessageSquare, Zap } from "lucide-react";
import { Skill } from "@shared/schema";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>) || {};

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "active":
      case "technical": return <Cpu className="w-5 h-5" />;
      case "passive":
      case "soft skills": return <MessageSquare className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <header className="mb-12 border-b border-primary/20 pb-6">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Ability Tree</h1>
        <p className="text-primary/60 font-mono">AVAILABLE UPGRADES & PROFICIENCIES</p>
      </header>

      <div className="space-y-16">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/20 rounded-full text-primary">
                {getCategoryIcon(category)}
              </div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-secondary">
                {category}
              </h2>
              <div className="h-px bg-secondary/30 flex-grow" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categorySkills.map((skill, index) => (
                <SkillHex key={skill.id} skill={skill} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

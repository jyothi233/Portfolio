import { useProfile } from "@/hooks/use-game-data";
import { CyberButton } from "@/components/CyberButton";
import { Terminal } from "@/components/Terminal";
import { Loader2, Lock, Mail, Github, Linkedin, Award, Cpu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: profile, isLoading } = useProfile();
  const [showContact, setShowContact] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);

  const handleDecrypt = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDecryptionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setShowContact(true);
      }
    }, 50);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4 mx-auto" />
          <p className="font-mono text-primary animate-pulse">INITIALIZING...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 mb-4 border border-accent/50 text-accent font-mono text-xs bg-accent/10 rounded-sm">
            CLASS: {profile.title.toUpperCase()}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white glitch-text" data-text={profile.name}>
            {profile.name}
          </h1>
          
          <div className="max-w-2xl">
            <Terminal 
              lines={[
                "Loading user bio...",
                "Decrypting personality core...",
                ...profile.bio.split(". ").map(s => s.trim() + ".")
              ]}
              className="mb-8"
            />
          </div>

          {/* Stats Grid */}
          {profile.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {profile.stats.map((stat, i) => (
                <div key={i} className="bg-card/20 border border-primary/20 p-3 rounded-sm">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="font-mono text-xl text-secondary font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <CyberButton onClick={() => document.getElementById('contact-module')?.scrollIntoView({ behavior: 'smooth' })}>
              Connect
            </CyberButton>
            <a href="/Profile_(3)_1770611063110.pdf" target="_blank" download>
              <CyberButton variant="secondary">
                Download Data
              </CyberButton>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Decorative Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Contact Module */}
      <section id="contact-module" className="max-w-xl mx-auto border border-primary/30 bg-black/40 p-8 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
          <Mail className="text-primary" /> COMMS_LINK
        </h2>

        {!showContact ? (
          <div className="text-center py-8 space-y-4">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-mono text-muted-foreground">CONTACT_INFO ENCRYPTED</p>
            
            {decryptionProgress > 0 && (
              <div className="w-full max-w-xs mx-auto h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-75" 
                  style={{ width: `${decryptionProgress}%` }}
                />
              </div>
            )}

            <CyberButton 
              variant="secondary" 
              onClick={handleDecrypt}
              disabled={decryptionProgress > 0}
            >
              {decryptionProgress > 0 ? "DECRYPTING..." : "DECRYPT DATA"}
            </CyberButton>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid gap-4">
              <a href="mailto:contact@example.com" className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/20 p-2 rounded-full text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase">Email</div>
                  <div className="font-mono">Decrypt to view</div>
                </div>
              </a>
              
              <a href="https://github.com" target="_blank" rel="noopener" className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/20 p-2 rounded-full text-primary group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase">Code Repository</div>
                  <div className="font-mono">github.com/username</div>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener" className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/20 p-2 rounded-full text-primary group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase">Network</div>
                  <div className="font-mono">linkedin.com/in/username</div>
                </div>
              </a>
            </div>
            
            <div className="text-xs text-center text-muted-foreground mt-6 font-mono">
              SECURE CONNECTION ESTABLISHED
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}

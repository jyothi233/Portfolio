import { CyberButton } from "@/components/CyberButton";
import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground scanlines p-4">
      <div className="max-w-md w-full border-2 border-destructive p-8 bg-black/50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
        
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
        
        <h1 className="text-4xl font-display font-bold text-destructive mb-2 glitch-text" data-text="ERROR 404">
          ERROR 404
        </h1>
        
        <p className="font-mono text-destructive/80 mb-8">
          SECTOR NOT FOUND. THE REQUESTED DATA FRAGMENT IS CORRUPTED OR DOES NOT EXIST.
        </p>

        <Link href="/">
          <CyberButton variant="danger" className="w-full">
            RETURN TO BASE
          </CyberButton>
        </Link>
      </div>
    </div>
  );
}

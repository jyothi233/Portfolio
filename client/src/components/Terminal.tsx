import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  lines: string[];
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export function Terminal({ lines, typingSpeed = 30, onComplete, className }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = '';
          }
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next line after pause
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, onComplete]);

  return (
    <div className={`font-mono text-sm md:text-base p-6 rounded-sm bg-black/80 border border-primary/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}>
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="text-xs text-white/30 ml-auto">bash --login</span>
      </div>
      
      <div className="space-y-1">
        {displayedLines.map((line, i) => (
          <div key={i} className="break-words">
            <span className="text-secondary mr-2">$</span>
            <span className="text-primary/90">{line}</span>
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary align-middle ml-1"
          />
        )}
      </div>
    </div>
  );
}

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function CyberButton({ 
  children, 
  className, 
  variant = "primary", 
  disabled,
  ...props 
}: CyberButtonProps) {
  const variants = {
    primary: "bg-primary/20 text-primary border-primary hover:bg-primary hover:text-primary-foreground",
    secondary: "bg-secondary/20 text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground",
    danger: "bg-destructive/20 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground",
    ghost: "bg-transparent text-muted-foreground border-transparent hover:text-primary hover:bg-primary/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      className={cn(
        "relative px-6 py-2 border-2 uppercase font-display tracking-wider text-sm font-bold transition-all duration-200 clip-path-button",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-inherit",
        className
      )}
      style={{
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
      }}
      {...props}
    >
      {/* Decorative corner accents */}
      {!disabled && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
        </>
      )}
      
      {children}
    </motion.button>
  );
}

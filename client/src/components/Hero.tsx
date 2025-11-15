import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  height?: string;
}

export default function Hero({
  backgroundImage,
  title,
  subtitle,
  children,
  height = "h-[70vh]"
}: HeroProps) {
  return (
    <div className={`relative ${height} flex items-center justify-center`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

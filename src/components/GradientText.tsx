import React, { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className="z-2 bg-clip-text text-transparent bg-cover animate-gradient"
      style={{
        ...gradientStyle,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "300% 100%",
      }}
    >
      {children}
    </span>
  );
}

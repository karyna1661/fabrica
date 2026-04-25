import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover = false,
}: {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("brutal-card", hover && "brutal-card-hover", className)}>
      {children}
    </div>
  );
}

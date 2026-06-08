import { cn } from "@/utils"
import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string
}

export const Card = ({
  className,
  contentClassName,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-none bg-card border border-foreground/10 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.02)] text-card-foreground transition-all duration-200 hover:shadow-[4px_4px_0_0_#DC143C] hover:border-primary",
        className
      )}
      {...props}
    >
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-xs font-mono uppercase tracking-wider font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#111111] dark:hover:shadow-[3px_3px_0_0_#FFF7CD]",
        destructive:
          "bg-rose-600 text-white border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#111111]",
        outline:
          "border border-foreground/10 bg-background text-foreground shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] hover:bg-foreground/5",
        secondary:
          "bg-secondary text-secondary-foreground border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] hover:bg-secondary/95",
        ghost: "hover:bg-foreground/5 text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-[10px]",
        lg: "h-12 px-8 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

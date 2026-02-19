"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium tracking-wide uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C09863] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#C09863] text-[#030712] hover:bg-[#D4B48A] active:bg-[#A07D4F] shadow-md hover:shadow-lg hover:shadow-[#C09863]/20",
        outline:
          "border border-[#C09863] bg-transparent text-[#C09863] hover:bg-[#C09863]/10 active:bg-[#C09863]/20",
        ghost:
          "bg-transparent text-white hover:bg-white/5 active:bg-white/10",
        link:
          "bg-transparent text-[#C09863] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

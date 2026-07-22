import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [@media(hover:hover)]:hover:enabled:opacity-90",
  {
    variants: {
      variant: {
        primary: "bg-(--color-accent) text-white",
        outline: "border border-(--color-accent) text-(--color-accent-strong) bg-transparent",
      },
      size: {
        default: "px-6 py-3",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };

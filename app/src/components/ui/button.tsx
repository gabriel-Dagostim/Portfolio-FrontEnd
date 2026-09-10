import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Buttons are near-square and flat, the page's structure is drawn with
 * hairlines, so controls should read as part of that grid, not as pills.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/88 active:bg-primary",
        signal:
          "bg-signal text-signal-foreground hover:bg-signal/88 active:bg-signal",
        outline:
          "border-rule-strong bg-transparent text-foreground hover:bg-surface-sunken",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/8 text-destructive hover:bg-destructive/16",
        link: "h-auto px-0 text-foreground underline decoration-rule-strong decoration-1 underline-offset-[5px] hover:decoration-primary",
      },
      size: {
        default: "h-9 px-3.5",
        sm: "h-8 px-3 text-[0.8125rem]",
        lg: "h-11 px-5 text-[0.9375rem]",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

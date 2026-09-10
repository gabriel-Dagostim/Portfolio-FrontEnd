import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Tags are rectangular chips, the same grid language as the panels. */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-xs leading-5 font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-rule text-muted-foreground",
        signal: "border-transparent bg-signal text-signal-foreground",
        muted: "border-transparent bg-surface-sunken text-muted-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
        /** Machine-readable values: stacks, codes, years. */
        data: "border-rule font-mono text-[0.6875rem] tracking-tight text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
)

function Badge({
  className,
  variant = "outline",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badgeVariants }

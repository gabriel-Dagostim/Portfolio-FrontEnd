import type { AnchorHTMLAttributes } from "react"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>

export function AnchorButton({
  className,
  variant,
  size,
  ...props
}: AnchorButtonProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

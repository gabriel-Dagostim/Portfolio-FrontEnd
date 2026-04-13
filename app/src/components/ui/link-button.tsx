import { Link, type LinkProps } from "react-router-dom"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type RouterLinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string
  }

export function RouterLinkButton({
  className,
  variant,
  size,
  ...props
}: RouterLinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

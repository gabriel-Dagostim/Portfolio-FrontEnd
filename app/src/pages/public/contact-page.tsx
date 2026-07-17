import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  Mail,
  Code2,
  Briefcase,
  MessageCircle,
  Users,
  Handshake,
  MessagesSquare,
  ArrowLeftRight,
} from "lucide-react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { AnchorButton } from "@/components/ui/anchor-button"
import { CvDownloadButton } from "@/components/cv/cv-download-button"
import { CONTACT } from "@/lib/contact"
import { cn } from "@/lib/utils"

function ContactAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl dark:bg-primary/20" />
      <div className="absolute -left-16 top-40 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      {/* Soft “negotiation table” plane */}
      <div className="absolute inset-x-0 top-[28%] mx-auto h-40 max-w-3xl rounded-[3rem] border border-border/40 bg-gradient-to-b from-card/40 to-transparent opacity-70 blur-[1px]" />

      {/* People / P2P motifs */}
      <motion.div
        className="absolute left-[8%] top-28 hidden text-primary/25 sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Users className="size-14" strokeWidth={1.25} />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-36 hidden text-primary/20 md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <MessagesSquare className="size-12" strokeWidth={1.25} />
      </motion.div>
      <motion.div
        className="absolute bottom-28 left-[14%] hidden text-primary/20 lg:block"
        animate={{ y: [0, -6, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <Handshake className="size-11" strokeWidth={1.25} />
      </motion.div>
      <motion.div
        className="absolute bottom-36 right-[16%] hidden text-primary/18 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <ArrowLeftRight className="size-10" strokeWidth={1.25} />
      </motion.div>

      {/* Floating avatar dots suggesting two sides talking */}
      <div className="absolute left-[22%] top-[42%] flex -rotate-6 items-center gap-3 opacity-40">
        <span className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-card/80 shadow-sm">
          <Users className="size-4 text-primary" />
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-primary/50 to-transparent" />
        <span className="rounded-2xl rounded-bl-sm border border-border/60 bg-card/70 px-3 py-1.5 text-[10px] text-muted-foreground">
          …
        </span>
      </div>
      <div className="absolute right-[20%] top-[48%] flex rotate-3 items-center gap-3 opacity-40">
        <span className="rounded-2xl rounded-br-sm border border-border/60 bg-card/70 px-3 py-1.5 text-[10px] text-muted-foreground">
          …
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-primary/50 to-transparent" />
        <span className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-card/80 shadow-sm">
          <Handshake className="size-4 text-primary" />
        </span>
      </div>
    </div>
  )
}

type ChannelProps = {
  href: string
  title: string
  detail: string
  icon: typeof Mail
  primary?: boolean
  className?: string
  external?: boolean
}

function ChannelCard({
  href,
  title,
  detail,
  icon: Icon,
  primary,
  className,
  external,
}: ChannelProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group block rounded-3xl border border-border/60 bg-card/55 p-5 backdrop-blur-md transition",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/80 hover:shadow-md",
        primary && "border-primary/30 bg-primary/5",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl",
            primary
              ? "bg-primary text-primary-foreground"
              : "bg-primary/12 text-primary",
          )}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 text-left">
          <p className="font-semibold tracking-tight text-foreground">{title}</p>
          <p className="mt-1 truncate text-sm text-muted-foreground">{detail}</p>
        </div>
      </div>
    </a>
  )
}

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden">
      <ContactAtmosphere />

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t("contact.eyebrow")}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("contact.subtitle")}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.05}>
          <div className="mx-auto flex max-w-md items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card/70">
              <Users className="size-4 text-primary" />
            </span>
            <ArrowLeftRight className="size-4 text-primary/70" />
            <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card/70">
              <Handshake className="size-4 text-primary" />
            </span>
            <p className="ml-1 text-left text-xs sm:text-sm">{t("contact.p2pHint")}</p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10" delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ChannelCard
              primary
              href={CONTACT.whatsappUrl}
              external
              title={t("contact.whatsapp")}
              detail={CONTACT.phoneDisplay}
              icon={MessageCircle}
            />
            <ChannelCard
              href={`mailto:${CONTACT.email}`}
              title={t("contact.emailCta")}
              detail={CONTACT.email}
              icon={Mail}
            />
            <ChannelCard
              href={CONTACT.githubUrl}
              external
              title={t("contact.github")}
              detail="gabriel-Dagostim"
              icon={Code2}
            />
            <ChannelCard
              href={CONTACT.linkedinUrl}
              external
              title={t("contact.linkedin")}
              detail="gabriel-dagostim"
              icon={Briefcase}
            />
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10" delay={0.12}>
          <div className="mx-auto max-w-lg rounded-[1.75rem] border border-border/60 bg-card/50 p-6 text-center backdrop-blur-md sm:p-8">
            <p className="text-sm text-muted-foreground">{t("contact.cvHint")}</p>
            <div className="mt-4 flex justify-center">
              <CvDownloadButton size="lg" />
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <AnchorButton
                size="sm"
                variant="ghost"
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-1.5 size-3.5" />
                {t("contact.whatsapp")}
              </AnchorButton>
              <AnchorButton size="sm" variant="ghost" href={`mailto:${CONTACT.email}`}>
                <Mail className="mr-1.5 size-3.5" />
                {t("contact.emailCta")}
              </AnchorButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}

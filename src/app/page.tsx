import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { IconBadge } from "@/components/icon-badge";
import { Monogram } from "@/components/illustrations";
import { ProcessLine } from "@/components/process-line";
import { SystemStack } from "@/components/system-stack";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      {/* ヒーローだけ本文の幅(672px)からはみ出させて、最大 1024px まで広げる */}
      <section
        id="hero"
        className="md:relative md:left-1/2 md:w-[min(64rem,calc(100vw-3rem))] md:-translate-x-1/2"
      >
        <div className="grid items-center gap-8 md:min-h-[68vh] md:grid-cols-[0.85fr_1.15fr] md:gap-6">
          <div className="flex flex-col gap-5">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border rounded-full shadow-sm ring-2 ring-muted">
                  <AvatarFallback className="bg-background p-2">
                    <Monogram />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{DATA.role}</span>
              </div>
            </BlurFade>
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl"
              yOffset={8}
              text={DATA.name}
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 3}
              className="text-xl font-medium tracking-tight text-balance [word-break:auto-phrase] sm:text-2xl"
              text={DATA.tagline}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="max-w-md text-pretty [word-break:auto-phrase] text-muted-foreground leading-relaxed">{DATA.heroNote}</p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={DATA.contact.social.email.url}
                  className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  メールで相談する
                </a>
                <a
                  href="#work"
                  className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors hover:bg-muted"
                >
                  仕事を見る
                </a>
              </div>
            </BlurFade>
          </div>
          <SystemStack />
        </div>
      </section>
      <section id="services">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold">お手伝いできること</h2>
          </BlurFade>
          <div className="grid gap-3 sm:grid-cols-3">
            {DATA.services.map((service, i) => (
              <BlurFade key={service.title} delay={BLUR_FADE_DELAY * 7 + i * 0.05} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-xl border p-5">
                  <div className="grid size-10 place-items-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <service.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-semibold leading-snug text-balance [word-break:auto-phrase]">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">自己紹介</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="pt-2">
              <ProcessLine />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">仕事</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">資格</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
                <div className="flex items-center gap-x-3 justify-between">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <IconBadge icon={education.icon} />
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none">{education.school}</div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs tabular-nums text-muted-foreground text-right flex-none">
                    {education.date}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">技術</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {"icon" in skill && (
                    <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                  )}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}

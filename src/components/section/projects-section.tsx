import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-6">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-xl font-bold">作ったもの</h2>
                    <p className="text-sm text-muted-foreground">
                        本業・副業のほかに、自分で企画から公開まで手がけた Web アプリです。
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {DATA.projects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className={"featured" in project ? "h-full sm:col-span-2" : "h-full"}
                        >
                            <ProjectCard
                                href={"href" in project ? project.href : undefined}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                links={project.links}
                                illustration={project.illustration}
                                featured={"featured" in project}
                                badge={"badge" in project ? project.badge : undefined}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}


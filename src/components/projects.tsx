import { PROJECTS } from "#/lib/constant";

import Project from "./project";
import Section from "./section";

export default function Projects() {
    const firstColumn = PROJECTS.filter((_, i) => i % 2 === 0);
    const secondColumn = PROJECTS.filter((_, i) => i % 2 !== 0);
    return (
        <Section className="grow flex flex-col">
            <h3 className="text-2xl font-semibold">Projects</h3>
            <div className="mt-5 flex flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-5">
                    {firstColumn.map((project) => (
                        <Project key={project.github} {...project} />
                    ))}
                </div>
                <div className="flex flex-col gap-5">
                    {secondColumn.map((project) => (
                        <Project key={project.github} {...project} />
                    ))}
                </div>
            </div>
        </Section>
    );
}

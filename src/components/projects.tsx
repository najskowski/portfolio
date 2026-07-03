import { projects } from "@/constants";
import SectionWrapper from "./section-wrapper";

export default function Projects() {
    return (
        <SectionWrapper name="Projects">
            <ul className="space-y-1.5">
                {projects.map((project) => (
                    <li key={project.link} className="whitespace-normal wrap-break-word max-w-full">
                        <a href={project.link} target="_blank" className="whitespace-normal wrap-break-word">
                            {project.name}<br /><p className="text-neutral-600 text-sm text-balance">{project.description}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </SectionWrapper>
    )
}
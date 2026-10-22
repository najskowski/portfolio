import { createFileRoute } from "@tanstack/react-router";

import AboutMe from "#/components/about-me";
import Education from "#/components/education";
import Projects from "#/components/projects";
import Skills from "#/components/skills";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <>
            <AboutMe />
            <Skills />
            <Education />
            <Projects />
        </>
    );
}

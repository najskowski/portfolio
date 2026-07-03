import AboutMe from "@/components/about-me";
import Tech from "@/components/tech";
import Projects from "@/components/projects";
import Education from "@/components/education";

export default function Home() {
    return (
        <main className="space-y-5 relative">
            <AboutMe />
            <Education />
            <Tech />
            <Projects />
        </main>
    );
}

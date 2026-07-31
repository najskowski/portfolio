import { projects } from "@/constants";

export default function Projects() {
    return (
        <main className="space-y-5 relative flex flex-col">
            {projects.map(({ link, name, description }) => (
                <div key={link} className="whitespace-normal wrap-break-word max-w-full">
                    <a href={link} target="_blank" className="whitespace-normal wrap-break-word">
                        {name}
                        <br />
                        <p className="text-neutral-600 text-sm text-balance">{description}</p>
                    </a>
                </div>
            ))}
        </main>
    );
}

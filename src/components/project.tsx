import { IoLogoGithub } from "react-icons/io5";

type ProjectProps = {
    title: string;
    description: string;
    github: string;
};

export default function Project({ title, description, github }: ProjectProps) {
    return (
        <div className="flex flex-col border border-neutral-300 dark:border-neutral-700 p-5 h-fit">
            <div>
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
            <p className="mt-3 grow text-pretty text-neutral-600 dark:text-neutral-400">
                {description}
            </p>
            <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500"
            >
                <IoLogoGithub size={20} />
                <span className="max-w-55 truncate">{github.split("/").slice(3).join("/")}</span>
            </a>
        </div>
    );
}

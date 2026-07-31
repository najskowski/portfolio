import { BsEnvelopeFill, BsDiscord, BsGithub } from "react-icons/bs";

export default function Socials() {
    return (
        <section className="w-full flex flex-col md:flex-row justify-evenly">
            <span className="flex items-center gap-1.5">
                [ <BsEnvelopeFill /> hiprakaro@gmail.com ]
            </span>
            <span className="flex items-center gap-1.5">
                [ <BsDiscord /> nskowy ]
            </span>
            <a
                href="https://github.com/najskowski"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-1.5"
            >
                [ <BsGithub /> najskowski ]
            </a>
        </section>
    );
}

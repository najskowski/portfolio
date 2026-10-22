import { BsDiscord } from "react-icons/bs";
import { IoLogoGithub, IoMailSharp } from "react-icons/io5";

import Section from "./section";

export default function AboutMe() {
    return (
        <Section className="grid grid-cols-3">
            <div className="col-span-2">
                <h3 className="text-2xl font-semibold">About me</h3>
                <p className="mt-5 text-lg text-pretty">
                    I'm Karol, {new Date().getFullYear() - 2006}y.o. (coding since 14) full-stack
                    developer from Lublin, Poland{" "}
                    <img src="/flag.svg" className="inline mb-1" width={24} height={24} alt="Polish flag" />
                </p>
            </div>
            <div className="text-right flex flex-col justify-end items-end text-sm">
                <div className="flex items-center gap-1 text-[#5865F2]">
                    <span>nskowy</span>
                    <BsDiscord size={16} color="#5865F2" />
                </div>
                <a
                    href="https://github.com/najskowski"
                    about="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                >
                    <span>najskowski</span>
                    <IoLogoGithub size={16} />
                </a>
                <div className="flex items-center gap-1">
                    <span>hiprakaro@gmail.com</span>
                    <IoMailSharp size={16} />
                </div>
            </div>
        </Section>
    );
}

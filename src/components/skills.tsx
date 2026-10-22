import Section from "./section";

const SKILLS = [
    { name: "React", icon: "/react_light.svg", width: 22 },
    { name: "TanStack Start", icon: "/tanstack_light.svg", width: 16, invert: true },
    { name: "TypeScript", icon: "/typescript.svg", width: 20 },
    { name: "Bun / Node", icon: "/bun.svg", width: 22 },
    {
        name: "Solidity",
        icon: "/solidity.svg",
        width: 24,
        invert: true,
    },
    { name: "Better Auth", icon: "/better-auth_light.svg", width: 18 },
    { name: "MySQL", icon: "/mysql-icon-light.svg", width: 16 },
    { name: "Linux", icon: "/linux.svg", width: 18 },
];

export default function Skills() {
    return (
        <Section>
            <h3 className="text-2xl font-semibold">Skills</h3>
            <div className="mt-5 grid grid-cols-2 border border-neutral-300 dark:border-neutral-700 p-px">
                {SKILLS.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-1 p-1.5">
                        <div className="aspect-square h-full flex items-center justify-center">
                            <img
                                src={skill.icon}
                                width={skill.width}
                                height={skill.width}
                                alt={`${skill.name} logo`}
                                className="shrink-0"
                                loading="lazy"
                            />
                        </div>
                        <span>{skill.name}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
}

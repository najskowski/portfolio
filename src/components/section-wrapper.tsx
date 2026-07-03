import type { ReactNode } from "react";

type SectionWrapperProps = {
    children: ReactNode;
    name: string;
};

export default function SectionWrapper({
    children,
    name,
}: SectionWrapperProps) {
    return (
        <section aria-label={name}>
            <div className="text-sm italic">{`<!-- ${name} -->`}</div>
            <div className="py-1.5 text-pretty">{children}</div>
            {/*<div className="text-sm">{`</${name}>`}</div>*/}
        </section>
    );
}

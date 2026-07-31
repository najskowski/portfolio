import SectionWrapper from "./section-wrapper";

export default function Tech() {
    return (
        <SectionWrapper name="Tech stack">
            <ul>
                <li className="text-neutral-600 text-sm">{"//"} Frontend</li>
                <li>React.js, Next.js, Tanstack Start, Typescript</li>
                <li className="text-neutral-600 text-sm">{"//"} Backend & data</li>
                <li>MySQL, PostgreSQL, ORMs like Prisma</li>
                <li className="text-neutral-600 text-sm">{"//"} Ethereum and EVM</li>
                <li>Solidity, Viem.js, Anvil, Forge</li>
            </ul>
        </SectionWrapper>
    );
}

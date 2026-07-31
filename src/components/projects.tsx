import { Link } from "wouter";
import SectionWrapper from "./section-wrapper";

export default function Projects() {
    return (
        <SectionWrapper name="Projects">
            <div className="whitespace-normal wrap-break-word max-w-full">
                <a
                    href="https://github.com/najskowski/nfts"
                    target="_blank"
                    className="whitespace-normal wrap-break-word"
                >
                    NFTs marketplace
                    <br />
                    <p className="text-neutral-600 text-sm text-balance">
                        Lets users buy, sell and negotiate ERC721 tokens. Written in Solidity and
                        tested with Bun and Viem
                    </p>
                </a>
            </div>
            <div className="w-full text-center mt-12">
                <Link href="/projects" className="w-full text-center">
                    {">>"} See more {"<<"}
                </Link>
            </div>
        </SectionWrapper>
    );
}

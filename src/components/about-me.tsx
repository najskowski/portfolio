import SectionWrapper from "./section-wrapper";

export default function AboutMe() {
    return (
        <SectionWrapper name="About me">
            I'm Karol, 19 yo. React, Next.js and Ethereum developer from Poland{" "}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 8 5"
                className="border border-[#dc143c] inline-block mb-1"
            >
                <rect width="8" height="5" fill="#dc143c" />
                <rect width="8" height="2.5" fill="#fff" />
            </svg>
        </SectionWrapper>
    );
}

import Section from "./section";

export default function Education() {
    return (
        <Section foldable>
            <h3 className="text-2xl font-semibold">Education</h3>
            <div className="flex flex-col space-y-2.5 mt-5">
                <div className="-space-y-1">
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                        2021 - 2026
                    </div>
                    <p>
                        Polish Technical High School, Programming Specialization. Passed the
                        national theoretical and practical vocational exams with a combined score of
                        98%
                    </p>
                </div>
                <div className="-space-y-1">
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">{"2026<"}</div>
                    <p>Studying Cybersecurity</p>
                </div>
            </div>
        </Section>
    );
}

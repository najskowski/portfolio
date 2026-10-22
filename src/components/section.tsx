import { cn } from "cn";
import { Unless } from "react-if";

export const Corners = () => (
    <>
        <svg
            className="absolute -left-px top-0 -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="41"
            viewBox="0 0 21 41"
            fill="none"
            stroke="oklch(55.6% 0 none)"
            strokeWidth="1"
        >
            <path d="M0.5 0V41" />
            <path d="M0.5 20.0H21" />
        </svg>
        <svg
            className="absolute -right-px -top-px -translate-y-1/2 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="41"
            viewBox="0 0 21 41"
            fill="none"
            stroke="oklch(55.6% 0 none)"
            strokeWidth="1"
        >
            <path d="M0.5 0V41" />
            <path d="M0.5 20.0H21" />
        </svg>
    </>
);

export default function Section({
    children,
    className,
    hideCorners = false,
}: Partial<{
    children: React.ReactNode;
    className: string;
    hideCorners: boolean;
}>) {
    return (
        <section className={cn("p-5 relative", className)}>
            {children}
            <Unless condition={hideCorners}>
                <Corners />
            </Unless>
        </section>
    );
}

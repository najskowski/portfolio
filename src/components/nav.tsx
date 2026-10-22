import { Link } from "@tanstack/react-router";
import { IoHomeSharp, IoChatbubblesSharp } from "react-icons/io5";

import Section from "./section";

export default function Nav() {
    return (
        <Section
            className="p-0 flex sticky top-0 bg-neutral-50 dark:bg-neutral-950 z-50"
            hideCorners
        >
            <Link
                to="/"
                className="flex items-center justify-center py-2.5 w-full gap-1.5"
                viewTransition
            >
                <IoHomeSharp size={18} />
                <span>Home</span>
            </Link>
            <Link
                to="/send-me-a-message"
                className="flex items-center justify-center py-2.5 w-full gap-1"
                viewTransition
            >
                <IoChatbubblesSharp size={18} />
                <span>Send me a message</span>
            </Link>
        </Section>
    );
}

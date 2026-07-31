import { cn } from "@/lib/cn";
import { BsChatTextFill, BsBoxSeamFill, BsFillHouseFill } from "react-icons/bs";
import { Link, useRoute } from "wouter";

export default function Navigation() {
    return (
        <nav className="flex items-center gap-5 mb-5">
            <Link
                href="/"
                className={cn("flex items-center gap-1.5 py-1.5 px-3", {
                    "bg-blue-600 text-white": useRoute("/")[0],
                })}
            >
                <BsFillHouseFill />
                <span>Home</span>
            </Link>
            <Link
                href="/projects"
                className={cn("flex items-center gap-1.5 py-1.5 px-3", {
                    "bg-blue-600 text-white": useRoute("/projects")[0],
                })}
            >
                <BsBoxSeamFill />
                <span>Projects</span>
            </Link>
            <Link
                href="/contact"
                className={cn("flex items-center gap-1.5 py-1.5 px-3", {
                    "bg-blue-600 text-white": useRoute("/contact")[0],
                })}
            >
                <BsChatTextFill />
                <span>Contact</span>
            </Link>
        </nav>
    );
}

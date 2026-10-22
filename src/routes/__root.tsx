import fontWoff2 from "@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url";
import "@fontsource-variable/plus-jakarta-sans";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { cn } from "cn";

import Nav from "#/components/nav";
import NotFound from "#/components/not-found";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Karol | Full-stack Developer",
            },
            {
                name: "description",
                content: "I'm Karol - full-stack developer from Lublin, Poland",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "preload",
                href: fontWoff2,
                as: "font",
                type: "font/woff2",
                crossOrigin: "anonymous",
            },
        ],
    }),
    shellComponent: RootDocument,
    notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body className={cn("overflow-y-scroll")}>
                <main className="bg-neutral-50 dark:bg-neutral-900 w-[96%] lg:w-2/3 xl:w-1/3 mx-auto min-h-screen border-x border-neutral-300 dark:border-neutral-700 divide-y divide-neutral-300 dark:divide-neutral-700 flex flex-col relative">
                    <Nav />
                    {children}
                </main>
                <Scripts />
            </body>
        </html>
    );
}

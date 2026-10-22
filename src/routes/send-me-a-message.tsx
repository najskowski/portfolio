import { createFileRoute } from "@tanstack/react-router";
import { cn } from "cn";
import { useState } from "react";
import { Else, If, Then, When } from "react-if";

import Section from "#/components/section";
import { sendMessageResult, type SentMessageResult } from "#/lib/functions";

export const Route = createFileRoute("/send-me-a-message")({ component: SendMeAMessage });

function SendMeAMessage() {
    const [formData, setFormData] = useState({ email: "", content: "" });
    const [status, setStatus] = useState<"none" | "pending" | "success" | "error">("none");
    const [result, setResult] = useState<SentMessageResult | null>(null);

    const handleClick = async () => {
        setStatus("pending");
        const result = await sendMessageResult(formData);
        setResult(result);
        setStatus(result.isOk() ? "success" : "error");
    };

    const error = result && result.isOk() ? null : result?.error;
    const issues = {
        email:
            error?.kind === "validation"
                ? error.issues.find((issue) => issue.field === "email")?.message
                : undefined,
        content:
            error?.kind === "validation"
                ? error.issues.find((issue) => issue.field === "content")?.message
                : undefined,
    };

    return (
        <>
            <When condition={["none", "pending", "error"].includes(status)}>
                <Section>
                    <p className="text-xl">
                        If you don't want to message me throught discord or mail you can contact me
                        via the form below
                    </p>
                </Section>
            </When>
            <Section className="flex flex-col gap-2.5 h-full">
                <If condition={status === "success"}>
                    <Then>
                        <div className="w-3/5 text-center mx-auto text-pretty text-2xl animate-appear">
                            <span className="text-emerald-500 dark:text-emerald-400">
                                Your message has been sent.
                            </span>{" "}
                            I'll try to contact you back as soon as possible
                        </div>
                    </Then>
                    <Else>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="form-email" className="text-sm">
                                <span>E-mail</span>
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="form-email"
                                type="email"
                                placeholder="E-mail"
                                className={cn(
                                    "border border-neutral-300 dark:border-neutral-700 p-2.5 outline-none focus:border-blue-500 transition-colors",
                                    issues.email && "border-red-600 dark:border-red-500",
                                )}
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                                    setResult(null);
                                }}
                            />
                            <When condition={Boolean(issues.email)}>
                                <span className="text-sm text-red-500 dark:text-red-400">
                                    {issues.email}
                                </span>
                            </When>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="form-message" className="text-sm">
                                <span>Message</span>
                                <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="form-message"
                                rows={9}
                                placeholder="Message"
                                className={cn(
                                    "border border-neutral-300 dark:border-neutral-700 p-2.5 outline-none focus:border-blue-500 transition-colors",
                                    issues.content && "border-red-600 dark:border-red-500",
                                )}
                                value={formData.content}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, content: e.target.value }));
                                    setResult(null);
                                }}
                            />
                            <When condition={Boolean(issues.content)}>
                                <span className="text-sm text-red-500 dark:text-red-400">
                                    {issues.content}
                                </span>
                            </When>
                        </div>
                        <button
                            className="bg-neutral-200 dark:bg-neutral-800 py-2.5 w-fit ml-auto px-10"
                            type="button"
                            onClick={handleClick}
                            disabled={status !== "none" && status !== "error"}
                        >
                            Send
                        </button>
                    </Else>
                </If>
            </Section>
            <When condition={status === "success"}>
                <div className="text-xs text-neutral-400 dark:text-neutral-600 absolute left-5 bottom-5">
                    <p>Data sent:</p>
                    <p>e-mail: "{formData.email}"</p>
                    <p>message: "{formData.content}"</p>
                </div>
            </When>
        </>
    );
}

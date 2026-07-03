import { contactFormSchema } from "@/constants";
import axios from "axios";
import { useState } from "react";
import * as v from "valibot";

export default function Contact() {
    const [status, setStatus] = useState<
        "none" | "sending" | "success" | `error=${string}`
    >("none");
    const action = async (formData: FormData) => {
        setStatus("sending");
        const validation = v.safeParse(contactFormSchema, {
            email: formData.get("email"),
            message: formData.get("message"),
        });
        if (validation.success) {
            const res = await axios.post("/api/message", validation.output);
            if (res.status !== 201) {
                setStatus("error=");
                return;
            }
            setStatus("success");
            return;
        }
        setStatus(`error=${JSON.stringify(validation.issues)}`);
    };
    return (
        <main className="space-y-5">
            {status === "success" ? (
                <div className="w-2/3 mx-auto aspect-square flex items-center justify-center bg-emerald-500">
                    <p className="text-white text-3xl">Message sent :)!</p>
                </div>
            ) : (
                <form
                    action={action}
                    className="flex flex-col gap-3 w-2/3 mx-auto"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className="py-2 px-3 border border-neutral-400"
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={4}
                        className="py-2 px-3 border border-neutral-400"
                    />
                    <button
                        type="submit"
                        disabled={
                            status !== "none" && !status.includes("error")
                        }
                        className="bg-blue-600 text-white py-1.5 disabled:bg-neutral-700"
                    >
                        submit
                    </button>
                    {status.includes("error=") ? (
                        <p className="text-red-500">
                            {
                                JSON.parse(status.split("error=")[1] ?? "[]")[0]
                                    .message
                            }
                        </p>
                    ) : null}
                </form>
            )}
        </main>
    );
}

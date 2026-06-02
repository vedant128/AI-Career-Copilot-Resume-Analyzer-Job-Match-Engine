"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const INTERVIEWER_ONLY = ["/appointments"];
const INTERVIEWEE_ONLY = ["/dashboard"];

export default function RoleRedirect({ role }) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (role === "UNASSIGNED" && pathname !== "/onboarding")
            router.replace("/onboarding")

        // Prevent already onboarded users from going back to onboarding
        if (role === "INTERVIEWER" && pathname.startsWith("/onboarding")) {
            router.push("/dashboard");
            return;
        }
        if (role === "INTERVIEWEE" && pathname.startsWith("/onboarding")) {
            router.push("/explore");
            return;
        }

        // Interviewers shouldn't access interviewee pages
        if (role === "INTERVIEWER" && (pathname.startsWith("/explore") || pathname.startsWith("/appointments"))) {
            router.push("/dashboard");
            return;
        }

        // Interviewees shouldn't access interviewer pages
        if (role === "INTERVIEWEE" && pathname.startsWith("/dashboard")) {
            router.push("/explore");
            return;
        }

    }, [role, pathname, router]);

    return null;
}
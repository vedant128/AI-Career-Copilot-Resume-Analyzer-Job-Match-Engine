"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RoleRedirect({ role }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // If we don't know the role yet, do nothing.
        if (!role) return;

        const isInterviewer = role === "INTERVIEWER";
        const isInterviewee = role === "INTERVIEWEE";
        const isUnassigned = role === "UNASSIGNED" || role === null;

        // 1. If unassigned, force them to onboarding unless they are on the homepage
        if (isUnassigned && pathname !== "/onboarding" && pathname !== "/") {
            router.push("/onboarding");
            return;
        }

        // 2. If they are already onboarded, keep them away from the onboarding page and the homepage
        if ((isInterviewer || isInterviewee) && (pathname === "/" || pathname.startsWith("/onboarding"))) {
            router.push(isInterviewer ? "/dashboard" : "/explore");
            return;
        }

        // 3. Interviewers shouldn't access interviewee pages
        if (isInterviewer && (pathname.startsWith("/explore") || pathname.startsWith("/appointments"))) {
            router.push("/dashboard");
            return;
        }

        // 4. Interviewees shouldn't access interviewer pages
        if (isInterviewee && pathname.startsWith("/dashboard")) {
            router.push("/explore");
            return;
        }

    }, [role, pathname, router]);

    return null;
}

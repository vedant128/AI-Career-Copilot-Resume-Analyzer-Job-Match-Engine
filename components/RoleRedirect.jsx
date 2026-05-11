"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RoleRedirect({ role }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!role) return;

        // Interviewers shouldn't access interviewee pages
        if (role === "INTERVIEWER" && (pathname.startsWith("/explore") || pathname.startsWith("/appointments"))) {
            router.push("/dashboard");
        }

        // Interviewees shouldn't access interviewer pages
        if (role === "INTERVIEWEE" && pathname.startsWith("/dashboard")) {
            router.push("/explore");
        }

    }, [role, pathname, router]);

    return null;
}

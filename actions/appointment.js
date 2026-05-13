"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const getIntervieweeAppointments = async () => {
    const user = await currentUser();

    if (!user) return [];

    const dbuser = await db.user.findUnique({ where: { clerkUserId: user.id } });
    if (!dbuser) return [];

    return db.booking.findMany({
        where: { intervieweeId: dbuser.id },
        include: {
            interviewer: {
                select: {
                    name: true,
                    imageUrl: true,
                    email: true,
                    title: true,
                    company: true,
                    categories: true,
                },
            },
            feedback: true,
        },
        orderBy: { startTime: "desc" },
    })
}
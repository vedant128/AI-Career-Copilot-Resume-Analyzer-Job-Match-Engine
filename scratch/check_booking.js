const { PrismaClient } = require("./lib/generated/prisma/index.js");
const prisma = new PrismaClient();

async function main() {
    const lastBooking = await prisma.booking.findFirst({
        orderBy: { createdAt: 'desc' },
        include: {
            interviewer: true,
            interviewee: true
        }
    });
    console.log("Last Booking:", JSON.stringify(lastBooking, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

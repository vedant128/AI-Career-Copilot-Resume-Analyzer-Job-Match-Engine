const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const avail = await prisma.availability.findMany({ take: 5 });
    console.log("Avails:", avail);
    const users = await prisma.user.findMany({ where: { role: "INTERVIEWER" }, select: { availabilities: true }, take: 1 });
    console.log("Users:", JSON.stringify(users, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const availabilities = await prisma.availability.findMany();
    
    for (const av of availabilities) {
        const start = new Date(av.startTime);
        start.setHours(10, 0, 0, 0); // 10:00 AM local time
        
        const end = new Date(av.endTime);
        end.setHours(17, 0, 0, 0); // 5:00 PM local time
        
        await prisma.availability.update({
            where: { id: av.id },
            data: {
                startTime: start,
                endTime: end
            }
        });
    }
    
    console.log("Updated", availabilities.length, "availabilities to 10:00 AM - 5:00 PM");
}

main().catch(console.error).finally(() => prisma.$disconnect());

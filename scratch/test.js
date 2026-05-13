const { PrismaClient } = require("../lib/generated/prisma");
const prisma = new PrismaClient();

async function test() {
    const availability = await prisma.availability.findFirst();
    console.log(availability);
    
    if (availability) {
        console.log("Start time UTC:", availability.startTime.toISOString());
        console.log("End time UTC:", availability.endTime.toISOString());
        console.log("Start time local hours:", availability.startTime.getHours());
        console.log("End time local hours:", availability.endTime.getHours());
    }
}

test();

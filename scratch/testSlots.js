const { set, addMinutes, isBefore, isAfter } = require("date-fns");

function generateSlots(
    date,
    availStartTime,
    availEndTime,
    bookedSlots,
    slotDurationMinutes
) {
    console.log("INPUT:", {date, availStartTime, availEndTime, bookedSlots, slotDurationMinutes});

    const avStart = new Date(availStartTime);
    const avEnd = new Date(availEndTime);

    const start = set(new Date(date), {
        hours: avStart.getHours(),
        minutes: avStart.getMinutes(),
        seconds: 0,
        milliseconds: 0,
    });

    const end = set(new Date(date), {
        hours: avEnd.getHours(),
        minutes: avEnd.getMinutes(),
        seconds: 0,
        milliseconds: 0,
    });
    
    console.log("MAPPED START/END:", {start, end});

    const now = new Date();
    const slots = [];
    let cursor = start;

    while (isBefore(cursor, end)) {
        const slotEnd = addMinutes(cursor, slotDurationMinutes);

        if (isAfter(slotEnd, end)) break;

        const isBooked = bookedSlots.some(
            (b) =>
                isBefore(cursor, new Date(b.endTime)) &&
                isAfter(slotEnd, new Date(b.startTime))
        );

        if (isAfter(cursor, now)) {
            slots.push({
                startTime: cursor,
                endTime: slotEnd,
                isBooked,
                available: !isBooked,
            });
        }

        cursor = slotEnd;
    }

    return slots;
}

const PrismaClient = require("./lib/generated/prisma").PrismaClient;
const prisma = new PrismaClient();

async function test() {
    const availability = await prisma.availability.findFirst();
    if (!availability) {
        console.log("No availability found");
        return;
    }
    const slots = generateSlots(new Date(), availability.startTime, availability.endTime, [], 45);
    console.log("SLOTS:", slots.length);
    prisma.$disconnect();
}

test();

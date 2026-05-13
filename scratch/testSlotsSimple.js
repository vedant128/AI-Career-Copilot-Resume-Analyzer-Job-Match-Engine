const { set, addMinutes, isBefore, isAfter, format } = require("date-fns");

function generateSlots(
    date,
    availStartTime,
    availEndTime,
    bookedSlots,
    slotDurationMinutes
) {
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

const slots = generateSlots(
    new Date(), // today
    new Date("1970-01-01T10:00:00.000Z"), 
    new Date("1970-01-01T16:00:00.000Z"),
    [],
    45
);

console.log(slots.map(s => format(s.startTime, "h:mm a")));

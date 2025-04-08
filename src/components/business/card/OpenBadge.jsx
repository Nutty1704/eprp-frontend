import React from 'react'

function isOpen(openingHours) {
    const now = new Date();

    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDay = days[now.getDay()];

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Convert to minutes since midnight

    const today = openingHours[currentDay];

    if (!today || !today.isOpen || today.timeSlots.length === 0) return false;

    for (const slot of today.timeSlots) {
        const [openHour, openMinute] = slot.open.split(':').map(Number);
        const [closeHour, closeMinute] = slot.close.split(':').map(Number);

        const openTime = openHour * 60 + openMinute;
        const closeTime = closeHour * 60 + closeMinute;

        if (currentTime >= openTime && currentTime < closeTime) {
            return true;
        }
    }

    return false;
}

const OpenBadge = ({ openingHours, className }) => {
    return (
        <div className={className}>
            {isOpen(openingHours) ? (
                <span className="bg-green-600 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Open</span>
            ) : (
                <span className="bg-red-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Closed</span>
            )}
        </div>
    )
}

export default OpenBadge

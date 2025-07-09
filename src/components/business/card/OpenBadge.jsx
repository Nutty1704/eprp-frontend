import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';

function formatTimeToAmPm(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function isOpenNow(openingHours) {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const now = new Date();
    const currentDay = days[now.getDay()];
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
    const today = openingHours[currentDay];

    if (today?.isOpen) {
        for (const slot of today.timeSlots) {
            if (currentTime >= slot.open && currentTime <= slot.close) {
                return {
                    isOpen: true,
                    message: `${formatTimeToAmPm(slot.open)} to ${formatTimeToAmPm(slot.close)}`,
                };
            }
        }

        // Not currently open, but may open later today
        for (const slot of today.timeSlots) {
            if (currentTime < slot.open) {
                return {
                    isOpen: false,
                    message: `Opens today at ${formatTimeToAmPm(slot.open)}`,
                };
            }
        }
    }

    // If no slots today or today has passed, look ahead
    for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (now.getDay() + i) % 7;
        const nextDay = days[nextDayIndex];
        const next = openingHours[nextDay];
        if (next?.isOpen && next.timeSlots.length > 0) {
            return {
                isOpen: false,
                message: `Opens ${capitalize(nextDay)} at ${formatTimeToAmPm(next.timeSlots[0].open)}`,
            };
        }
    }

    return {
        isOpen: false,
        message: 'No upcoming hours available',
    };
}

export const OPEN_BADGE_VARIANTS = ['default', 'lighter-larger'];

const OpenBadge = ({
    openingHours,
    variant = 'default',
    className = '',
    showMessage = false,
    messageClass 
}) => {
    const { isOpen, message } = isOpenNow(openingHours);

    if (!OPEN_BADGE_VARIANTS.includes(variant)) {
        throw new Error(`Invalid variant: ${variant}, expected one of ${OPEN_BADGE_VARIANTS}`);
    }

    // Define styles based on variant
    const getVariantStyles = () => {
        if (variant === 'lighter-larger') {
            return {
                open: 'bg-green-100 text-green-800 !px-3 !py-1 !text-sm',
                closed: 'bg-red-100 text-red-800 !px-3 !py-1 !text-sm'
            };
        }
        
        // Default variant
        return {
            open: 'bg-green-600 text-white',
            closed: 'bg-red-500 text-white'
        };
    };

    const variantStyles = getVariantStyles();
    const badgeStyles = isOpen ? variantStyles.open : variantStyles.closed;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeStyles}`}
            >
                {isOpen ? 'Open' : 'Closed'}
            </span>
            {showMessage && (
                <span className={cn("text-xs text-gray-700", messageClass)}>
                    {isOpen ? `${message}` : `${message}`}
                </span>
            )}
        </div>
    );
};

OpenBadge.Skeleton = () => {
    return (
        <div className='flex items-center gap-2'>
            <Skeleton className='text-white text-xs font-semibold px-2.5 py-1 rounded bg-green-600' />
            <Skeleton className='text-xs text-gray-700' />
        </div>
    );
}

export default OpenBadge;
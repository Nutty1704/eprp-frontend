import { cn } from '@/lib/utils';
import React from 'react'

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday",
};

const formatTime = (time) => {
  // Format 24hours to 12hours
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
}

const formatHours = (hours) => {
  if (!hours.isOpen) return ["Closed"];

  return hours.timeSlots.map(timeslot => (
    `${formatTime(timeslot.open)} - ${formatTime(timeslot.close)}`
  ));
};

const getDay = () => {
  const now = new Date();
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[now.getDay()];
}


const Hours = ({ hours, className }) => {
  const today = getDay();

  return (
    <div className={cn('grid grid-cols-[1fr_2fr] gap-2.5 w-full text-gray-600 bg-gray-300 rounded-lg p-4 inter-regular text-sm', className)}>
      {Object.keys(hours).map((day) => (
        <React.Fragment key={day}>
          <span className={`${today == day && 'text-primary font-medium'}`}>{days[day]}</span>
          <span className="flex flex-col"> {/* flex flex-col for multiline hours */}
            {formatHours(hours[day]).map((slot, index) => (
              <span key={index} className={`${today == day && 'text-primary font-medium'}`}>{slot}</span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Hours

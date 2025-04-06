import { cn } from '@/lib/utils';
import React from 'react'

// const Hours = () => {
//   return (
//     <div className='grid grid-cols-2 bg-gray-300 p-4 rounded-lg text-gray-700'>
//         <div className='flex flex-col gap-3 inter-semibold'>

//             <span>Monday</span>
//             <span>Tuesday</span>
//             <span>Wednesday</span>
//             <span>Thursday</span>
//             <span>Friday</span>
//             <span>Saturday</span>
//             <span>Sunday</span>
//         </div>

//         <div className='flex flex-col gap-3'>
//             <span>10am-5pm</span>
//             <span>10am-5pm</span>
//             <span>10am-5pm</span>
//             <span>10am-5pm</span>
//             <span>10am-5pm</span>
//             <span>10am-2pm</span>
//             <span>Closed</span>
//         </div>
//     </div>
//   )
// }

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


const Hours = ({ hours, className }) => {
  return (
    <div className={cn('grid grid-cols-[1fr_2fr] gap-2.5 w-full text-gray-600 bg-gray-300 rounded-lg p-4 inter-regular text-sm', className)}>
      {Object.keys(hours).map((day) => (
        <React.Fragment key={day}>
          <span>{days[day]}</span>
          <span className="flex flex-col"> {/* flex flex-col for multiline hours */}
            {formatHours(hours[day]).map((slot, index) => (
              <span key={index}>{slot}</span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Hours

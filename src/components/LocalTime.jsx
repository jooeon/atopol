import { useEffect, useState } from 'react';

// Function to get current time in format HH:MM:SS for EST
const getESTTime = () => {
  const currentTime = new Date();

  // Use toLocaleString to get time in the EST time zone
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/New_York' // Use EST time zone
  };

  const timeString = currentTime.toLocaleString('en-US', options);
  const [hours, minutes, seconds] = timeString.split(':');

  return { hours, minutes, seconds };
};

const LocalTime = () => {
  const [localTime, setLocalTime] = useState(getESTTime());

  useEffect(() => {
    // Set an interval to update the time every second
    const interval = setInterval(() => {
      setLocalTime(getESTTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <p className="xs:w-6 sm:w-8 md:w-12 xl:w-16 2xl:w-20 4xl:w-32">
      {localTime.hours}:{localTime.minutes}:{localTime.seconds}
    </p>
  );
};

export default LocalTime;

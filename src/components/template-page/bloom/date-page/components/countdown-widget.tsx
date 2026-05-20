'use client';

import { useEffect, useState } from 'react';

const Countdown = ({ targetDate, color }: { targetDate: string; color: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const countdownDate = new Date(targetDate).getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center font-semibold text-xl">
      <div className="flex justify-center gap-4 mt-2">
        <TimeBox label="Days" value={timeLeft.days} color={color} />
        <TimeBox label="Hours" value={timeLeft.hours} color={color}/>
        <TimeBox label="Minutes" value={timeLeft.minutes} color={color}/>
        <TimeBox label="Seconds" value={timeLeft.seconds} color={color}/>
      </div>
    </div>
  );
};

const TimeBox = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col items-center p-2 sm:p-4 rounded-lg sm:rounded-xl text-white" style={{backgroundColor: color}}>
  
    <div className="text-lg sm:text-2xl md:text-3xl">{String(value).padStart(2, '0')}</div>
    <div className="text-xs sm:text-sm md:text-lg">{label}</div>
  </div>
);

export default Countdown;

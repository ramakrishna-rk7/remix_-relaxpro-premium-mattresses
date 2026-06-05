import React, { useEffect, useState } from 'react';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // duration in ms
}

export default function NumberTicker({ value, suffix = '', prefix = '', duration = 1500 }: NumberTickerProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className="font-sans font-bold text-2xl md:text-3xl text-brand-950 tracking-tight">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

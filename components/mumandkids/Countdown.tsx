"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const INITIAL_SECONDS = 3 * 3600 + 18 * 60 + 42; // 3h 18m 42s
  const [timeLeft, setTimeLeft] = useState(INITIAL_SECONDS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if the user already has a timer running in localStorage
    const storedEndTime = localStorage.getItem("mako_flash_sale_end");

    if (storedEndTime) {
      const remaining = Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        // Timer expired. For an evergreen funnel, we could reset it here, 
        // or hold it at 0. Let's restart it to maintain the funnel pressure.
        const newEndTime = Date.now() + INITIAL_SECONDS * 1000;
        localStorage.setItem("mako_flash_sale_end", newEndTime.toString());
        setTimeLeft(INITIAL_SECONDS);
      }
    } else {
      // First time visitor: set the end time in the future
      const newEndTime = Date.now() + INITIAL_SECONDS * 1000;
      localStorage.setItem("mako_flash_sale_end", newEndTime.toString());
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isMounted]);

  // Prevent hydration mismatch by not rendering the numbers until client-side JS takes over
  if (!isMounted) return <div className="w-full bg-[#0a0505] py-4 h-[72px]" />; // Placeholder skeleton

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-[#0a0505] via-red-950/40 to-[#0a0505] py-4 border-y border-red-900/50 relative overflow-hidden">
      {/* Subtle glowing effect */}
      <div className="absolute inset-0 bg-red-600/5 blur-xl pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <span className="text-red-400 font-bold uppercase tracking-[0.2em] text-sm sm:text-base">
            Flash Sale Ends In
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="bg-red-950 border border-red-800 text-red-100 font-mono font-bold text-xl px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.2)]">
              {formatTime(hours)}
            </span>
            <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">Hrs</span>
          </div>
          <span className="text-red-700 font-bold text-xl pb-4 animate-pulse">:</span>
          
          <div className="flex flex-col items-center">
            <span className="bg-red-950 border border-red-800 text-red-100 font-mono font-bold text-xl px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.2)]">
              {formatTime(minutes)}
            </span>
            <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">Min</span>
          </div>
          <span className="text-red-700 font-bold text-xl pb-4 animate-pulse">:</span>
          
          <div className="flex flex-col items-center">
            <span className="bg-red-950 border border-red-800 text-red-100 font-mono font-bold text-xl px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.2)]">
              {formatTime(seconds)}
            </span>
            <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
}

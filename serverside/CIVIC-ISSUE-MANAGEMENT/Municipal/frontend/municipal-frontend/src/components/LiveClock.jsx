import React, { useState, useEffect } from 'react';

const LiveClock = ({ className = "text-gray-700 text-lg font-medium" }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  return (
    <span className={className}>
      {time.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })}
    </span>
  );
};

export default LiveClock;

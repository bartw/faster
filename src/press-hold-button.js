import React, { useRef } from "react";

const PressAndHoldButton = ({ type, className, onFire, children }) => {
  const intervalRef = useRef(0);
  const fireCountRef = useRef(0);

  const fire = () => {
    fireCountRef.current += 1;
    
    onFire(fireCountRef.current);
  };

  const start = () => {
    intervalRef.current = window.setInterval(() => {
      fire();
    }, 250);
  };

  const stop = () => {
    fireCountRef.current = 0;
    if (!intervalRef.current) {
      return;
    }
    window.clearInterval(intervalRef.current);
  };

  return (
    <button
      className={className}
      type={type}
      onMouseDown={start}
      onMouseUp={stop}
      onTouchStart={start}
      onTouchEnd={stop}
    >
      {children}
    </button>
  );
};

export default PressAndHoldButton;

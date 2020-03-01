import React, { useRef } from "react";

const getPercentage = (current, max) => (100 * current) / max;
const getValue = (percentage, max) =>
  Math.round((max / 100) * percentage * 10) / 10;
const getLeft = percentage => `calc(${percentage}% - 5px)`;

const Slider = ({ value, max, step, onChange }) => {
  const sliderRef = useRef();
  const thumbRef = useRef();
  const diff = useRef();

  const percentage = getPercentage(value, max);

  const handleMouseMove = event => {
    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;

    const newX = (() => {
      const start = 0;
      const x =
        event.clientX -
        diff.current -
        sliderRef.current.getBoundingClientRect().left;

      if (x < start) {
        return 0;
      }
      if (x > end) {
        return end;
      }

      return x;
    })();

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max);

    onChange(newValue);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDown = event => {
    diff.current =
      event.clientX - thumbRef.current.getBoundingClientRect().left;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="relative rounded bg-gray-400"
      style={{
        height: "15px"
      }}
      ref={sliderRef}
    >
      <div
        className="relative rounded bg-green-600 cursor-pointer"
        style={{
          width: "10px",
          height: "25px",
          top: "-5px",
          left: getLeft(percentage)
        }}
        ref={thumbRef}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Slider;

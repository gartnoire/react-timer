import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [count, setCount] = useState(setDefaultValue());
  const [isCounting, setIsCounting] = useState(false);
  const timerIdRef = useRef(null);

  function setDefaultValue() {
    const useCount = localStorage.getItem("count");

    return useCount ? +useCount : 0;
  }

  const handleStart = () => setIsCounting(true);

  const handleStop = () => setIsCounting(false);

  const handleReset = () => {
    setIsCounting(false);
    setCount(0);
  };

  useEffect(() => localStorage.setItem("count", count), [count]);

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => {
      timerIdRef.current && clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    };
  });

  return (
    <section className="Timer">
      <h1>React - Timer</h1>
      <h3>{count}</h3>
      {!isCounting ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </section>
  );
}

export default Timer;

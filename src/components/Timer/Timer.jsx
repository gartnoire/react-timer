import React, { useState, useEffect, useRef } from 'react';
import TimerCSS from './Timer.module.css';

function Timer() {
  const [count, setCount] = useState(setDefaultValue());
  const [isCounting, setIsCounting] = useState(false);
  const timerIdRef = useRef(null);

  function setDefaultValue() {
    const useCount = localStorage.getItem('count');

    return useCount ? +useCount : 0;
  }

  const handleStart = () => setIsCounting(true);

  const handleStop = () => setIsCounting(false);

  const handleReset = () => {
    setIsCounting(false);
    setCount(0);
  };

  useEffect(() => localStorage.setItem('count', count), [count]);

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
    <section className={TimerCSS.timer}>
      <h1 className={TimerCSS.title}>ReactTimer</h1>
      <h3 className={TimerCSS.count}>{count}</h3>
      <div className={TimerCSS.btns}>
        {!isCounting ? (
          <button className={TimerCSS.btn} onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className={TimerCSS.btn} onClick={handleStop}>
            Stop
          </button>
        )}
        <button className={TimerCSS.btn} onClick={handleReset}>
          Reset
        </button>
      </div>
      <p className={TimerCSS.text}>#StandWithUkraine</p>
    </section>
  );
}

export default Timer;

import React, { useState, useEffect } from "react";
import { useMembersContext } from "../../App";
import "./Style.css";

function Clock() {
  const { state } = useMembersContext();

  const [currentTime, setCurrentTime] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    const updateCurrentTime = () => {
      // Parse the datetime string from the API response
      const utc = new Date(state?.current_time?.utc_datetime);
      const apiDatetime = new Date(utc - elapsedTime);

      const options = {
        timeZone: state?.current_time?.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      // Format the time with the specified options
      let formattedTime = apiDatetime.toLocaleTimeString("en-US", options);

      setCurrentTime(formattedTime);
    };

    // Update the current time every second
    if (!isPaused) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime - 1000);
        updateCurrentTime();
      }, 1000);
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [state?.current_time, isPaused, elapsedTime]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      {currentTime && (
        <div className="clock">
          <div className="clock_display">
            <p>Current Time: </p>
            <span>{currentTime}</span>
          </div>
          <button onClick={handlePauseResume} className="clock__btn">
            {isPaused ? "Start" : "Pause"}
          </button>
        </div>
      )}
    </>
  );
}

export default Clock;

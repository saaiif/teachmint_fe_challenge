import React, { useState, useEffect } from "react";
import { useMembersContext } from "../../App";
import "./Style.css";

function Clock() {
  const { state } = useMembersContext();
  const { loading } = state || {};
  const [currentTime, setCurrentTime] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    const updateCurrentTime = () => {
      // Parse the datetime string from the API response
      const utc_time = new Date(state?.current_time?.utc_datetime);
      const apiDatetime = new Date(utc_time - elapsedTime);

      const options = {
        timeZone: state?.current_time?.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // As per design document I haven't seen AM/PM suffix so I am using 24hrs format.
      };

      // Format the time with the specified options
      let formattedTime = apiDatetime.toLocaleTimeString("en-US", options);

      formattedTime =
        formattedTime?.split(":")[0] === "24"
          ? "00" +
            ":" +
            formattedTime?.split(":")[1] +
            ":" +
            formattedTime?.split(":")[2]
          : formattedTime;

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
      <div className="clock">
        <div className="clock_display">
          <p>Current Time: </p>
          <span>
            {(loading.title === "current time" && loading?.isLoading) ||
            !currentTime
              ? "Loading..."
              : currentTime}
          </span>
        </div>
        <button onClick={handlePauseResume} className="clock__btn">
          {isPaused ? "Start" : "Pause"}
        </button>
      </div>
    </>
  );
}

export default Clock;

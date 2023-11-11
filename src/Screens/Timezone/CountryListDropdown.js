import React, { useState, useEffect } from "react";
import { useMembersContext } from "../../App";
import { LOADING, TIME_ZONE } from "../../Utils/Contants";
import { getCurrentTime } from "../../Utils/Helper";
import "./Style.css";

function CountryListDropdown({ countries }) {
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Kolkata");
  const { dispatch } = useMembersContext();

  const handleTimeZoneChange = (event) => {
    const { value } = event?.target || {};
    setSelectedTimeZone(value);
    dispatch({ type: TIME_ZONE, payload: value });
  };

  useEffect(() => {
    getCurrentTime(dispatch, selectedTimeZone);
    dispatch({
      type: LOADING,
      payload: {
        title: "current time",
        isLoading: true,
      },
    });
  }, [selectedTimeZone]);

  return (
    <div>
      <select
        value={selectedTimeZone}
        onChange={handleTimeZoneChange}
        className="country_dropdown"
      >
        {countries?.map((timeZone) => (
          <option key={timeZone} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryListDropdown;

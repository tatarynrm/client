import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
const HeaderTime = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const todayDate = moment().format("MMMM YYYY, h:mm:ss a");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="time">
      <div>
        <FcCalendar />
      </div>
      <div>
        {moment().format("LL")} {currentTime.format("HH:mm:ss")}
      </div>
      <div>
        <FcAlarmClock />{" "}
      </div>
    </div>
  );
};

export default HeaderTime;

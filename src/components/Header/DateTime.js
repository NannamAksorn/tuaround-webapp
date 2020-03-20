/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const DAY_OF_WEEKS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const DateTime = () => {
  const [dateDisplay, setDateDisplay] = useState('MON, 01 Jan 2000');
  const [time, setTime] = useState('10:12:50');

  const tick = () => {
    const date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    const dayOfWeek = DAY_OF_WEEKS[date.getDay()];
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();

    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    setTime(`${h}:${m}:${s}`);
    setDateDisplay(`${dayOfWeek}, ${day} ${month} ${year}`);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="clock-container">
      <div className="date" id="MyClockDisplay--date">
        {dateDisplay}
      </div>
      <div id="MyClockDisplay" className="time">
        {time}
      </div>
    </div>
  );
};

export default DateTime;

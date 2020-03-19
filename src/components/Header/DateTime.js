import React from 'react';

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

  const time = `${h}:${m}:${s}`;
  const dateDisplay = `${dayOfWeek}, ${day} ${month} ${year}`;
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

import moment from "moment";

const getCalendarData = (momentCalendar, locale) => {
  // var calendar = side == "left" ? this.leftCalendar : this.rightCalendar;
  // var month = calendar.month.month();
  // var year = calendar.month.year();
  const year = momentCalendar.year();
  console.log("year", year);

  const month = momentCalendar.month();
  console.log("month", month);
  const hour = 0;
  const minute = 0;
  const second = 0;
  const daysInMonth = moment([year, month]).daysInMonth();
  console.log("daysInMonth", daysInMonth);

  const firstDay = moment([year, month, 1]);
  console.log("firstDay", firstDay);

  const lastDay = moment([year, month, daysInMonth]);
  console.log("lastDay", lastDay);

  const lastMonth = moment(firstDay).subtract(1, "month").month();
  console.log("lastMonth", lastDay);

  const lastYear = moment(firstDay).subtract(1, "month").year();
  console.log("lastYear", lastDay);

  const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
  const dayOfWeek = firstDay.day();

  //initialize a 6 rows x 7 columns array for the calendar
  const calendar = [];
  calendar.firstDay = firstDay;
  calendar.lastDay = lastDay;

  for (let i = 0; i < 6; i++) {
    calendar[i] = [];
  }

  //populate the calendar with date objects
  let startDay = daysInLastMonth - dayOfWeek + locale.firstDay + 1;
  if (startDay > daysInLastMonth) startDay -= 7;

  if (dayOfWeek === locale.firstDay) startDay = daysInLastMonth - 6;

  let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

  for (
    let i = 0, col = 0, row = 0;
    i < 42;
    i++, col++, curDate = moment(curDate).add(24, "hour")
  ) {
    if (i > 0 && col % 7 === 0) {
      col = 0;
      row++;
    }
    calendar[row][col] = curDate
      .clone()
      .hour(hour)
      .minute(minute)
      .second(second);
    curDate.hour(12).date();
  }

  return calendar;
};

export default getCalendarData;

import { useMemo } from "react";
import getCalendarData from "./getCalendarData";

const CalendarDisplay = ({
  startDate,
  endDate,
  onStartDateSelect,
  onEndDateSelect,
  hoveredDate,
  setHoveredDate,
  calendar,
  onPrevClick,
  onNextClick,
  side,
  locale,
  maxSpan,
}) => {
  const calendarData = useMemo(
    () => getCalendarData(calendar, locale),
    [calendar, locale]
  );
  const calendarMonthFormatted = locale.monthNames[calendarData[1][1].month()];
  const calendarYearFormatted = calendarData[1][1].format(" YYYY");

  return (
    <div className={`drp-calendar ${side}`}>
      <div className="calendar-table">
        <table className="table-condensed">
          <thead>
            <tr>
              {side === "left" ? (
                <th className="prev available" onClick={onPrevClick}>
                  <span></span>
                </th>
              ) : (
                <th></th>
              )}
              <th colSpan="5" className="month">
                {calendarMonthFormatted} {calendarYearFormatted}
              </th>
              {side === "right" ? (
                <th className="next available" onClick={onNextClick}>
                  <span></span>
                </th>
              ) : (
                <th></th>
              )}
            </tr>
            <tr>
              {locale.daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarData.map((rowData, i) => (
              <tr key={i}>
                {rowData.map((momentDate, i) => {
                  const classes = [];
                  //highlight today's date
                  if (momentDate.isSame(new Date(), "day"))
                    classes.push("today");

                  //highlight weekends
                  if (momentDate.isoWeekday() > 5) classes.push("weekend");

                  //grey out the dates in other months displayed at beginning and end of this calendar
                  if (momentDate.month() !== calendarData[1][1].month())
                    classes.push("off", "ends");

                  //highlight the currently selected start date
                  if (
                    momentDate.format("YYYY-MM-DD") ===
                    startDate.format("YYYY-MM-DD")
                  )
                    classes.push("active", "start-date");

                  //don't allow selection of dates after the max span date
                  const spanDate = maxSpan
                    ? startDate.clone().add(maxSpan)
                    : "";
                  if (
                    !endDate &&
                    spanDate &&
                    momentDate.isAfter(spanDate, "day")
                  )
                    classes.push("off", "disabled");

                  //highlight the currently selected end date
                  if (
                    endDate !== null &&
                    momentDate.format("YYYY-MM-DD") ===
                      endDate.format("YYYY-MM-DD")
                  )
                    classes.push("active", "end-date");

                  //highlight dates in-between the selected dates
                  if (
                    endDate !== null &&
                    momentDate > startDate &&
                    momentDate < endDate
                  )
                    classes.push("in-range");
                  if (
                    !endDate &&
                    startDate < hoveredDate &&
                    startDate < momentDate &&
                    momentDate < hoveredDate
                  )
                    classes.push("in-range");
                  if (!classes.includes("disabled")) classes.push("available");
                  const dateClassNames = [...new Set(classes)].join(" ");

                  return (
                    <td
                      key={i}
                      className={dateClassNames}
                      onMouseOver={() => {
                        setHoveredDate(momentDate.clone());
                      }}
                      onClick={(e) => {
                        if (!dateClassNames.includes("available")) return;
                        //This is to cancel the blur event handler if the mouse was in one of the inputs
                        e.stopPropagation();

                        if (endDate || momentDate.isBefore(startDate, "day")) {
                          onEndDateSelect(null);
                          onStartDateSelect(momentDate.clone());
                          return;
                        }
                        onEndDateSelect(momentDate.clone());
                      }}
                    >
                      <span>{momentDate.date()}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="calendar-time d-none"></div>
    </div>
  );
};

export default CalendarDisplay;

import { useMemo } from "react";
import getCalendarData from "./getCalendarData";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

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
        <table className="">
          <thead>
            <tr>
              {side === "left" ? (
                <th className="move-arrow prev" onClick={onPrevClick}>
                  <MdArrowBackIos size={20} />
                </th>
              ) : (
                <th></th>
              )}

              <th colSpan="5" className="month">
                {calendarMonthFormatted} {calendarYearFormatted}
              </th>

              {side === "right" ? (
                <th className="move-arrow next" onClick={onNextClick}>
                  <MdArrowForwardIos size={20} />
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
                  const classSet = new Set();
                  //highlight today's date
                  if (momentDate.isSame(new Date(), "day"))
                    classSet.add("today");

                  //highlight weekends
                  if (momentDate.isoWeekday() > 5) classSet.add("weekend");

                  //grey out the dates in other months displayed at beginning and end of this calendar
                  if (momentDate.month() !== calendarData[1][1].month()) {
                    classSet.add("off");
                    classSet.add("ends");
                  }

                  //highlight the currently selected start date
                  if (
                    momentDate.format("YYYY-MM-DD") ===
                    startDate.format("YYYY-MM-DD")
                  ) {
                    classSet.add("active");
                    classSet.add("start-date");
                  }
                  //don't allow selection of dates after the max span date
                  const spanDate = maxSpan
                    ? startDate.clone().add(maxSpan)
                    : "";
                  if (
                    !endDate &&
                    spanDate &&
                    momentDate.isAfter(spanDate, "day")
                  ) {
                    classSet.add("off");
                    classSet.add("disabled");
                  }
                  //highlight the currently selected end date
                  if (
                    endDate !== null &&
                    momentDate.format("YYYY-MM-DD") ===
                      endDate.format("YYYY-MM-DD")
                  ) {
                    classSet.add("active");
                    classSet.add("end-date");
                  }
                  //highlight dates in-between the selected dates
                  if (
                    endDate !== null &&
                    momentDate >= startDate &&
                    momentDate <= endDate
                  )
                    classSet.add("in-range");
                  if (
                    !endDate &&
                    startDate < hoveredDate &&
                    startDate < momentDate &&
                    momentDate < hoveredDate
                  )
                    classSet.add("in-range");

                  if (
                    (startDate < endDate || startDate < hoveredDate) &&
                    startDate.isSame(endDate) === false
                  )
                    classSet.add("add-background-color");
                  if (!classSet.has("disabled")) classSet.add("available");
                  if (classSet.has("ends")) {
                    classSet.delete("active");
                    classSet.delete("today");
                  }

                  const dateClassNames = [...classSet].join(" ");

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
                      <div>
                        <span>{momentDate.date()}</span>
                      </div>
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

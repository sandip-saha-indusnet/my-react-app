import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import getCalendarData from "./getCalendarData";
import moment from "moment";
import CalendarDisplay from "./CalenderDisplay";

export default function Calendar({
  startDate = moment(),
  endDate = moment(),
  onStartDateSelect,
  onEndDateSelect,
  months = 2,
  locale,
  maxSpan,
}) {
  const createCalendarArray = useCallback(
    (momentDate) => {
      return Array.from({ length: months }, (v, i) =>
        momentDate.clone().add(i, "month")
      );
    },
    [months]
  );

  const [hoveredDate, setHoveredDate] = useState();
  const [calendars, setCalendars] = useState(() =>
    createCalendarArray(startDate.clone())
  );

  useLayoutEffect(() => {
    setCalendars((prevCalendar) => {
      const firstCalendar = prevCalendar[0];
      const lastCalendar = prevCalendar[prevCalendar.length - 1];
      if (
        firstCalendar.format("YYYY-MM") !== startDate.format("YYYY-MM") &&
        lastCalendar.format("YYYY-MM") !== startDate.format("YYYY-MM")
      ) {
        return createCalendarArray(startDate.clone());
      }
      return prevCalendar;
    });
  }, [startDate, createCalendarArray]);

  const calenderMoveBack = () =>
    setCalendars((prev) => {
      return createCalendarArray(prev[0].clone().subtract(1, "month"));
    });
  const calenderMoveForward = () =>
    setCalendars((prev) =>
      createCalendarArray(prev[0].clone().add(1, "month"))
    );

  return calendars.map((v, i) => (
    <CalendarDisplay
      key={i}
      {...{
        startDate,
        endDate,
        onEndDateSelect,
        hoveredDate,
        setHoveredDate,
        locale,
        maxSpan,
      }}
      onStartDateSelect={(momentDate) => {
        onStartDateSelect(momentDate.clone());
        // the calendar might move that's why we should set the clicked date as hovered date
        setHoveredDate(momentDate.clone());
      }}
      calendar={v}
      onPrevClick={calenderMoveBack}
      onNextClick={calenderMoveForward}
      side={i === 0 ? "left" : i === calendars.length - 1 ? "right" : ""}
    />
  ));
}

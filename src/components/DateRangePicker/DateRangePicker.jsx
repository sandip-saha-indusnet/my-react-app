import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
// import { Overlay } from "react-bootstrap";
import Calendar from "./Calendar";
import "./date-range-picker.css";

const locale = {
  direction: "ltr",
  format: "D-MMM-YY",
  separator: " - ",
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  weekLabel: "W",
  customRangeLabel: "Custom Range",
  daysOfWeek: moment.weekdaysMin(),
  monthNames: moment.months(),
  firstDay: moment.localeData().firstDayOfWeek(),
};

const defaultRanges = [
  { status: "Today", range: [moment(), moment()] },
  {
    status: "Yesterday",
    range: [moment().subtract(1, "days"), moment().subtract(1, "days")],
  },
  { status: "Last 7 days", range: [moment().subtract(6, "days"), moment()] },
  { status: "Last 30 days", range: [moment().subtract(29, "days"), moment()] },
  {
    status: "This Month",
    range: [moment().startOf("month"), moment().endOf("month")],
  },
  {
    status: "Last Month",
    range: [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  },
];

const getStatus = (startDate, endDate, ranges) => {
  if (!endDate) return "";
  const status = ranges.find(({ range }) => {
    return (
      startDate.format(locale.format) === range[0].format(locale.format) &&
      endDate.format(locale.format) === range[1].format(locale.format)
    );
  });

  return status ? status.status : "Custom";
};
export default function DateRangePickerTag({
  defaultStartDate,
  defaultEndDate,
  ranges = defaultRanges,
  onDateRangeChange,
  //   placement = "bottom-start",
  maxSpan,
}) {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const previouslyAppliedDateRange = useRef({ startDate, endDate });

  const activeStatus = useMemo(() => {
    return getStatus(startDate, endDate, ranges);
  }, [startDate, endDate, ranges]);

  const formatDateRangeInput = (startDateParam, endDateParam) => {
    const status = getStatus(startDateParam, endDateParam, ranges);
    if (status === "Custom") {
      const difference = endDateParam.diff(startDateParam, "years");
      if (difference >= 1) {
        return `${startDateParam.format(locale.format)} - ${endDateParam.format(
          locale.format
        )}`;
      }
      return `${startDateParam.format("D-MMM")} - ${endDateParam.format(
        "D-MMM"
      )}`;
    }
    return status;
  };
  const [dateRangeInput, setDateRangeInput] = useState(() =>
    formatDateRangeInput(startDate, endDate)
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const rangesRef = useRef(ranges);

  const [showOverlay, setShowOverlay] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeStatus === "Custom") {
      setShowCalendar(true);
    }
  }, [activeStatus]);

  const handleClick = () => setShowOverlay(true);

  const triggerOnNewDateRangeApply = (startDate, endDate, status) => {
    onDateRangeChange({
      status,
      dates: {
        startDate: startDate.startOf("day"),
        endDate: endDate.endOf("day"),
      },
    });
  };

  const applyChanges = (startDate, endDate, status) => {
    previouslyAppliedDateRange.current = { startDate, endDate };
    setShowOverlay(false);
    setDateRangeInput(formatDateRangeInput(startDate.clone(), endDate.clone()));
    triggerOnNewDateRangeApply(startDate.clone(), endDate.clone(), status);
  };

  const discardChanges = () => {
    setShowOverlay(false);
    setStartDate(previouslyAppliedDateRange.current.startDate.clone());
    setEndDate(previouslyAppliedDateRange.current.endDate.clone());
    setDateRangeInput(
      formatDateRangeInput(
        previouslyAppliedDateRange.current.startDate.clone(),
        previouslyAppliedDateRange.current.endDate.clone()
      )
    );
  };

  return (
    <div className="ss-daterangepicker-container">
      <button
        type="button"
        className="form-control text-left"
        ref={inputRef}
        onClick={handleClick}
      >
        <span>{dateRangeInput || "Pick date range"}</span>
      </button>
      {/* <Overlay
        show={showOverlay}
        target={inputRef.current}
        placement={placement}
        rootClose={true}
        onHide={() => {
          if (showOverlay) {
            if (endDate)
              return applyChanges(
                startDate.clone(),
                endDate.clone(),
                activeStatus
              );
            discardChanges();
          }
        }}
      >
        {(props) => ( */}
      <div
        className="ss-daterangepicker ltr show-ranges show-calendar z-index-1051"
        // style={{ ...props.style }}
        // ref={props.ref}
      >
        <div className="ranges">
          <ul>
            {rangesRef.current.map(({ status, range }) => (
              <li
                key={status}
                className={activeStatus === status ? "active" : ""}
                onClick={() => {
                  setStartDate(range[0]);
                  setEndDate(range[1]);
                  setShowCalendar(false);
                  applyChanges(range[0], range[1], status);
                }}
              >
                {status}
              </li>
            ))}
            <li
              className={activeStatus === "Custom" ? "active" : ""}
              onClick={() => setShowCalendar(true)}
            >
              Custom Range
            </li>
          </ul>
        </div>
        {showCalendar && (
          <>
            <Calendar
              locale={locale}
              {...{ startDate, endDate, maxSpan }}
              onStartDateSelect={setStartDate}
              onEndDateSelect={setEndDate}
            />
            <div className="drp-buttons">
              <span className="drp-selected">
                {startDate?.format(locale.format)} {locale.separator}{" "}
                {endDate?.format(locale.format)}
              </span>
              <button
                className="cancelBtn btn btn-sm btn-default"
                type="button"
                fdprocessedid="36q17a"
                onClick={discardChanges}
              >
                Cancel
              </button>
              <button
                className="applyBtn btn btn-sm btn-primary"
                disabled={!endDate}
                onClick={() => applyChanges(startDate, endDate, activeStatus)}
                type="button"
                fdprocessedid="61glbh"
              >
                Apply
              </button>
            </div>
          </>
        )}
      </div>
      {/* )}
      </Overlay> */}
    </div>
  );
}

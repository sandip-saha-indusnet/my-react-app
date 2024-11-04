import { useRef, useState } from "react";
import moment from "moment";
// import { Overlay } from "react-bootstrap";
import Calendar from "./Calendar";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./date-range-picker.css";
import "./date-range-picker-style-edit.scss";

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

export default function DateRangePickerTag({
  defaultStartDate,
  defaultEndDate,
  onDateRangeChange,
  //   placement = "bottom-start",
  maxSpan,
}) {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const previouslyAppliedDateRange = useRef({ startDate, endDate });

  const formatDateRangeInput = (startDateParam, endDateParam) => {
    return `${startDateParam.format(locale.format)} - ${endDateParam.format(
      locale.format
    )}`;
  };
  const [dateRangeInput, setDateRangeInput] = useState(() =>
    formatDateRangeInput(startDate, endDate)
  );

  const [showCalendar, setShowCalendar] = useState(true);

  // const [showOverlay, setShowOverlay] = useState(false);
  const inputRef = useRef(null);

  // const handleClick = () => setShowOverlay(true);

  const triggerOnNewDateRangeApply = (startDate, endDate) => {
    onDateRangeChange({
      startDate: startDate.startOf("day"),
      endDate: endDate.endOf("day"),
    });
  };

  const applyChanges = (startDate, endDate) => {
    previouslyAppliedDateRange.current = { startDate, endDate };
    // setShowOverlay(false);
    setDateRangeInput(formatDateRangeInput(startDate.clone(), endDate.clone()));
    triggerOnNewDateRangeApply(startDate.clone(), endDate.clone());
  };

  const discardChanges = () => {
    // setShowOverlay(false);
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
    <div className="my-date-range-picker-container">
      <button
        type="button"
        className="form-control text-left"
        ref={inputRef}
        // onClick={handleClick}
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
              );
            discardChanges();
          }
        }}
      >
        {(props) => ( */}
      <div
        className="my-date-range-picker ltr show-ranges show-calendar z-index-1051"
        // style={{ ...props.style }}
        // ref={props.ref}
      >
        {showCalendar && (
          <>
            <div className="head-text">
              <IoIosInformationCircleOutline size="25" />
              <span>
                This will only impact state and time-related fields in the table
                over time.
              </span>
            </div>
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
                onClick={discardChanges}
              >
                Cancel
              </button>
              <button
                className="applyBtn btn btn-sm btn-primary"
                disabled={!endDate}
                onClick={() => applyChanges(startDate, endDate)}
                type="button"
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

import moment from "moment";
import "./App.css";
// import CofString from "./base64String/cof";
// import CSVString from "./base64String/csv";
// import CSVTable from "./components/CSVTable";
import Calendar from "./components/DateRangePicker/Calendar";
import CalendarDisplay from "./components/DateRangePicker/CalenderDisplay";
import DateRangePickerTag from "./components/DateRangePicker/DateRangePicker";
import DateRangePicker2 from "./components/DateRangePicker-2/DateRangePicker2";

// const parsedValueCof = atob(CofString);

const locale = {
  direction: "ltr",
  format: "D-MMM-YY",
  separator: " - ",
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  weekLabel: "W",
  customRangeLabel: "Custom Range",
  daysOfWeek: moment.weekdaysMin(),
  monthNames: moment.monthsShort(),
  firstDay: moment.localeData().firstDayOfWeek(),
};

function App() {
  return (
    <>
      {/* <DateRangePickerTag
        defaultStartDate={moment()}
        defaultEndDate={moment().add(5, "days")}
        onDateRangeChange={() => false}
      /> */}

      <DateRangePicker2 />

      {/* <CSVTable base64String={CSVString} /> */}

      {/* <pre>{parsedValueCof}</pre> */}
    </>
  );
}

export default App;

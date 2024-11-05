import moment from "moment";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
// import CofString from "./base64String/cof";
// import CSVString from "./base64String/csv";
// import CSVTable from "./components/CSVTable";
// import DateRangePicker2 from "./components/DateRangePicker-2/DateRangePicker2";

// const parsedValueCof = atob(CofString);

function App() {
  return (
    <>
      <DateRangePicker
        defaultStartDate={moment().add(2, "days")}
        defaultEndDate={moment().add(5, "days")}
        onDateRangeChange={(res) => console.log("res", res)}
      />

      {/* <DateRangePicker2 /> */}

      {/* <CSVTable base64String={CSVString} /> */}

      {/* <pre>{parsedValueCof}</pre> */}
    </>
  );
}

export default App;

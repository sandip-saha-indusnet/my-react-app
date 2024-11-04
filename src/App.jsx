import "./App.scss";
import { CSVPreview } from "./components/CSVPreview";
import { ResizableBox } from "./components/ResizableBox";
// import CSVBase64String from "./base64String/csv";
import CSVBase64String from "./base64String/testCSV";
// import ResizableBox2 from "./components/ResizableBox2/ResizableBox2";

// import CofString from "./base64String/cof";
// import CSVString from "./base64String/csv";
// import CSVTable from "./components/CSVTable";
// import DateRangePicker2 from "./components/DateRangePicker-2/DateRangePicker2";

// const parsedValueCof = atob(CofString);

function App() {
  return (
    <>
      {/* <DateRangePickerTag
        defaultStartDate={moment().add(2, "days")}
        defaultEndDate={moment().add(5, "days")}
        onDateRangeChange={(res) => console.log("res", res)}
      /> */}

      {/* <DateRangePicker2 /> */}

      {/* <CSVTable base64String={CSVString} /> */}

      {/* <pre>{parsedValueCof}</pre> */}
      <CSVPreview base64String={CSVBase64String} />
      {/* 
      <div style={{ paddingLeft: "100px", display: "flex" }}>
        <ResizableBox
          defaultWidth={200}
          defaultHeight={100}
          enable={{ right: true }}
          minWidth={100}
        >
          <div style={{ background: "red" }}>Resize Me!</div>
        </ResizableBox>
        <ResizableBox
          defaultWidth={200}
          defaultHeight={100}
          enable={{ right: true }}
        >
          <div style={{ background: "dodgerblue" }}>Resize Me!</div>
        </ResizableBox>
        <ResizableBox
          defaultWidth={200}
          defaultHeight={100}
          enable={{ bottom: true }}
        >
          <div style={{ background: "cyan" }}>Resize Me!</div>
        </ResizableBox>
      </div> */}
      {/* <ResizableBox2 /> */}
    </>
  );
}

export default App;

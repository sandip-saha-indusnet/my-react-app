import "./App.css";
import CofString from "./base64String/cof";
import CSVString from "./base64String/csv";
import CSVTable from "./components/CSVTable";

const parsedValueCof = atob(CofString);

function App() {
  return (
    <>
      <CSVTable base64String={CSVString} />

      <pre>{parsedValueCof}</pre>
    </>
  );
}

export default App;

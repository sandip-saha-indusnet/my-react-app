import { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVTable = ({ base64String }) => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    // Decode base64 and parse CSV
    const decodedCSV = atob(base64String);
    const { data, meta } = Papa.parse(decodedCSV, { header: true });

    // Set headers and data
    if (data.length && meta) {
      setHeaders(meta.fields);
      setTableData(data);
    }
  }, [base64String]);

  return (
    <table border="1">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVTable;

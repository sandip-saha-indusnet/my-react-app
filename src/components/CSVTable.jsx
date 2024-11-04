import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import "./table-style.css";

const CSVTable = ({ base64String }) => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const [columnWidths, setColumnWidths] = useState(
    Array(headers.length).fill(100)
  ); // Default width for columns
  const [rowHeights, setRowHeights] = useState(
    Array(tableData.length).fill(40)
  ); // Default height for rows
  const resizing = useRef({ row: null, col: null });
  const [currentHover, setCurrentHover] = useState(null);

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

  const handleColumnResize = (index, startX) => {
    const initialWidth = columnWidths[index];
    document.onmousemove = (e) => {
      const newWidths = [...columnWidths];
      newWidths[index] = Math.max(50, initialWidth + e.clientX - startX); // Set minimum width
      setColumnWidths(newWidths);
    };
    document.onmouseup = () =>
      (document.onmousemove = document.onmouseup = null);
  };

  const handleRowResize = (index, startY) => {
    const initialHeight = rowHeights[index];
    document.onmousemove = (e) => {
      const newHeights = [...rowHeights];
      newHeights[index] = Math.max(20, initialHeight + e.clientY - startY); // Set minimum height
      setRowHeights(newHeights);
    };
    document.onmouseup = () =>
      (document.onmousemove = document.onmouseup = null);
  };

  return (
    <table border="1">
      <thead>
        <tr>
          {headers.map((header, colIndex) => (
            <th key={header} style={{ width: columnWidths[colIndex] }}>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  <span
                    style={{
                      width: "10px",
                      background: "red",
                      display: "block",
                    }}
                    onMouseOver={() => {
                      if (colIndex !== 0) {
                        setCurrentHover(colIndex - 1);
                      }
                    }}
                  >
                    {currentHover === colIndex - 1 && "a"}
                  </span>

                  <span>{header}</span>
                </span>

                {/* <div
                className="resize-handle-col"
                onMouseDown={(e) => handleColumnResize(colIndex, e.clientX)}
              >
                hello
              </div> */}
                <span
                  onMouseOver={() => {
                    if (colIndex !== headers.length - 1) {
                      setCurrentHover(colIndex);
                    }
                  }}
                >
                  {currentHover === colIndex && "a"}
                </span>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ height: rowHeights[rowIndex] }}>
            {headers.map((header) => (
              <td key={header}>
                {row[header]}
                <div
                  className="resize-handle-row"
                  onMouseDown={(e) => handleRowResize(rowIndex, e.clientY)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVTable;

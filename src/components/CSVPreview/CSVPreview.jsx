import { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import "./csv-preview.scss";
import { ResizableBox, resizeTypes } from "../ResizableBox";
import { generateCSVHeaders } from "./utils/generateCSVHeader";
import { generateCSVMatrix } from "./utils/generateCSVMatrix";

const CSVPreview = ({ base64String }) => {
  const [tableData, setTableData] = useState([]);

  const numberOfCols = Math.max(
    100,
    tableData[0]?.length ? tableData[0]?.length + 1 : 0
  );
  const numberOfRows = Math.max(30, tableData.length || 0);

  const [currentDragIndex, setCurrentDragIndex] = useState(null);
  const [[isResizing, currentResizingType], setIsResizing] = useState([
    false,
    null,
  ]);

  const colWidths = ["0", ...Array.from({ length: numberOfCols }, () => 100)];
  // const rowHeights = ["0", ...Array.from({ length: numberOfRows }, () => 100)];
  const tableColRefs = useRef(() => Array(numberOfCols).fill(null));
  const tableRowRefs = useRef(() => Array(numberOfRows).fill(null));
  const [resizeIndicatorLeftOffset, setResizeIndicatorLeftOffset] =
    useState(null);
  const [resizeIndicatorTopOffset, setResizeIndicatorTopOffset] =
    useState(null);

  const tableRef = useRef(null);

  const CSVHeaders = useMemo(
    () => generateCSVHeaders(numberOfCols),
    [numberOfCols]
  );

  const csvMatrix = useMemo(
    () => generateCSVMatrix(numberOfCols, numberOfRows, tableData),
    [numberOfCols, numberOfRows, tableData]
  );

  useEffect(() => {
    // Decode base64 and parse CSV
    const decodedCSV = atob(base64String);
    const { data } = Papa.parse(decodedCSV, { header: false });

    // Set headers and data
    if (data.length) {
      setTableData(data);
    }
  }, [base64String]);

  const setIndicatorLeftOffsetFunc = (dragIndex) => {
    setResizeIndicatorLeftOffset(
      tableRowRefs.current[dragIndex]?.getBoundingClientRect()?.right -
        (tableRef.current?.getBoundingClientRect()?.left || 0)
    );
  };

  const setIndicatorTopOffsetFunc = (dragIndex) => {
    setResizeIndicatorTopOffset(
      tableColRefs.current[dragIndex]?.getBoundingClientRect()?.bottom -
        (tableRef.current?.getBoundingClientRect()?.top || 0)
    );
  };

  return (
    <div
      className={`csv-preview ${
        isResizing ? `csv-preview--resizing--${currentResizingType}` : ""
      }`}
    >
      <table className="csv-preview__table" ref={tableRef}>
        <thead>
          <tr>
            {/* {arr2.map((v, i) => (
              <th key={i} style={{ minWidth: "100px" }}>
                {v}
              </th>
            ))} */}
            {CSVHeaders.map((v, i) => (
              <ResizableBox
                ref={(element) => {
                  tableRowRefs.current[i] = element;
                }}
                enable={{ right: true }}
                key={i}
                defaultWidth={colWidths[i]}
                component="th"
                onResizeStart={(type) => {
                  setIsResizing([true, type]);
                  setCurrentDragIndex(i);
                  setIndicatorLeftOffsetFunc(i);
                }}
                onResizeStop={() => {
                  setIsResizing([false, null]);
                  setCurrentDragIndex(null);
                }}
                onSizeChange={({ type }) => {
                  if (type === resizeTypes.right) {
                    // setColWidths((prev) => {
                    //   const temp = [...prev];
                    //   temp[i] = size;
                    //   return temp;
                    // });
                    setIndicatorLeftOffsetFunc(currentDragIndex);
                  }
                }}
              >
                {v}
              </ResizableBox>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvMatrix.map((tableRow, i) => {
            // TODO: should not use index as key
            return (
              <tr key={i}>
                <ResizableBox
                  component="td"
                  ref={(element) => {
                    tableColRefs.current[i] = element;
                  }}
                  className="csv-preview__table__row-numbering"
                  enable={{ bottom: true }}
                  //   defaultHeight={rowHeights[i]}
                  onResizeStart={(type) => {
                    setIsResizing([true, type]);
                    setCurrentDragIndex(i);
                    setIndicatorTopOffsetFunc(i);
                  }}
                  onResizeStop={() => {
                    setIsResizing([false, null]);
                    setCurrentDragIndex(null);
                  }}
                  onSizeChange={() => {
                    setIndicatorTopOffsetFunc(currentDragIndex);
                  }}
                >
                  {i + 1}
                </ResizableBox>
                {tableRow.map((tableItem, j) => (
                  <td key={j}>{tableItem}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isResizing && (
        <>
          {currentResizingType === resizeTypes.right && (
            <div
              className="csv-preview__resize-indicator csv-preview__resize-indicator--vertical"
              style={{
                left: resizeIndicatorLeftOffset,
              }}
            ></div>
          )}
          {currentResizingType === resizeTypes.bottom && (
            <div
              className="csv-preview__resize-indicator csv-preview__resize-indicator--horizontal"
              style={{
                top: resizeIndicatorTopOffset,
              }}
            ></div>
          )}
        </>
      )}
    </div>
  );
};

export default CSVPreview;

//  <tr>
//             <ResizableBox component="td" enable={{ bottom: true }}>
//               sam
//             </ResizableBox>
//             {/* <td>sam</td> */}
//             <td>26</td>
//             <td>howrah</td>
//           </tr>
//           <tr>
//             <td>Jenny</td>
//             <td>23</td>
//             <td>Atlanta</td>
//           </tr>
//           <tr>
//             <td>Alex</td>
//             <td>26</td>
//             <td>Boston</td>
//           </tr>

// left:
//               tableRowRefs.current[currentDragIndex]?.getBoundingClientRect()
//                 ?.left -
//               (tableRef.current?.getBoundingClientRect()?.left || 0) +
//               "px",

import "./date-range-picker.css";

const DateRangePicker2 = () => {
  return (
    <div
      className="daterangepicker ltr show-calendar opensleft"
      style={{
        top: "952.4px",
        left: "auto",
        right: "124.412px",
        display: "block",
      }}
    >
      <div className="ranges"></div>
      <div className="drp-calendar left">
        <div className="calendar-table">
          <table className="table-condensed">
            <thead>
              <tr>
                <th className="prev available">
                  <span></span>
                </th>
                <th colSpan="5" className="month">
                  Oct 2024
                </th>
                <th></th>
              </tr>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="weekend off ends available" data-title="r0c0">
                  29
                </td>
                <td className="off ends available" data-title="r0c1">
                  30
                </td>
                <td className="available" data-title="r0c2">
                  1
                </td>
                <td className="available" data-title="r0c3">
                  2
                </td>
                <td className="available" data-title="r0c4">
                  3
                </td>
                <td className="available" data-title="r0c5">
                  4
                </td>
                <td className="weekend available" data-title="r0c6">
                  5
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r1c0">
                  6
                </td>
                <td className="available" data-title="r1c1">
                  7
                </td>
                <td className="available" data-title="r1c2">
                  8
                </td>
                <td className="available" data-title="r1c3">
                  9
                </td>
                <td className="available" data-title="r1c4">
                  10
                </td>
                <td className="available" data-title="r1c5">
                  11
                </td>
                <td className="weekend available" data-title="r1c6">
                  12
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r2c0">
                  13
                </td>
                <td className="available" data-title="r2c1">
                  14
                </td>
                <td className="available" data-title="r2c2">
                  15
                </td>
                <td className="available" data-title="r2c3">
                  16
                </td>
                <td className="available" data-title="r2c4">
                  17
                </td>
                <td className="available" data-title="r2c5">
                  18
                </td>
                <td className="weekend available" data-title="r2c6">
                  19
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r3c0">
                  20
                </td>
                <td className="available" data-title="r3c1">
                  21
                </td>
                <td className="available" data-title="r3c2">
                  22
                </td>
                <td className="available" data-title="r3c3">
                  23
                </td>
                <td className="available" data-title="r3c4">
                  24
                </td>
                <td className="available" data-title="r3c5">
                  25
                </td>
                <td className="weekend available" data-title="r3c6">
                  26
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r4c0">
                  27
                </td>
                <td className="available" data-title="r4c1">
                  28
                </td>
                <td className="available" data-title="r4c2">
                  29
                </td>
                <td
                  className="today active start-date available"
                  data-title="r4c3"
                >
                  30
                </td>
                <td className="in-range available" data-title="r4c4">
                  31
                </td>
                <td
                  className="off ends active end-date in-range available"
                  data-title="r4c5"
                >
                  1
                </td>
                <td className="weekend off ends available" data-title="r4c6">
                  2
                </td>
              </tr>
              <tr>
                <td className="weekend off ends available" data-title="r5c0">
                  3
                </td>
                <td className="off ends available" data-title="r5c1">
                  4
                </td>
                <td className="off ends available" data-title="r5c2">
                  5
                </td>
                <td className="off ends available" data-title="r5c3">
                  6
                </td>
                <td className="off ends available" data-title="r5c4">
                  7
                </td>
                <td className="off ends available" data-title="r5c5">
                  8
                </td>
                <td className="weekend off ends available" data-title="r5c6">
                  9
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="calendar-time" style={{ display: "none" }}></div>
      </div>
      <div className="drp-calendar right">
        <div className="calendar-table">
          <table className="table-condensed">
            <thead>
              <tr>
                <th></th>
                <th colSpan="5" className="month">
                  Nov 2024
                </th>
                <th className="next available">
                  <span></span>
                </th>
              </tr>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="weekend off ends available" data-title="r0c0">
                  27
                </td>
                <td className="off ends available" data-title="r0c1">
                  28
                </td>
                <td className="off ends available" data-title="r0c2">
                  29
                </td>
                <td
                  className="today off ends active start-date available"
                  data-title="r0c3"
                >
                  30
                </td>
                <td className="off ends in-range available" data-title="r0c4">
                  31
                </td>
                <td
                  className="active end-date in-range available"
                  data-title="r0c5"
                >
                  1
                </td>
                <td className="weekend available" data-title="r0c6">
                  2
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r1c0">
                  3
                </td>
                <td className="available" data-title="r1c1">
                  4
                </td>
                <td className="available" data-title="r1c2">
                  5
                </td>
                <td className="available" data-title="r1c3">
                  6
                </td>
                <td className="available" data-title="r1c4">
                  7
                </td>
                <td className="available" data-title="r1c5">
                  8
                </td>
                <td className="weekend available" data-title="r1c6">
                  9
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r2c0">
                  10
                </td>
                <td className="available" data-title="r2c1">
                  11
                </td>
                <td className="available" data-title="r2c2">
                  12
                </td>
                <td className="available" data-title="r2c3">
                  13
                </td>
                <td className="available" data-title="r2c4">
                  14
                </td>
                <td className="available" data-title="r2c5">
                  15
                </td>
                <td className="weekend available" data-title="r2c6">
                  16
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r3c0">
                  17
                </td>
                <td className="available" data-title="r3c1">
                  18
                </td>
                <td className="available" data-title="r3c2">
                  19
                </td>
                <td className="available" data-title="r3c3">
                  20
                </td>
                <td className="available" data-title="r3c4">
                  21
                </td>
                <td className="available" data-title="r3c5">
                  22
                </td>
                <td className="weekend available" data-title="r3c6">
                  23
                </td>
              </tr>
              <tr>
                <td className="weekend available" data-title="r4c0">
                  24
                </td>
                <td className="available" data-title="r4c1">
                  25
                </td>
                <td className="available" data-title="r4c2">
                  26
                </td>
                <td className="available" data-title="r4c3">
                  27
                </td>
                <td className="available" data-title="r4c4">
                  28
                </td>
                <td className="available" data-title="r4c5">
                  29
                </td>
                <td className="weekend available" data-title="r4c6">
                  30
                </td>
              </tr>
              <tr>
                <td className="weekend off ends available" data-title="r5c0">
                  1
                </td>
                <td className="off ends available" data-title="r5c1">
                  2
                </td>
                <td className="off ends available" data-title="r5c2">
                  3
                </td>
                <td className="off ends available" data-title="r5c3">
                  4
                </td>
                <td className="off ends available" data-title="r5c4">
                  5
                </td>
                <td className="off ends available" data-title="r5c5">
                  6
                </td>
                <td className="weekend off ends available" data-title="r5c6">
                  7
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="calendar-time" style={{ display: "none" }}></div>
      </div>
      <div className="drp-buttons">
        <span className="drp-selected">10/30/2024 - 11/01/2024</span>
        <button className="cancelBtn btn btn-sm btn-default" type="button">
          Cancel
        </button>
        <button className="applyBtn btn btn-sm btn-primary" type="button">
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker2;

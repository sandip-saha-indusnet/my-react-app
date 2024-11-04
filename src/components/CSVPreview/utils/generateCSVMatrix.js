export const generateCSVMatrix = (cols, rows, tableData) => {
  const blankMatrix = Array.from({ length: rows }, () =>
    Array(cols - 1).fill("")
  );

  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    for (let j = 0; j < item.length; j++) {
      const item2 = item[j];
      blankMatrix[i][j] = item2;
    }
  }

  return blankMatrix;
};

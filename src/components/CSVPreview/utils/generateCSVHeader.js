export function generateCSVHeaders(length) {
  const headers = [""];
  let i = 0;

  while (headers.length < length) {
    let header = "";
    let temp = i;

    do {
      header = String.fromCharCode((temp % 26) + 65) + header;
      temp = Math.floor(temp / 26) - 1;
    } while (temp >= 0);

    headers.push(header);
    i++;
  }

  return headers;
}

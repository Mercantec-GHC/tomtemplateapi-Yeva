export function parseDatetime(strDate) {
  var parts = strDate.split("-");

  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var day = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

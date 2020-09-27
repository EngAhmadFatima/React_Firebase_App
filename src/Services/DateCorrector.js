// Convert Date (new Date()) to (dd-mm-yyy)
export default function DateCorrector(date) {
  var tempDate = date;
  var Day =
    tempDate.getDate() < 10
      ? "0" + tempDate.getDate().toString()
      : tempDate.getDate().toString();
  var Month =
    tempDate.getMonth() + 1 < 10
      ? "0" + (tempDate.getMonth() + 1).toString()
      : tempDate.getMonth().toString();
  var Year = tempDate.getFullYear();
  date = Year + "-" + Month + "-" + Day;
  //console.log(Date.parse(date).toDateString())
  return date;
}

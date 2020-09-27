// Convert Date (dd-mm-yyy) to firestore date
export default function FireDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  var dd = new Date(string).toLocaleDateString([], options);
  var ii = new Date(dd);
  return ii;
}

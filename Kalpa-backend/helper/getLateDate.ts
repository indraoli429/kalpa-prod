/**
 * get tommorow of given date
 */

export default function getLateDate(givenDate: Date) {
  let d = new Date(givenDate);
  d.setDate(d.getDate() + 1);

  return d;
}

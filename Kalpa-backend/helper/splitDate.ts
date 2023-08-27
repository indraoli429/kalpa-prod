/**
 * split give date  and return only date part
 */

export default function splitDate(givenDate: Date) {
  let d = givenDate.toISOString().split("T");
  return d[0];
}

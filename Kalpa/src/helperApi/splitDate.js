/**
 * Input moment format date
 * And return only date part
 */

export default function splitDate(date) {
  let split = date.split("T");
  return split[0];
}

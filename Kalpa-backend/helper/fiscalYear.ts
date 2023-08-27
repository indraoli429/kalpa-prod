/**
 * get current fiscal year
 */

import NepaliDate from "nepali-date-converter";

export function getCurrentFiscalYear() {
  let currentNepali = new NepaliDate();

  let currentYear = currentNepali.getYear();
  let currentMonth = currentNepali.getMonth();

  if (currentMonth <= 2) {
    return `${currentYear - 1}-${currentYear}`;
  }
  return `${currentYear}-${currentYear + 1}`;
}

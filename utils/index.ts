import dayjs from "dayjs";

import { holidayList } from "./holidays";
export function getTimeDifference(targetDate: string | Date): {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
  isPast: boolean;
} {
  const now = dayjs();

  const target =
    typeof targetDate === "string" ? dayjs(targetDate) : dayjs(targetDate);

  const diff = target.diff(now);
  const isPast = diff <= 0;

  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = String(
    Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((absDiff % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  return { days, hours, minutes, seconds, isPast };
}

function isBetween(
  date: dayjs.Dayjs,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): boolean {
  return date.isAfter(startDate, "day") && date.isBefore(endDate, "day");
}

export function getNextHoliday() {
  const currentDate = dayjs();

  const allHolidays = Object.values(holidayList)
    .flat()
    .sort((a, b) => (dayjs(a.date).isBefore(b.date) ? -1 : 1));

  for (let i = 0; i < allHolidays.length; i++) {
    const holiday = allHolidays[i];
    const holidayStartDate = dayjs(holiday.date);
    const holidayEndDate = holidayStartDate.add(holiday.days - 1, "day");

    if (isBetween(currentDate, holidayStartDate, holidayEndDate)) {
      return holiday;
    }

    if (currentDate.isBefore(holidayStartDate)) {
      return holiday;
    }
  }

  return {
    date: currentDate.add(1, "year").format("YYYY-01-01"),
    days: 1,
    name: "元旦",
  }
}

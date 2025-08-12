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
  const target = typeof targetDate === "string" ? dayjs(targetDate) : dayjs(targetDate);

  // 计算时间差（毫秒）
  const diff = target.diff(now);
  const isPast = diff < 0;

  // 如果目标时间已过，返回0
  if (isPast) {
    return { days: 0, hours: "00", minutes: "00", seconds: "00", isPast };
  }

  // 计算天数、小时、分钟、秒数
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = String(
    Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(
    Math.floor((diff % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  return { days, hours, minutes, seconds, isPast };
}

function isBetween(
  date: dayjs.Dayjs,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): boolean {
  return (date.isAfter(startDate, "day") || date.isSame(startDate, "day")) && 
         (date.isBefore(endDate, "day") || date.isSame(endDate, "day"));
}

export function getNextHoliday() {
  const currentDate = dayjs();

  // 获取所有节假日并排序
  const allHolidays = Object.values(holidayList)
    .flat()
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  // 首先检查当前是否在某个节假日期间
  for (const holiday of allHolidays) {
    const holidayStartDate = dayjs(holiday.date);
    const holidayEndDate = holidayStartDate.add(holiday.days - 1, "day");

    if (isBetween(currentDate, holidayStartDate, holidayEndDate)) {
      return { ...holiday, isCurrent: true };
    }
  }

  // 查找下一个节假日
  for (const holiday of allHolidays) {
    const holidayStartDate = dayjs(holiday.date);
    
    // 如果节假日日期在今年，且还未到
    if (holidayStartDate.year() === currentDate.year() && 
        currentDate.isBefore(holidayStartDate)) {
      return { ...holiday, isCurrent: false };
    }
    
    // 如果节假日日期在明年
    if (holidayStartDate.year() > currentDate.year()) {
      return { ...holiday, isCurrent: false };
    }
  }

  // 如果今年没有更多节假日，返回明年的第一个节假日
  const nextYearHolidays = allHolidays.filter(holiday => 
    dayjs(holiday.date).year() === currentDate.year() + 1
  );

  if (nextYearHolidays.length > 0) {
    return { ...nextYearHolidays[0], isCurrent: false };
  }

  // 兜底：返回明年的元旦
  return {
    date: currentDate.add(1, "year").format("YYYY-01-01"),
    days: 1,
    name: "元旦",
    isCurrent: false,
  };
}

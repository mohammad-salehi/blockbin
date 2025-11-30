import moment from "jalali-moment";

export const utcToJalaliIran = (utcString) => {
  const iranOffsetMinutes = 3.5 * 60; // 3:30 → 210 دقیقه

  return moment
    .utc(utcString)            // تفسیر به عنوان UTC
    .utcOffset(iranOffsetMinutes) // تبدیل به ساعت ایران
    .locale("fa")              // اعداد و ماه‌ها به فارسی (در صورت نیاز)
    .format("jYYYY/jMM/jDD-HH:mm"); // خروجی: تاریخ و ساعت شمسی
};

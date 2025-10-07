export function timeSince(timestamp) {
    const now = Date.now();

    // If the timestamp is not in milliseconds, assume it's in seconds and convert it
    if (timestamp < 1e12) {
      timestamp *= 1000;
    }

    const elapsed = now - timestamp; // elapsed time in milliseconds

    const seconds = Math.floor(elapsed / 1000);
    if (seconds < 60) return seconds + " ثانیه قبل";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + " دقیقه قبل";

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + " ساعت قبل";

    const days = Math.floor(hours / 24);
    if (days < 30) return days + " روز قبل";

    const months = Math.floor(days / 30);
    if (months < 12) return months + " ماه قبل";

    const years = Math.floor(months / 12);
    return years + " سال قبل";
  }
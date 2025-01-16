export const THIRTY_MINUTES_MS = 30 * 60 * 1000;
export const FIVE_MINUTES_MS = 5 * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;

export function isToday(date) {
  const check = new Date(date);
  const today = new Date();
  return check.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

export function isAfterToday(date) {
  const check = new Date(date);
  const today = new Date();
  return check.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
}

export function isBeforeToday(date) {
  const check = new Date(date);
  const today = new Date();
  return check.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
}

export function isIntervalBiggerThanThreshold(
  startTimestamp,
  endTimestamp,
  threshold
) {
  const startTime = new Date(startTimestamp).getTime();
  const endTime = new Date(endTimestamp).getTime();

  return Math.abs(endTime - startTime) > threshold;
}

export function isEarlierThanThershold(startDate, startTime, threshold) {
  const slotDate = new Date(`${startDate}T${startTime}`);

  const thresholdTime = slotDate.getTime() - threshold;

  const currentTime = Date.now();
  return currentTime <= thresholdTime;
}

export function isEarlierThan24Hours(startDate, startTime) {
  return isEarlierThanThershold(startDate, startTime, DAY_MS);
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(date);
}

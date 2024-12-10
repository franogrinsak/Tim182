export function isToday(date) {
  const check = new Date(date);
  const today = new Date();
  return check.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

export function isEarlierThan24Hours(startDate, startTime) {
  const slotDate = new Date(`${startDate}T${startTime}`);

  // Calculate 24 hours before the target date (in milliseconds)
  const thresholdTime = slotDate.getTime() - 24 * 60 * 60 * 1000; // 24 hours in ms

  // Get the current time
  const currentTime = Date.now();

  return currentTime <= thresholdTime;
}

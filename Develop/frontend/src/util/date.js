export function isToday(date) {
  const check = new Date(date);
  const today = new Date();
  return check.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

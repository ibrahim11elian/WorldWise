export default function formatDate(date, weekday = undefined) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday,
  }).format(new Date(date));
}

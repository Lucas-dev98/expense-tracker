export function formatDate(date: string | Date | undefined | null) {
  if (!date) return "";
  let d: Date;
  if (typeof date === "string") {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  } else {
    return "";
  }
  return !isNaN(d.getTime()) ? d.toLocaleDateString("pt-BR") : "";
}
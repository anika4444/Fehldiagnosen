// Formatiert ein Datum als YYYY-MM-DD in lokaler Zeit.
// toISOString() rechnet in UTC um und liefert z. B. in UTC+2 um Mitternacht den Vortag.
export const toLocalDateString = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

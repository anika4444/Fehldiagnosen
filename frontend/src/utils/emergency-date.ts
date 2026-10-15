// Backend dates are UTC. Values read from MySQL come without the Z suffix, so it is added here.
export const toLocalDate = (value: string): Date =>
  new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? value : `${value}Z`);

const dateTimeFormatter = new Intl.DateTimeFormat("de-AT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("de-AT", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("de-AT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDateTime = (value: string) =>
  dateTimeFormatter.format(toLocalDate(value));

export const formatTime = (value: string) =>
  timeFormatter.format(toLocalDate(value));

export const formatDate = (value: string) =>
  dateFormatter.format(toLocalDate(value));

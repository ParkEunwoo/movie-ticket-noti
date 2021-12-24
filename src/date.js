export const formatDate = (date) => {
  const formatedDate = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
  return `${formatedDate} (${getDay(formatedDate)})`;
}

const DATE = ['일', '월', '화', '수', '목', '금', '토'];

export const getDay = (date) => {
  const d = toDate(date);
  return DATE[d.getDay()];
}

export const toDate = (dateStr) => {
  const date = new Date(dateStr);
  return date;
}

export const toString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${month}${day}`;
}

export const nextDate = (date) => {
  const d = toDate(date);
  d.setDate(d.getDate() + 1);
  return toString(d);
}

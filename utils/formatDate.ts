export const formatDate = (isoString: string) => {
  const d = new Date(isoString);
  return d
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "")
    .replace(/\.$/, "");
};

export const formatTwoDigit = (date: number) => {
  const two = String(date).padStart(2, "0");

  return two;
};

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  const month = formatTwoDigit(d.getMonth() + 1);
  const day = formatTwoDigit(d.getDate());
  const hour = formatTwoDigit(d.getHours());
  const min = formatTwoDigit(d.getMinutes());
  const second = formatTwoDigit(d.getSeconds());

  return `${d.getFullYear()}.${month}.${day} ${hour}:${min}:${second}`;
};

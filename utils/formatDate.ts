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

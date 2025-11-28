export const dateFormat = (date) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

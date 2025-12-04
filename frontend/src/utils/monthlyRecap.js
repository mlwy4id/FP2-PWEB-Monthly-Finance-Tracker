import { moneyFormat } from "./moneyFormat";

export const monthlyRecap = (items) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const total = items.reduce((acc, item) => {
    const splitItem = item.date.split("-");
    const itemMonth = Number(splitItem[1]);
    const itemYear = Number(splitItem[0]);

    if (itemMonth == month && itemYear == year) {
      acc += item.amount;
    }

    return acc;
  }, 0);

  return total;
};

export const monthNRecap = (m, y, items) => {
  const month = m + 1;

  const total = items.reduce((acc, item) => {
    const splitItem = item.date.split("-");
    const itemMonth = Number(splitItem[1]);
    const itemYear = Number(splitItem[0]);

    if (itemMonth == month && itemYear == y) {
      acc += item.amount;
    }

    return acc;
  }, 0);

  return total;
}
import { moneyFormat } from "./moneyFormat";

export const dailyRecap = (items) => {
    const day = new Date().toISOString().split("T")[0];

  const total = items.reduce((acc, item) => {
    if (day === item.date) {
      acc += item.amount;
    }

    return acc;
  }, 0);

  return moneyFormat(total);
};

export const moneyFormat = (value) => {
    const money = String(value);
    const raw = money.replace(/\D/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
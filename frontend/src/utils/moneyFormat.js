export const moneyFormat = (money) => {
    const raw = money.replace(/\D/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
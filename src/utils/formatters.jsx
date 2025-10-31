const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "CAD", // Change to your desired currency
  style: "currency",
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

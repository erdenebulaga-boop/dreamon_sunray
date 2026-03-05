export function formatPrice(price: number): string {
  return new Intl.NumberFormat("mn-MN").format(price) + "\u20ae";
}

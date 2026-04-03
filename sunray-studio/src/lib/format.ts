export function formatPrice(price: number): string {
  return new Intl.NumberFormat("mn-MN").format(price) + "\u20ae";
}

export function getEffectivePrice(product: { price: number; discountPercent?: number }): number {
  if (product.discountPercent) {
    return Math.round(product.price * (1 - product.discountPercent / 100));
  }
  return product.price;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
}

export type Order = {
  id: number;
  products: Product[],
  credit_card_number: string;
}

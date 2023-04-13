export type ProductFakeApiModel = {
  id: number;
  name: string;
  description: string;
  price: number;
}

export type OrderFakeApiModel = {
  id: number;
  products: ProductFakeApiModel[],
  credit_card_number: string;
}

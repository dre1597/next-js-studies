import { Product } from '@/@core/domain/entities/product';

export type OrderProps = {
  id?: number;
  products: Product[];
  creditCardNumber: number;
}

export class Order {
  constructor(public props: OrderProps) {}

  get id(): number | undefined {
    return this.props.id;
  }

  get products(): Product[] {
    return this.props.products;
  }

  get creditCardNumber(): number {
    return this.props.creditCardNumber;
  }

  get total(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  toJSON() {
    return {
      id: this.id,
      products: this.products.map((product) => product.toJSON()),
      creditCardNumber: this.creditCardNumber,
    };
  }
}

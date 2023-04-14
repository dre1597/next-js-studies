import { Product } from '@/@core/domain/product/product';

export type CartProps = {
  products: Product[];
}

export class Cart {
  constructor(public props: CartProps) {}

  get total() {
    return this.props.products.reduce((total, product) => total + product.price, 0);
  }

  get products() {
    return this.props.products;
  }

  addProduct(product: Product) {
    this.props.products.push(product);
  }

  removeProduct(productId: number) {
    this.props.products = this.props.products.filter(product => product.id !== productId);
  }

  clear() {
    this.props.products = [];
  }
}

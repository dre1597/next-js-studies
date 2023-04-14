import { Cart } from '@/@core/domain/cart/cart';

export interface CartGateway {
  getCart(): Promise<Cart>;

  save(cart: Cart): Promise<void>;
}

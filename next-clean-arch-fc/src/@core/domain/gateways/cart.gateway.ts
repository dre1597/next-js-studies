import { Cart } from '@/@core/domain/entities/cart';

export interface CartGateway {
  getCart(): Promise<Cart>;

  save(cart: Cart): Promise<void>;
}

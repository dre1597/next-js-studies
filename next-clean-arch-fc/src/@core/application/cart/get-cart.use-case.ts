import { CartGateway } from '@/@core/domain/cart/cart.gateway';
import { Cart } from '@/@core/domain/cart/cart';

export class GetCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(): Promise<Cart> {
    return this.cartGateway.getCart();
  }
}

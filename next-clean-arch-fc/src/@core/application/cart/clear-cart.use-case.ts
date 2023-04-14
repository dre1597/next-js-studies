import { CartGateway } from '@/@core/domain/cart/cart.gateway';
import { Cart } from '@/@core/domain/cart/cart';

export class ClearCartUseCase {
  constructor(private readonly cartGateway: CartGateway) {}

  async execute(): Promise<Cart> {
    const cart = await this.cartGateway.getCart();
    cart.clear();
    await this.cartGateway.save(cart);
    return cart;
  }
}

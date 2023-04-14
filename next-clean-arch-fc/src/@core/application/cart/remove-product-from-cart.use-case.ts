import { CartGateway } from '@/@core/domain/cart/cart.gateway';
import { Cart } from '@/@core/domain/cart/cart';

export class RemoveProductFromCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(productId: number): Promise<Cart> {
    const cart = await this.cartGateway.getCart();
    cart.removeProduct(productId);
    await this.cartGateway.save(cart);
    return cart;
  }
}

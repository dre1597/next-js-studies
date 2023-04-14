import { CartGateway } from '@/@core/domain/gateways/cart.gateway';

export class RemoveProductFromCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(productId: number): Promise<void> {
    const cart = await this.cartGateway.getCart();
    cart.removeProduct(productId);
    await this.cartGateway.save(cart);
  }
}

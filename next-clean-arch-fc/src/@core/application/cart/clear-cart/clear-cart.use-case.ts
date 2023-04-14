import { CartGateway } from '@/@core/domain/gateways/cart.gateway';

export class ClearCartUseCase {
  constructor(private readonly cartGateway: CartGateway) {}

  async execute(): Promise<void> {
    const cart = await this.cartGateway.getCart();
    cart.clear();
    await this.cartGateway.save(cart);
  }
}

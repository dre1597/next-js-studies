import { CartGateway } from '@/@core/domain/gateways/cart.gateway';
import { Cart } from '@/@core/domain/entities/cart';

export class GetCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(): Promise<Cart> {
    return this.cartGateway.getCart();
  }
}

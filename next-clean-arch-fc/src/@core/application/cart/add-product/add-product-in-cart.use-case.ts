import { CartGateway } from '@/@core/domain/gateways/cart.gateway';
import { Product } from '@/@core/domain/entities/product';

export class AddProductInCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(product: Product): Promise<void> {
    const cart = await this.cartGateway.getCart();
    cart.addProduct(product);
    await this.cartGateway.save(cart);
  }
}

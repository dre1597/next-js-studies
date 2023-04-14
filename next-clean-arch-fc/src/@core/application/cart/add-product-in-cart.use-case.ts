import { CartGateway } from '@/@core/domain/cart/cart.gateway';
import { Product } from '@/@core/domain/product/product';
import { Cart } from '@/@core/domain/cart/cart';

export class AddProductInCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  async execute(product: Product): Promise<Cart> {
    const cart = await this.cartGateway.getCart();
    cart.addProduct(product);
    await this.cartGateway.save(cart);
    return cart;
  }
}

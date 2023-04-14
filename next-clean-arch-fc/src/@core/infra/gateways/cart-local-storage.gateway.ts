import { Cart } from '@/@core/domain/entities/cart';
import { CartGateway } from '@/@core/domain/gateways/cart.gateway';

export class CartLocalStorageGateway implements CartGateway {

  private readonly CART_KEY = 'cart';

  async getCart(): Promise<Cart> {
    const products = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    return new Cart({ products });
  }

  async save(cart: Cart): Promise<void> {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products));
  }
}

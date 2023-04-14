import { Cart } from '@/@core/domain/cart/cart';
import { CartGateway } from '@/@core/domain/cart/cart.gateway';
import { injectable } from 'inversify';
import { Product } from '@/@core/domain/product/product';

@injectable()
export class CartLocalStorageGateway implements CartGateway {

  private readonly CART_KEY = 'cart';

  async getCart(): Promise<Cart> {
    const products = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    return new Cart({
      products: products.map((product: any) => new Product({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      }))
    });
  }

  async save(cart: Cart): Promise<void> {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products));
  }
}

import { OrderGateway } from '@/@core/domain/order/order.gateway';
import { Product } from '@/@core/domain/product/product';
import { Order } from '@/@core/domain/order/order';
import { CartGateway } from '@/@core/domain/cart/cart.gateway';

export class ProcessOrderUseCase {
  constructor(private orderGateway: OrderGateway, private cartGateway: CartGateway) {}

  async execute({ products, creditCardNumber }: { products: Product[]; creditCardNumber: number }): Promise<Order> {
    const order = new Order({
      products,
      creditCardNumber
    });

    const newOrder = await this.orderGateway.create(order);
    const cart = await this.cartGateway.getCart();
    cart.clear();
    await this.cartGateway.save(cart);
    return newOrder;
  }
}

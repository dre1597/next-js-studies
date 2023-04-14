import { OrderGateway } from '@/@core/domain/gateways/order.gateway';
import { Product } from '@/@core/domain/entities/product';
import { Order } from '@/@core/domain/entities/order';
import { CartGateway } from '@/@core/domain/gateways/cart.gateway';

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

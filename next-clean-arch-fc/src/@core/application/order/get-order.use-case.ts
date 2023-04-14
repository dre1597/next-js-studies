import { OrderGateway } from '@/@core/domain/order/order.gateway';
import { Order } from '@/@core/domain/order/order';

export class GetOrderUseCase {
  constructor(private orderGateway: OrderGateway) {}

  async execute(orderId: number): Promise<Order> {
    return await this.orderGateway.findById(orderId);
  }
}

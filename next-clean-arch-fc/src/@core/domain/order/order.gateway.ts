import { Order } from '@/@core/domain/order/order';

export interface OrderGateway {
  create(order: Order): Promise<Order>;

  findById(id: number): Promise<Order>;
}

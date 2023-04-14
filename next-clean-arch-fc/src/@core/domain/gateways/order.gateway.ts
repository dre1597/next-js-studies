import { Order } from '@/@core/domain/entities/order';

export interface OrderGateway {
  create(order: Order): Promise<Order>;

  findById(id: number): Promise<Order>;
}

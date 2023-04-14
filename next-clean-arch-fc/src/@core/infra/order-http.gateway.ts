import { OrderGateway } from '@/@core/domain/order/order.gateway';
import { AxiosInstance } from 'axios';
import { Order } from '@/@core/domain/order/order';
import { Product } from '@/@core/domain/product/product';

export class OrderHttpGateway implements OrderGateway {
  constructor(private readonly http: AxiosInstance) {}

  async create(order: Order): Promise<Order> {
    const response = await this.http.post('/orders', order.toJSON());
    order.props.id = response.data.id;
    return order;
  }

  async findById(id: number): Promise<Order> {
    const { data: order } = await this.http.get(`/orders/${ id }`);
    return new Order({
      id: order.id,
      products: order.products.map((product: any) => new Product({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      })),
      creditCardNumber: order.creditCardNumber
    });
  }
}

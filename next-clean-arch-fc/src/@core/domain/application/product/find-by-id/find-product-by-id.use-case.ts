import { ProductGateway } from '@/@core/domain/entities/gateways/product.gateway';
import { Product } from '@/@core/domain/entities/product';

export class FindProductByIdUseCase {
  constructor(private productGateway: ProductGateway) {}

  async execute(id: number): Promise<Product> {
    return new Product(await this.productGateway.findById(id));
  }
}

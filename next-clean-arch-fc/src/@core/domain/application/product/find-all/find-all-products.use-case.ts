import { ProductGateway } from '@/@core/domain/entities/gateways/product.gateway';
import { Product } from '@/@core/domain/entities/product';

export class FindAllProductsUseCase {
  constructor(private productGateway: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return await this.productGateway.findAll();
  }
}

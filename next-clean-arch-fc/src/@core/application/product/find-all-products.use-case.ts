import { ProductGateway } from '@/@core/domain/product/product.gateway';
import { Product } from '@/@core/domain/product/product';

export class FindAllProductsUseCase {
  constructor(private productGateway: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return await this.productGateway.findAll();
  }
}

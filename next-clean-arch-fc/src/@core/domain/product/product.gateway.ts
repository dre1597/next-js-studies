import { Product } from '@/@core/domain/product/product';

export interface ProductGateway {
  findAll(): Promise<Product[]>;

  findById(id: number): Promise<Product>;
}

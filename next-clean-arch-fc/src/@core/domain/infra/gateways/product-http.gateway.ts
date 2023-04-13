import { ProductGateway } from '@/@core/domain/entities/gateways/product.gateway';
import { AxiosInstance } from 'axios';
import { Product } from '@/@core/domain/entities/product';
import { ProductFakeApiModel } from '@/utils/models';

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    const { data: products } = await this.http.get<ProductFakeApiModel[]>('/products');
    return products.map((product) => new Product(product));
  }

  async findById(id: number): Promise<Product> {
    const { data: product } = await this.http.get<ProductFakeApiModel>(`/products/${ id }`);
    return new Product(product);
  }
}

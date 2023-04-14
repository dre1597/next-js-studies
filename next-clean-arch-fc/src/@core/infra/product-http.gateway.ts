import { ProductGateway } from '@/@core/domain/product/product.gateway';
import { AxiosInstance } from 'axios';
import { Product, ProductProps } from '@/@core/domain/product/product';

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    const { data: products } = await this.http.get<ProductProps[]>('/products');
    return products.map((product) => new Product(product));
  }

  async findById(id: number): Promise<Product> {
    const { data: product } = await this.http.get<ProductProps>(`/products/${ id }`);
    return new Product(product);
  }
}

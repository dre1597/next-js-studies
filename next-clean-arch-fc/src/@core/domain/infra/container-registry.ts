import { Container } from 'inversify';
import { http } from '@/@core/domain/infra/http';
import { ProductHttpGateway } from '@/@core/domain/infra/gateways/product-http.gateway';
import { FindAllProductsUseCase } from '@/@core/domain/application/product/find-all/find-all-products.use-case';
import { FindProductByIdUseCase } from '@/@core/domain/application/product/find-by-id/find-product-by-id.use-case';

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  ProductGateway: Symbol.for('ProductGateway'),
  FindAllProductsUseCase: Symbol.for('FindAllProductsUseCase'),
  FindProductByIdUseCase: Symbol.for('FindProductByIdUseCase'),
};

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);
container.bind(Registry.ProductGateway).toDynamicValue(
  (context) => new ProductHttpGateway(context.container.get(Registry.AxiosAdapter))
);
container.bind(Registry.FindAllProductsUseCase).toDynamicValue(
  (context) => new FindAllProductsUseCase(context.container.get(Registry.ProductGateway))
);
container.bind(Registry.FindProductByIdUseCase).toDynamicValue(
  (context) => new FindProductByIdUseCase(context.container.get(Registry.ProductGateway))
);

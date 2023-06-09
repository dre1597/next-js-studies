import 'reflect-metadata';
import { Container } from 'inversify';
import { http } from '@/@core/infra/http';
import { ProductHttpGateway } from '@/@core/infra/product-http.gateway';
import { FindAllProductsUseCase } from '@/@core/application/product/find-all-products.use-case';
import { FindProductByIdUseCase } from '@/@core/application/product/find-product-by-id.use-case';
import { CartLocalStorageGateway } from '@/@core/infra/cart-local-storage.gateway';
import { GetCartUseCase } from '@/@core/application/cart/get-cart.use-case';
import { AddProductInCartUseCase } from '@/@core/application/cart/add-product-in-cart.use-case';
import { RemoveProductFromCartUseCase } from '@/@core/application/cart/remove-product-from-cart.use-case';
import { ClearCartUseCase } from '@/@core/application/cart/clear-cart.use-case';
import { ProcessOrderUseCase } from '@/@core/application/order/process-order.use-case';
import { OrderHttpGateway } from '@/@core/infra/order-http.gateway';
import { GetOrderUseCase } from '@/@core/application/order/get-order.use-case';

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  ProductGateway: Symbol.for('ProductGateway'),
  OrderGateway: Symbol.for('OrderGateway'),
  CartGateway: Symbol.for('CartGateway'),
  FindAllProductsUseCase: Symbol.for('FindAllProductsUseCase'),
  FindProductByIdUseCase: Symbol.for('FindProductByIdUseCase'),
  GetCartUseCase: Symbol.for('GetCartUseCase'),
  ClearCartUseCase: Symbol.for('ClearCartUseCase'),
  AddProductInCartUseCase: Symbol.for('AddProductInCartUseCase'),
  RemoveProductFromCartUseCase: Symbol.for('RemoveProductFromCartUseCase'),
  ProcessOrderUseCase: Symbol.for('ProcessOrderUseCase'),
  GetOrderUseCase: Symbol.for('GetOrderUseCase'),
};

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);
container.bind(Registry.ProductGateway).toDynamicValue(
  (context) => new ProductHttpGateway(context.container.get(Registry.AxiosAdapter))
);
container.bind(Registry.CartGateway).to(CartLocalStorageGateway);
container.bind(Registry.OrderGateway).toDynamicValue(
  (context) => new OrderHttpGateway(context.container.get(Registry.AxiosAdapter))
);
container.bind(Registry.FindAllProductsUseCase).toDynamicValue(
  (context) => new FindAllProductsUseCase(context.container.get(Registry.ProductGateway))
);
container.bind(Registry.FindProductByIdUseCase).toDynamicValue(
  (context) => new FindProductByIdUseCase(context.container.get(Registry.ProductGateway))
);
container.bind(Registry.GetCartUseCase).toDynamicValue(
  (context) => new GetCartUseCase(context.container.get(Registry.CartGateway))
);
container.bind(Registry.ClearCartUseCase).toDynamicValue(
  (context) => new ClearCartUseCase(context.container.get(Registry.CartGateway))
);
container.bind(Registry.AddProductInCartUseCase).toDynamicValue(
  (context) => new AddProductInCartUseCase(context.container.get(Registry.CartGateway))
);
container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue(
  (context) => new RemoveProductFromCartUseCase(context.container.get(Registry.CartGateway))
);
container.bind(Registry.ProcessOrderUseCase).toDynamicValue(
  (context) => new ProcessOrderUseCase(
    context.container.get(Registry.OrderGateway),
    context.container.get(Registry.CartGateway)
  )
);
container.bind(Registry.GetOrderUseCase).toDynamicValue(
  (context) => new GetOrderUseCase(context.container.get(Registry.OrderGateway))
);

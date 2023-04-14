import React, { createContext, PropsWithChildren, useCallback } from 'react';
import { Cart } from '@/@core/domain/entities/cart';
import { container, Registry } from '@/@core/infra/container-registry';
import { AddProductInCartUseCase } from '@/@core/application/cart/add-product/add-product-in-cart.use-case';
import { Product } from '@/@core/domain/entities/product';
import {
  RemoveProductFromCartUseCase
} from '@/@core/application/cart/remove-product/remove-product-from-cart.use-case';
import { ClearCartUseCase } from '@/@core/application/cart/clear-cart/clear-cart.use-case';

export type CardContextType = {
  cart: Cart;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const defaultContext: CardContextType = {
  cart: new Cart({ products: [] }),
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
};

export const CartContext = createContext<CardContextType>(defaultContext);

const addProductInCartUseCase = container.get<AddProductInCartUseCase>(Registry.AddProductInCartUseCase);
const removeProductFromCartUseCase = container.get<RemoveProductFromCartUseCase>(Registry.RemoveProductFromCartUseCase);
const clearCartUseCase = container.get<ClearCartUseCase>(Registry.ClearCartUseCase);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = React.useState<Cart>(defaultContext.cart);

  const addToCart = useCallback(async (product: Product) => {
    const cart = await addProductInCartUseCase.execute(product);
    setCart(cart);
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    const cart = await removeProductFromCartUseCase.execute(productId);
    setCart(cart);
  }, []);

  const clearCart = useCallback(async () => {
    const cart = await clearCartUseCase.execute();
    setCart(cart);
  }, []);

  return (
    <CartContext.Provider value={ {
      cart,
      addToCart,
      removeFromCart,
      clearCart,
    } }
    >
      { children }
    </CartContext.Provider>
  );
};

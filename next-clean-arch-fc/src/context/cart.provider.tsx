import { ProductFakeApiModel } from '@/utils/models';
import React, { createContext, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

export type CardContextType = {
  products: ProductFakeApiModel[];
  addToCart: (product: ProductFakeApiModel) => void;
  removeFromCart: (product: ProductFakeApiModel) => void;
  clearCart: () => void;
  total: number;
}

const defaultContext: CardContextType = {
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0
};

export const CartContext = createContext<CardContextType>(defaultContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = React.useState<ProductFakeApiModel[]>([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products') || '[]'));
  }, []);

  useEffect(() => {
    if (products.length !== 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }

  }, [products]);

  const addToCart = useCallback((product: ProductFakeApiModel) => {
    setProducts((products) => [...products, product]);
  }, []);

  const removeFromCart = useCallback((product: ProductFakeApiModel) => {
    setProducts((products) => products.filter(p => p.id !== product.id));
  }, []);

  const clearCart = useCallback(() => {
    setProducts([]);
  }, []);

  const total = useMemo(() => products.reduce((acc, product) => acc + product.price, 0), [products]);

  return (
    <CartContext.Provider value={ {
      products,
      addToCart,
      removeFromCart,
      clearCart,
      total,
    } }
    >
      { children }
    </CartContext.Provider>
  );
};

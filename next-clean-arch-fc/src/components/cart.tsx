import { useContext } from 'react';
import { CartContext } from '@/context/cart.provider';
import Link from 'next/link';

export const CartComponent = () => {
  const cartContext = useContext(CartContext);

  return (
    <nav>
      Cart - Total { cartContext.cart.total } | Items { cartContext.cart.products.length }
      <Link href={ `/checkout` }>
        Checkout
      </Link>
    </nav>
  );
};

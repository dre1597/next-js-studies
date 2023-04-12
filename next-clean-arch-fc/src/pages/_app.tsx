import type { AppProps } from 'next/app';
import { CartComponent } from '@/components/cart';
import { CartProvider } from '@/context/cart.provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <CartComponent/>
      <Component { ...pageProps } />
    </CartProvider>
  );
}

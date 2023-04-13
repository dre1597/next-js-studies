import { NextPage } from 'next';
import { FormEvent, useContext } from 'react';
import { CartContext } from '@/context/cart.provider';
import { http } from '@/utils/http';
import { useRouter } from 'next/router';

export const CheckoutPage: NextPage = () => {

  const cartContext = useContext(CartContext);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const creditCardNumber = event.currentTarget.credit_card_number.value;

    const { data: order } = await http.post('orders', {
      id: Math.floor(Math.random()),
      products: cartContext.products,
      creditCardNumber: creditCardNumber
    });

    await router.push(`/checkout/${ order.id }/success`);
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <ul>
        { cartContext.products.map(product => (
          <li key={ product.id }>
            { product.name } - { product.price }
          </li>
        )) }
      </ul>

      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="credit_card_number">Credit card</label>
          <input type="text" name="credit_card_number" id="credit_card_number"/>
        </div>
        <div>
          <button type="submit">Buy</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

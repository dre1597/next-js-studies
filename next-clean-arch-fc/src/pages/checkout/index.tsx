import { NextPage } from 'next';
import { FormEvent } from 'react';

export const CheckoutPage: NextPage = () => {

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <form onSubmit={ onsubmit }>
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

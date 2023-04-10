import { Product } from '@/utils/models/product';
import React from 'react';

async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:8000/products', { next: { revalidate: 10 } }); // incremental static render
  // const response = await fetch('http://localhost:8000/products'); // static side render
  // const response = await fetch('http://localhost:8000/products', { cache: 'no-store' }); // server side render
  return await response.json();
}

export const ListProducts = async () => {
  const products = await getProducts();

  return (
    <div>
      <ul>
        {
          products.map((product) => (
            <li key={ product.id }>{ product.name } - ${ product.price }</li>
          ))
        }
      </ul>
    </div>
  );
};

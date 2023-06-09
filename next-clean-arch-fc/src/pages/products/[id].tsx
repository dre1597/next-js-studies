import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext } from 'react';
import { CartContext } from '@/context/cart.provider';
import { container, Registry } from '@/@core/infra/container-registry';
import { FindProductByIdUseCase } from '@/@core/application/product/find-product-by-id.use-case';
import { Product, ProductProps } from '@/@core/domain/product/product';

type ProductDetailsPageProps = {
  product: ProductProps
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
  const productEntity = new Product({ ...product });
  const cartContext = useContext(CartContext);

  const handleClick = async () => {
    await cartContext.addToCart(productEntity);
  };

  return (
    <div>
      <h3>{ product.name }</h3>
      <label>Preço: </label> { product.price }
      <button onClick={ handleClick }>Add to cart</button>
    </div>
  );
};

export default ProductDetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const useCase = container.get<FindProductByIdUseCase>(Registry.FindProductByIdUseCase);
  const product = await useCase.execute(
    +id!
  );

  return {
    props: {
      product: product.toJSON()
    }
  };

};

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext } from 'react';
import { CartContext } from '@/context/cart.provider';
import { container, Registry } from '@/@core/infra/container-registry';
import { FindProductByIdUseCase } from '@/@core/application/product/find-by-id/find-product-by-id.use-case';
import { ProductFakeApiModel } from '@/utils/models';

type ProductDetailsPageProps = {
  product: ProductFakeApiModel
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
  const cartContext = useContext(CartContext);

  const handleClick = () => {
    cartContext.addToCart(product);
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

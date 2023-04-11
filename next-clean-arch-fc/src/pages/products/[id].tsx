import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { http } from '@/utils/http';
import { Product } from '@/utils/models';

type ProductDetailsPageProps = {
  product: Product
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
  return (
    <div>
      <h3>{ product.name }</h3>
      <label>Preço: </label> { product.price }
      <button>Add to cart</button>
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

  const { data: product } = await http.get(`products/${ id }`);

  return {
    props: {
      product
    }
  };

};

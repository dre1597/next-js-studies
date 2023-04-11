import { GetServerSideProps, NextPage } from 'next';
import { http } from '@/utils/http';
import { Product } from '@/utils/models';

type HomePageProps = {
  products: Product[];
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <div>
      <h1>Ecommerce</h1>
      <ul>
        { products.map((product, key) => (
          <li key={ key }>
            <label>Name: </label> { product.name } | <a href="#">Details</a>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: products } = await http.get('products');

  return {
    props: { products }
  };
};

import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { FindAllProductsUseCase } from '@/@core/application/product/find-all-products.use-case';
import { container, Registry } from '@/@core/infra/container-registry';
import { ProductProps } from '@/@core/domain/product/product';

type HomePageProps = {
  products: ProductProps[];
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <div>
      <h1>Ecommerce</h1>
      <ul>
        { products.map((product, key) => (
          <li key={ key }>
            <label>Name: </label> { product.name } |
            <Link href={ `/products/${ product.id }` }>
              Details
            </Link>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const useCase = container.get<FindAllProductsUseCase>(Registry.FindAllProductsUseCase);
  const products = await useCase.execute();

  return {
    props: { products: products.map((product) => product.toJSON()) }
  };
};

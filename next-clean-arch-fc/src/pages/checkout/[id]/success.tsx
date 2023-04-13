import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { http } from '@/utils/http';
import { OrderFakeApiModel } from '@/utils/models';

type CheckoutSuccessPageProps = {
  order: OrderFakeApiModel;
}

export const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({ order }) => {
  return (
    <div>
      <h3>Success!</h3>
      <ul>
        {
          order.products.map(product => (
            <li key={ product.id }>
              { product.name } - { product.price }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};

  const { data: order } = await http.get(`orders/${ id }`);
  return {
    props: {
      order,
    }
  };
};

export default CheckoutSuccessPage;

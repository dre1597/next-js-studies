import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { container, Registry } from '@/@core/infra/container-registry';
import { GetOrderUseCase } from '@/@core/application/order/get-order.use-case';
import { OrderProps } from '@/@core/domain/order/order';

type CheckoutSuccessPageProps = {
  order: OrderProps;
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

  const getOrderUseCase = container.get<GetOrderUseCase>(Registry.GetOrderUseCase);

  const order = await getOrderUseCase.execute(+id!);

  return {
    props: {
      order: order.toJSON(),
    }
  };
};

export default CheckoutSuccessPage;

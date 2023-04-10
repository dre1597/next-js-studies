import { ListProducts } from '@/app/dashboard/list-products';
import { Suspense } from 'react';

const DashboardPage = () => {
  return (
    <div>
      <Suspense fallback={ <div>loading products...</div> }>
        {/* @ts-expect-error Server Componente */ }
        <ListProducts/>
      </Suspense>
    </div>
  );
};

export default DashboardPage;

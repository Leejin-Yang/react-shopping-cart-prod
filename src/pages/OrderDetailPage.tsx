import { Suspense } from 'react';
import styled from 'styled-components';

import OrderDetail from '../components/Order/OrderDetail';
import Message from '../components/Common/Message';
import { ErrorBoundary } from 'react-error-boundary';

const OrderDetailPage = () => {
  return (
    <Main>
      <PageTitle>주문 내역 상세</PageTitle>
      <ErrorBoundary fallback={<Message type='error' />}>
        <Suspense fallback={<Message type='loading' />}>
          <OrderDetail />
        </Suspense>
      </ErrorBoundary>
    </Main>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px 100px;
`;

const PageTitle = styled.h2`
  height: 120px;
  padding: 48px 0 0 0;
  margin: 0 auto 28px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
`;

export default OrderDetailPage;
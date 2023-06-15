import styled from 'styled-components';

import CartProductItem from './CartProductItem';
import EmptyMessage from '../Common/EmptyMessage';

import useGetCartItems from '../../hooks/queries/useGetCartItems';

const CartProductList = () => {
  const { data: cartItems } = useGetCartItems();

  if (cartItems?.length === 0) {
    return (
      <MessageWrapper>
        <EmptyMessage type='cart' />
      </MessageWrapper>
    );
  }

  return (
    <CartProductListContainer>
      {cartItems?.map((cartProduct) => (
        <li key={cartProduct.id}>
          <CartProductItem cartProduct={cartProduct} />
        </li>
      ))}
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.ul`
  & > li {
    padding: 18px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};

    @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
      padding: 30px 0;
    }
  }
`;

const MessageWrapper = styled.div`
  position: relative;
  height: 400px;
`;

export default CartProductList;

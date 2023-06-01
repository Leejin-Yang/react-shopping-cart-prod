import type { ChangeEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SelectBox from './SelectBox';

import CartIcon from '../../assets/CartIcon';
import useCartProductCount from '../../hooks/useCartProductCount';
import { serverNameState } from '../../states/serverName';
import { SERVER_OPTIONS, isServerKey } from '../../constants/server';

const Header = () => {
  const cartProductCount = useCartProductCount();
  const setServerName = useSetRecoilState(serverNameState);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const serverKey = event.currentTarget.value;

    if (isServerKey(serverKey)) setServerName(serverKey);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to='/'>
          <CartIcon width={51} height={44} color='white' />
          <Logo>SHOP</Logo>
        </LogoContainer>
        <LinkWrapper>
          <SelectBox options={SERVER_OPTIONS} onChange={onChange} />
          <CartPageLink to='/cart'>
            장바구니
            <ProductCountAlert>{cartProductCount}</ProductCountAlert>
          </CartPageLink>
          <OrderPageLink to='/orders'>주문 목록</OrderPageLink>
        </LinkWrapper>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1250px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 12px;
    transform: scaleX(-1);
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    & > svg {
      margin-right: 18px;
      transform: scaleX(-1);
    }
  }
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.1em;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 40px;
    line-height: 40px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 18px;
`;

const CartPageLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 24px;
  }
`;

const ProductCountAlert = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 6px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 22px;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    width: 26px;
    height: 26px;
    line-height: 26px;
  }
`;

const OrderPageLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 24px;
  }
`;

export default Header;

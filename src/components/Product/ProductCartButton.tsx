import styled from 'styled-components';

import AmountCounter from '../Common/AmountCounter';

import CartIcon from '../../assets/CartIcon';
import { useTargetCartItem, useCartProductUpdate } from '../../hooks/cart';
import useAddCartItem from '../../hooks/queries/useAddCartItem';

interface ProductCartButtonProps {
  productId: number;
}

const ProductCartButton = ({ productId }: ProductCartButtonProps) => {
  const { mutation: addCartItemMutation, cartItemId } = useAddCartItem();
  const targetProduct = useTargetCartItem(productId, cartItemId);
  const { addCount, subtractCount } = useCartProductUpdate(
    targetProduct?.id,
    targetProduct?.quantity
  );

  const addProduct = () => {
    addCartItemMutation.mutate(productId);
  };

  if (targetProduct) {
    return (
      <AmountCounter
        count={targetProduct.quantity}
        addCount={addCount}
        subtractCount={subtractCount}
        variant='small'
      />
    );
  }

  return (
    <ProductAddButton type='button' onClick={addProduct}>
      <CartIcon width={25} height={22} color='gray400' />
    </ProductAddButton>
  );
};

const ProductAddButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ProductCartButton;

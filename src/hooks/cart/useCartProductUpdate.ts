import { useSetRecoilState } from 'recoil';

import { toastState } from '../../states/toast';
import { DELETE_MESSAGE, QUANTITY_MESSAGE } from '../../constants/toast';
import useUpdateCartItemQuantity from '../queries/useUpdateCartItemQuantity';
import useDeleteCartItem from '../queries/useDeleteCartItem';

export const useCartProductUpdate = (
  id: number | undefined,
  quantity: number | undefined
) => {
  const updateCartItemQuantityMutation = useUpdateCartItemQuantity();
  const deleteCartItemMutation = useDeleteCartItem();

  const setToastState = useSetRecoilState(toastState);

  const deleteProduct = () => {
    try {
      if (!id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      deleteCartItemMutation.mutate(id);
    } catch (error) {
      setToastState(DELETE_MESSAGE.error);
    }
  };

  const addCount = () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity + 1;

      updateCartItemQuantityMutation.mutate({ id, quantity: updatedQuantity });
    } catch (error) {
      setToastState(QUANTITY_MESSAGE.error);
    }
  };

  const subtractCount = () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        deleteProduct();
        return;
      }

      updateCartItemQuantityMutation.mutate({ id, quantity: updatedQuantity });
    } catch (error) {
      setToastState(QUANTITY_MESSAGE.error);
    }
  };

  return { deleteProduct, addCount, subtractCount };
};

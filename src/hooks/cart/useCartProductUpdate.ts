import { useRecoilValue, useSetRecoilState } from 'recoil';

import { cartProductHandlerSelector } from '../../states/cartProducts';
import { toastState } from '../../states/toast';
import { DELETE_MESSAGE, QUANTITY_MESSAGE } from '../../constants/toast';
import useUpdateCartItemQuantity from '../queries/useUpdateCartItemQuantity';

export const useCartProductUpdate = (
  id: number | undefined,
  quantity: number | undefined
) => {
  const { deleteTargetCartProduct } = useRecoilValue(
    cartProductHandlerSelector
  );
  const updateCartItemQuantityMutation = useUpdateCartItemQuantity();
  const setToastState = useSetRecoilState(toastState);

  const deleteProduct = async () => {
    try {
      if (!id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      await deleteTargetCartProduct(id);
      setToastState(DELETE_MESSAGE.success);
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

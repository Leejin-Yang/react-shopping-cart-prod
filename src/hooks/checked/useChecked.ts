import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  checkedCartItemState,
  targetCheckedSelector,
} from '../../states/checkedCartItems';
import {
  addCartProductChecked,
  deleteCartProductChecked,
} from '../../states/checkedCartItems/utils';
import { CartProduct } from '../../types/product';
import useDeleteCartItem from '../queries/useDeleteCartItem';
import { DELETE_MESSAGE } from '../../constants/toast';
import { toastState } from '../../states/toast';

export const useChecked = (cartProduct: CartProduct) => {
  const { id } = cartProduct;
  const targetChecked = useRecoilValue(targetCheckedSelector(id));
  const setToastState = useSetRecoilState(toastState);
  const setChecked = useSetRecoilState(checkedCartItemState);

  const deleteCartItemMutation = useDeleteCartItem();

  const updateChecked = (isChecked: boolean) => {
    setChecked((prev) =>
      isChecked
        ? addCartProductChecked(prev, cartProduct)
        : deleteCartProductChecked(prev, id)
    );
  };

  const deleteChecked = async () => {
    try {
      await deleteCartItemMutation.mutateAsync(id);
      setChecked((prev) => deleteCartProductChecked(prev, id));
    } catch {
      setToastState(DELETE_MESSAGE.error);
    }
  };

  return { targetChecked, updateChecked, deleteChecked };
};

import type { ChangeEventHandler } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  allCheckedSelector,
  allUncheckedSelector,
  checkedCartProductIdSelector,
  checkedCartItemState,
} from '../../states/checkedCartItems';

import { useCartProductCount } from '../cart';
import useDeleteCartItem from '../queries/useDeleteCartItem';
import useGetCartItems from '../queries/useGetCartItems';

export const useMultipleChecked = () => {
  const checkedCartProductIds = useRecoilValue(checkedCartProductIdSelector);
  const cartItemCount = useCartProductCount();
  const setCheckedCartItems = useSetRecoilState(checkedCartItemState);
  const resetChecked = useResetRecoilState(checkedCartItemState);

  const { data: cartItems } = useGetCartItems();
  const deleteCartItemMutation = useDeleteCartItem();

  const isAllChecked = useRecoilValue(allCheckedSelector(cartItemCount));
  const isAllUnchecked = useRecoilValue(allUncheckedSelector);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked } = event.currentTarget;

    if (!checked || !cartItems) {
      resetChecked();
      return;
    }

    setCheckedCartItems(cartItems);
  };

  const deleteCheckedProducts = async () => {
    await Promise.all(
      checkedCartProductIds.map((id) => deleteCartItemMutation.mutateAsync(id))
    );
    resetChecked();
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};

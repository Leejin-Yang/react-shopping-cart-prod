import { useRecoilValue } from 'recoil';

import { useMultipleChecked } from '../checked';
import { checkedPriceSelector } from '../../states/checkedCartProducts';

const DELIVERY_FEE = 3_000;

export const useCartPrice = (couponPrice: number) => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceSelector);

  const deliveryFee = isAllUnchecked ? 0 : DELIVERY_FEE;
  const totalPrice = totalProductPrice + deliveryFee - couponPrice;

  return { totalProductPrice, deliveryFee, couponPrice, totalPrice };
};

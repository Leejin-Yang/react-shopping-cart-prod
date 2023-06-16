import { ChangeEventHandler, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useGetCoupons from '../queries/useGetCoupons';
import { checkedPriceSelector } from '../../states/checkedCartProducts';

export const useCoupons = () => {
  const [currentCouponId, setCurrentCouponId] = useState<number>();

  const { data: coupons } = useGetCoupons();
  const checkedPrice = useRecoilValue(checkedPriceSelector);

  const couponOptions =
    coupons?.map((coupon) => ({
      value: coupon.id,
      text: coupon.name,
      disabled: coupon.discountPrice >= checkedPrice,
    })) ?? [];

  const currentCouponPrice = currentCouponId
    ? coupons?.find((coupon) => coupon.id === currentCouponId)?.discountPrice ??
      0
    : 0;

  const changeTargetCoupon: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentCouponId(Number(event.currentTarget.value));
  };

  return {
    couponOptions,
    currentCouponId,
    currentCouponPrice,
    changeTargetCoupon,
  };
};

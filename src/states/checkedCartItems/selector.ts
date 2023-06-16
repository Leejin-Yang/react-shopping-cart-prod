import { selector, selectorFamily } from 'recoil';

import { checkedCartItemState } from './atom';
import { findTargetChecked, getCheckedPrice } from './utils';

export const targetCheckedSelector = selectorFamily({
  key: 'targetCheckedSelector',
  get:
    (targetId: number) =>
    ({ get }) =>
      findTargetChecked(get(checkedCartItemState), targetId),
});

export const checkedCountSelector = selector({
  key: 'checkedCartProductCountSelector',
  get: ({ get }) => get(checkedCartItemState).length,
});

export const checkedPriceSelector = selector({
  key: 'checkedPriceSelector',
  get: ({ get }) => getCheckedPrice(get(checkedCartItemState)),
});

export const checkedCartProductIdSelector = selector({
  key: 'checkedCartProductIdSelector',
  get: ({ get }) =>
    get(checkedCartItemState).map((cartProduct) => cartProduct.id),
});

export const allCheckedSelector = selectorFamily({
  key: 'allCheckedSelector',
  get:
    (cartItemCount: number) =>
    ({ get }) =>
      get(checkedCountSelector) > 0 &&
      get(checkedCountSelector) === cartItemCount,
});

export const allUncheckedSelector = selector({
  key: 'allUncheckedSelector',
  get: ({ get }) => get(checkedCountSelector) === 0,
});

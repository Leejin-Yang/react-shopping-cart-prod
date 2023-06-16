import { atom } from 'recoil';
import { CartProduct } from '../../types/product';

export const checkedCartItemState = atom<CartProduct[]>({
  key: 'checkedCartItemState',
  default: [],
});

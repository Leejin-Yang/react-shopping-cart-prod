import { selector } from 'recoil';

import { cartProductState } from './atom';

import { serverNameState } from '../serverName';
import cartProductApis from '../../apis/cartProducts';

export const cartProductSelector = selector({
  key: 'cartProductSelector',
  get: ({ get }) => {
    const serverName = get(serverNameState);
    return cartProductApis(serverName).getCartProducts();
  },
});

export const cartProductCountSelector = selector({
  key: 'cartProductCountSelector',
  get: ({ get }) => get(cartProductState).length,
});

export const updateCartProductSelector = selector({
  key: 'updateCartProductSelector',
  get: ({ get, getCallback }) => {
    const serverName = get(serverNameState);
    const { getCartProducts } = cartProductApis(serverName);

    const updateCartProduct = getCallback(({ set }) => async () => {
      const newCartProducts = await getCartProducts();
      set(cartProductState, newCartProducts);
    });

    return updateCartProduct;
  },
});

export const cartProductHandlerSelector = selector({
  key: 'cartProductHandlerSelector',
  get: ({ get }) => {
    const serverName = get(serverNameState);
    const updateCartProduct = get(updateCartProductSelector);
    const { postCartProduct, patchCartProduct, deleteCartProduct } =
      cartProductApis(serverName);

    const addCart = async (id: number) => {
      const location = await postCartProduct(id);
      await updateCartProduct();

      return Number(location?.split('/').pop());
    };

    const updateTargetQuantity = async (id: number, quantity: number) => {
      await patchCartProduct(id, quantity);
      await updateCartProduct();
    };

    const deleteTargetCartProduct = async (id: number) => {
      await deleteCartProduct(id);
      await updateCartProduct();
    };

    const deleteMultipleCartProducts = async (ids: number[]) => {
      await Promise.all(ids.map((id) => deleteCartProduct(id)));
      await updateCartProduct();
    };

    return {
      addCart,
      updateTargetQuantity,
      deleteTargetCartProduct,
      deleteMultipleCartProducts,
    };
  },
});

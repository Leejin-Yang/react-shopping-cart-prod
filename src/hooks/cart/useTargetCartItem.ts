import useGetCartItems from '../queries/useGetCartItems';
import type { CartProduct } from '../../types/product';

const findTargetProduct = (
  cartProducts: CartProduct[],
  productId: number,
  cartItemId?: number
) =>
  cartProducts.find((cartProduct) =>
    cartItemId
      ? cartItemId === cartProduct.id
      : productId === cartProduct.product.id
  );

export const useTargetCartItem = (
  productId: number,
  cartItemId: number | undefined
) => {
  const { data: cartItems } = useGetCartItems();

  if (!cartItems) {
    return null;
  }

  const targetCartItem = findTargetProduct(cartItems, productId, cartItemId);

  return targetCartItem;
};

import useGetCartItems from '../queries/useGetCartItems';

export const useCartProductCount = () => {
  const { data: cartItems } = useGetCartItems();

  return cartItems?.length ?? 0;
};

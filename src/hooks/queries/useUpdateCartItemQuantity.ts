import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { serverNameState } from '../../states/serverName';
import { toastState } from '../../states/toast';
import { QUANTITY_MESSAGE } from '../../constants/toast';
import type { CartProduct } from '../../types/product';

const useUpdateCartItemQuantity = () => {
  const serverName = useRecoilValue(serverNameState);
  const setToastState = useSetRecoilState(toastState);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      cartProductApis(serverName).patchCartProduct(id, quantity),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cartItems', serverName] });
      const previousCartItems = queryClient.getQueryData<CartProduct[]>([
        'cartItems',
        serverName,
      ]);

      if (previousCartItems) {
        queryClient.setQueryData(
          ['cartItems', serverName],
          previousCartItems.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          )
        );
      }

      return { previousCartItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          ['cartItems', serverName],
          context.previousCartItems
        );
      }
      setToastState(QUANTITY_MESSAGE.error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', serverName] });
    },
  });

  return mutation;
};

export default useUpdateCartItemQuantity;

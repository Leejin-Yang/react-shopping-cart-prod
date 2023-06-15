import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { serverNameState } from '../../states/serverName';
import { toastState } from '../../states/toast';
import { ADD_MESSAGE } from '../../constants/toast';
import { useState } from 'react';

const useAddCartItem = () => {
  const [cartItemId, setCartItemId] = useState<number>();

  const serverName = useRecoilValue(serverNameState);
  const setToastState = useSetRecoilState(toastState);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: number) =>
      cartProductApis(serverName).postCartProduct(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cartItems', serverName]);
      setCartItemId(Number(data?.split('/').pop()));
      setToastState(ADD_MESSAGE.success);
    },
    onError: () => {
      setToastState(ADD_MESSAGE.error);
    },
  });

  return { mutation, cartItemId };
};

export default useAddCartItem;

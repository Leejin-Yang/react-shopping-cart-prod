import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { serverNameState } from '../../states/serverName';
import { toastState } from '../../states/toast';
import { DELETE_MESSAGE } from '../../constants/toast';

const useDeleteCartItem = () => {
  const serverName = useRecoilValue(serverNameState);
  const setToastState = useSetRecoilState(toastState);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) =>
      cartProductApis(serverName).deleteCartProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', serverName] });
      setToastState(DELETE_MESSAGE.success);
    },
    onError: () => {
      setToastState(DELETE_MESSAGE.error);
    },
  });

  return mutation;
};

export default useDeleteCartItem;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import orderApis from '../../apis/order';

import { serverNameState } from '../../states/serverName';
import { toastState } from '../../states/toast';
import { ORDER_MESSAGE } from '../../constants/toast';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import { checkedCartProductIdSelector } from '../../states/checkedCartItems';

const useAddOrder = () => {
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);
  const serverName = useRecoilValue(serverNameState);
  const setToastState = useSetRecoilState(toastState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      couponId,
      totalPrice,
    }: {
      couponId: number | undefined;
      totalPrice: number;
    }) =>
      orderApis(serverName).postOrder({ cartItemIds, totalPrice, couponId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', serverName]);
      queryClient.invalidateQueries(['cartItems', serverName]);
      queryClient.invalidateQueries(['coupons', serverName]);
      navigate(`/${PATH.order}`);
      setToastState(ORDER_MESSAGE.success);
    },
    onError: () => {
      setToastState(ORDER_MESSAGE.error);
    },
  });

  return mutation;
};

export default useAddOrder;

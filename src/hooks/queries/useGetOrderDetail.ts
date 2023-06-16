import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import orderApis from '../../apis/order';
import { serverNameState } from '../../states/serverName';

const useGetOrderDetail = () => {
  const serverName = useRecoilValue(serverNameState);
  const { orderId } = useParams();

  const info = useQuery({
    queryKey: ['orders', orderId, serverName],
    queryFn: () => orderApis(serverName).getOrderDetail(Number(orderId)),
    enabled: !!orderId,
  });

  return info;
};

export default useGetOrderDetail;

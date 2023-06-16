import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import orderApis from '../../apis/order';
import { serverNameState } from '../../states/serverName';

const useGetOrders = () => {
  const serverName = useRecoilValue(serverNameState);

  const info = useQuery({
    queryKey: ['orders', serverName],
    queryFn: orderApis(serverName).getOrders,
  });

  return info;
};

export default useGetOrders;

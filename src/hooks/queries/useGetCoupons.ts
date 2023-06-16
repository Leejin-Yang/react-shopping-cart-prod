import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import couponApis from '../../apis/coupons';
import { serverNameState } from '../../states/serverName';

const useGetCoupons = () => {
  const serverName = useRecoilValue(serverNameState);

  const info = useQuery({
    queryKey: ['coupons', serverName],
    queryFn: couponApis(serverName).getCoupons,
  });

  return info;
};

export default useGetCoupons;

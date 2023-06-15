import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import productApis from '../../apis/products';
import { serverNameState } from '../../states/serverName';

const useGetProducts = () => {
  const serverName = useRecoilValue(serverNameState);

  const info = useQuery({
    queryKey: ['products'],
    queryFn: productApis(serverName).getProducts,
  });

  return info;
};

export default useGetProducts;

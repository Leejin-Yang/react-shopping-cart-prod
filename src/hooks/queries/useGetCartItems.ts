import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { serverNameState } from '../../states/serverName';

const useGetCartItems = () => {
  const serverName = useRecoilValue(serverNameState);

  const info = useQuery({
    queryKey: ['cartItems', serverName],
    queryFn: cartProductApis(serverName).getCartProducts,
  });

  return info;
};

export default useGetCartItems;

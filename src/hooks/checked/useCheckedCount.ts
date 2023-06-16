import { useRecoilValue } from 'recoil';
import { checkedCountSelector } from '../../states/checkedCartItems';

export const useCheckedCount = () => {
  const checkedCount = useRecoilValue(checkedCountSelector);

  return checkedCount;
};

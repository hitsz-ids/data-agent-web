import { IConnectionListResponse, connectionListApi } from '@/apis/connections/ConnectionListApi';
import { IConnectionItem } from '@/types/connections';
import { atom, useSetRecoilState } from 'recoil';

const connectionListState = atom<IConnectionItem[]>({
  key: 'connectionList',
  default: []
});

const useConnectionListApi = () => {
  const setList = useSetRecoilState(connectionListState);

  return (searchVal?: string) =>
    connectionListApi
      .request({ pageNo: 1, pageSize: 20, searchVal })
      .then((res: IConnectionListResponse) => {
        setList(res.rows);
        return res.rows;
      });
};
export { connectionListState, useConnectionListApi };

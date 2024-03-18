import { IConnectionListResponse, connectionListApi } from '@/apis/connections/ConnectionListApi';
import { IConnectionItem } from '@/types/connections';
import { useEffect } from 'react';
import { atom, useSetRecoilState } from 'recoil';

const connectionListState = atom<IConnectionItem[]>({
  key: 'connectionList',
  default: []
});

const useConnectionList = (searchVal?: string) => {
  const setList = useSetRecoilState(connectionListState);

  useEffect(() => {
    connectionListApi
      .request({ pageNo: 1, pageSize: 20, searchVal })
      .then((res: IConnectionListResponse) => {
        setList(res.rows);
      });
  }, [searchVal]);
};
export { connectionListState, useConnectionList };

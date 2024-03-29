import { connectionDetailApi } from '@/apis/connections/ConnectionDetailApi';
import { IConnectionListResponse, connectionListApi } from '@/apis/connections/ConnectionListApi';
import { ConnectionPage } from '@/pages/main/connections';
import { IConnectionItem } from '@/types/connections';
import { atom, atomFamily, selectorFamily, useSetRecoilState } from 'recoil';

const connectionListState = atom<IConnectionItem[]>({
  key: 'ConnectionList',
  default: []
});

const connectionPageState = atom<ConnectionPage>({
  key: 'ConnectionPage',
  default: 'empty'
});

const connectionIdState = atom({
  key: 'ConnectionId',
  default: 0
});

const connectionRequestIdState = atomFamily({
  key: 'connectionRequestIdState',
  default: 0
});

const connectionInfoQuery = selectorFamily({
  key: 'ConnectionInfoQuery',
  get:
    connectionId =>
    async ({ get }) => {
      const id = get(connectionRequestIdState(connectionId));
      const response = await connectionDetailApi.request({
        id
      });
      return response;
    }
});

const useRefreshConnectionInfo = (id: number) => {
  const setUserInfoQueryRequestID = useSetRecoilState(connectionRequestIdState(id));
  return () => {
    setUserInfoQueryRequestID(requestId => requestId + 1);
  };
};

const useConnectionListApi = () => {
  const setList = useSetRecoilState(connectionListState);
  return (searchVal?: string) => {
    if (connectionListApi.loading) return;
    return connectionListApi
      .request({ pageNo: 1, pageSize: 20, searchVal })
      .then((res: IConnectionListResponse) => {
        setList(res.rows);
        return res.rows;
      });
  };
};

export { connectionListState, connectionIdState, connectionPageState };
export { connectionInfoQuery, useRefreshConnectionInfo, useConnectionListApi };

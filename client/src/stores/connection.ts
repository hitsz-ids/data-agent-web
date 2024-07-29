import { connectionsDetailApi } from '@/apis/connections/ConnectionsDetailApi';
import { IConnectionsListResponse, connectionListApi } from '@/apis/connections/ConnectionsListApi';
import { ConnectionPages } from '@/pages/main/connections';
import { IConnectionItem } from '@/types/connections';
import { atom, atomFamily, selectorFamily, useSetRecoilState } from 'recoil';

const connectionsListState = atom<IConnectionItem[]>({
  key: 'ConnectionList',
  default: []
});

const connectionsPageState = atom<ConnectionPages>({
  key: 'ConnectionPage',
  default: 'empty'
});

const curConnectionIdState = atom({
  key: 'ConnectionId',
  default: 0
});

const connectionsRequestIdState = atomFamily({
  key: 'ConnectionsRequestIdState',
  default: 0
});

const connectionsInfoQuery = selectorFamily({
  key: 'ConnectionInfoQuery',
  get:
    connectionId =>
    async ({ get }) => {
      const id = get(connectionsRequestIdState(connectionId));
      const response = await connectionsDetailApi.request({
        id
      });
      return response;
    }
});

const useRefreshConnectionInfo = (id: number) => {
  const setUserInfoQueryRequestID = useSetRecoilState(connectionsRequestIdState(id));
  return () => {
    setUserInfoQueryRequestID(requestId => requestId + 1);
  };
};

const useConnectionsListApi = () => {
  const setList = useSetRecoilState(connectionsListState);
  return (searchVal?: string) => {
    if (connectionListApi.loading) return;
    return connectionListApi
      .request({ pageNo: 1, pageSize: 20, searchVal })
      .then((res: IConnectionsListResponse) => {
        setList(res.rows);
        return res.rows;
      });
  };
};

export { connectionsListState, curConnectionIdState, connectionsPageState };
export { connectionsInfoQuery, useRefreshConnectionInfo, useConnectionsListApi };

import { ServiceMap } from '../ServiceMap';
import { IConnectionItem } from '@/types/connections';
import { BaseListApi, IListRequest, IListResponse } from '../BaseListApi';

export interface IConnectionsListRequest extends IListRequest {}
export interface IConnectionsListResponse extends IListResponse<IConnectionItem> {}

class ConnectionsListApi extends BaseListApi<
  IConnectionsListRequest,
  IConnectionsListResponse,
  IConnectionItem
> {
  constructor() {
    super({ url: ServiceMap.connectionsList });
  }
}

const connectionListApi = new ConnectionsListApi();

export { connectionListApi };

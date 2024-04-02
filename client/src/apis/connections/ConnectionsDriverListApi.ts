import { ServiceMap } from '../ServiceMap';
import { IConnectionDriverItem } from '@/types/connections';
import { BaseListApi, IListRequest, IListResponse } from '../BaseListApi';
import { ConnectionType } from '@/constants/connections';

export interface IConnectionDriverListRequest extends IListRequest {
  type: ConnectionType;
}
export interface IConnectionDriverListResponse extends IListResponse<IConnectionDriverItem> {}

class ConnectionsDriverListApi extends BaseListApi<
  IConnectionDriverListRequest,
  IConnectionDriverListResponse,
  IConnectionDriverItem
> {
  constructor() {
    super({ url: ServiceMap.connectionsDriverList });
  }
}

const connectionsDriverListApi = new ConnectionsDriverListApi();

export { connectionsDriverListApi };

import { ServiceMap } from '../ServiceMap';
import { IConnectionDriverItem } from '@/types/connections';
import { BaseListApi, IListRequest, IListResponse } from '../BaseListApi';
import { ConnectionType } from '@/constants/connection';

export interface IConnectionDriverListRequest extends IListRequest {
  type: ConnectionType;
}
export interface IConnectionDriverListResponse extends IListResponse<IConnectionDriverItem> {}

class ConnectionDriverListApi extends BaseListApi<
  IConnectionDriverListRequest,
  IConnectionDriverListResponse,
  IConnectionDriverItem
> {
  constructor() {
    super({ url: ServiceMap.connectionDriverList });
  }
}

const connectionDriverListApi = new ConnectionDriverListApi();

export { connectionDriverListApi };

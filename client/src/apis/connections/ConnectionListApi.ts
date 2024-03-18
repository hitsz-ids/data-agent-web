import { ServiceMap } from '../ServiceMap';
import { IConnectionItem } from '@/types/connections';
import { BaseListApi, IListRequest, IListResponse } from '../BaseListApi';

export interface IConnectionListRequest extends IListRequest {}
export interface IConnectionListResponse extends IListResponse<IConnectionItem> {}

class ConnectionListApi extends BaseListApi<
  IConnectionListRequest,
  IConnectionListResponse,
  IConnectionItem
> {
  constructor() {
    super({ url: ServiceMap.connectionList });
  }
}

const connectionListApi = new ConnectionListApi();

export { connectionListApi };

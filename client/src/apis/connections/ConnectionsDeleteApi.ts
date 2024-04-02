import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionsDeleteRequest {
  ids: number[];
}
export interface IConnectionsDeleteResponse {}

class ConnectionsDeleteApi extends BaseApi<IConnectionsDeleteRequest, IConnectionsDeleteResponse> {
  constructor() {
    super({ url: ServiceMap.connectionsDelete });
  }
}

const connectionsDeleteApi = new ConnectionsDeleteApi();

export { connectionsDeleteApi };

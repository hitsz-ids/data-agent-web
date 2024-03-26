import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionSyncRequest {
  id: number;
}
export interface IConnectionSyncResponse {}

class ConnectionSyncApi extends BaseApi<IConnectionSyncRequest, IConnectionSyncResponse> {
  constructor() {
    super({ url: ServiceMap.connectionSync });
  }
}

const connectionSyncApi = new ConnectionSyncApi();

export { connectionSyncApi };

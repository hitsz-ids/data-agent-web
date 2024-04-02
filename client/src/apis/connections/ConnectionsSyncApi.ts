import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionsSyncRequest {
  id: number;
}
export interface IConnectionsSyncResponse {}

class ConnectionsSyncApi extends BaseApi<IConnectionsSyncRequest, IConnectionsSyncResponse> {
  constructor() {
    super({ url: ServiceMap.connectionsSync });
  }
}

const connectionsSyncApi = new ConnectionsSyncApi();

export { connectionsSyncApi as connectionSyncApi };

import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionSyncInterruptRequest {
  id: number;
}
export interface IConnectionSyncInterruptResponse {}

class ConnectionSyncInterruptApi extends BaseApi<
  IConnectionSyncInterruptRequest,
  IConnectionSyncInterruptResponse
> {
  constructor() {
    super({ url: ServiceMap.connectionSyncInterrupt });
  }
}

const connectionSyncInterruptApi = new ConnectionSyncInterruptApi();

export { connectionSyncInterruptApi };

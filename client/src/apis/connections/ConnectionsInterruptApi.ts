import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionsSyncInterruptRequest {
  id: number;
}
export interface IConnectionsSyncInterruptResponse {}

class ConnectionsSyncInterruptApi extends BaseApi<
  IConnectionsSyncInterruptRequest,
  IConnectionsSyncInterruptResponse
> {
  constructor() {
    super({ url: ServiceMap.connectionsSyncInterrupt });
  }
}

const connectionsSyncInterruptApi = new ConnectionsSyncInterruptApi();

export { connectionsSyncInterruptApi };

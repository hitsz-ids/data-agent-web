import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { IConnectionsCreateRequest } from './ConnectionsCreateApi';

export interface IConnectionsTestRequest extends IConnectionsCreateRequest {}

export interface IConnectionsTestResponse {}

class ConnectionsTestApi extends BaseApi<IConnectionsTestRequest, IConnectionsTestResponse> {
  constructor() {
    super({ url: ServiceMap.connectionsTest });
  }
}

const connectionsTestApi = new ConnectionsTestApi();

export { connectionsTestApi };

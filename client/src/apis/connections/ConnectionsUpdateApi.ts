import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { IConnectionsCreateRequest } from './ConnectionsCreateApi';

type ConnectionTestRequest = Omit<IConnectionsCreateRequest, 'type'>;
export interface IConnectionsUpdateRequest extends ConnectionTestRequest {}

export interface IConnectionsUpdateResponse {
  id: number;
}

class ConnectionsUpdateApi extends BaseApi<IConnectionsUpdateRequest, IConnectionsUpdateResponse> {
  constructor() {
    super({ url: ServiceMap.connectionsUpdate });
  }
}

const connectionsUpdateApi = new ConnectionsUpdateApi();

export { connectionsUpdateApi };

import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { IConnectionCreateRequest } from './ConnectionCreateApi';

type ConnectionTestRequest = Omit<IConnectionCreateRequest, 'type'>;
export interface IConnectionUpdateRequest extends ConnectionTestRequest {}

export interface IConnectionUpdateResponse {}

class ConnectionUpdateApi extends BaseApi<IConnectionUpdateRequest, IConnectionUpdateResponse> {
  constructor() {
    super({ url: ServiceMap.connectionUpdate });
  }
}

const connectionUpdateApi = new ConnectionUpdateApi();

export { connectionUpdateApi };

import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { IConnectionCreateRequest } from './ConnectionCreateApi';

export interface IConnectionTestRequest extends IConnectionCreateRequest {}

export interface IConnectionTestResponse {}

class ConnectionTestApi extends BaseApi<IConnectionTestRequest, IConnectionTestResponse> {
  constructor() {
    super({ url: ServiceMap.connectionTest });
  }
}

const connectionTestApi = new ConnectionTestApi();

export { connectionTestApi };

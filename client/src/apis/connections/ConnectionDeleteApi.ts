import BaseApi from '../BaseApi';
import { ServiceMap } from '../ServiceMap';

export interface IConnectionDeleteRequest {
  ids: number[];
}
export interface IConnectionDeleteResponse {}

class ConnectionDeleteApi extends BaseApi<IConnectionDeleteRequest, IConnectionDeleteResponse> {
  constructor() {
    super({ url: ServiceMap.connectionDelete });
  }
}

const connectionDeleteApi = new ConnectionDeleteApi();

export { connectionDeleteApi };

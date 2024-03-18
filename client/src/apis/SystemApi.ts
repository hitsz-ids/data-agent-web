import { ServiceMap } from './ServiceMap';
import BaseApi, { BaseResponse } from './BaseApi';

export interface ISystemRequest {}
export interface ISystemResponse {}

class SystemApi extends BaseApi {
  constructor() {
    super({ url: ServiceMap.system });
  }
  send(data: ISystemRequest = {}): BaseResponse<ISystemResponse> {
    return this._request(data);
  }
}

const systemApi = new SystemApi();

export default systemApi;

import { ServiceMap } from './ServiceMap';
import BaseApi from './BaseApi';

export interface ISystemRequest {}
export interface ISystemResponse {}

class SystemApi extends BaseApi {
  constructor() {
    super({ url: ServiceMap.system });
  }
  send(data: ISystemRequest = {}) {
    return this.request(data);
  }
}

const systemApi = new SystemApi();

export default systemApi;

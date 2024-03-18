import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface ILoginRequest {
  username: string;
  pwd: string;
}
export interface ILoginResponse {}

class LoginApi extends BaseApi<ILoginRequest, ILoginResponse> {
  constructor() {
    super({ url: ServiceMap.login });
  }
}

export default { LoginApi };

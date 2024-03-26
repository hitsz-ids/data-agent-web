import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IConnectionUpdateRequest {
  name: string;
  host: string;
  port: string;
  database: string;
  oracleParamKey?: string; // type为oracle必传 取值返回：SID | SERVICE_NAME
  oracleParamValue?: string; // type为oracle必传
  oracleLoginRole?: string; // type为oracle必传 normal | sysdba |sysoper
  instance?: string; // type为sqlserver必传
  driver: {
    name: string;
    classpath: string;
  };
  extendFields: object[];
}

export interface IConnectionUpdateResponse {}

class ConnectionUpdateApi extends BaseApi<IConnectionUpdateRequest, IConnectionUpdateResponse> {
  constructor() {
    super({ url: ServiceMap.connectionUpdate });
  }
}

const connectionUpdateApi = new ConnectionUpdateApi();

export { connectionUpdateApi };

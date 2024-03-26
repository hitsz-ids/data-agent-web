import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { ConnectionType } from '@/constants/connection';

export interface IConnectionCreateRequest {
  type: ConnectionType;
  name: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
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

export interface IConnectionCreateResponse {}

class ConnectionCreateApi extends BaseApi<IConnectionCreateRequest, IConnectionCreateResponse> {
  constructor() {
    super({ url: ServiceMap.connectionCreate });
  }
}

const connectionCreateApi = new ConnectionCreateApi();

export { connectionCreateApi };

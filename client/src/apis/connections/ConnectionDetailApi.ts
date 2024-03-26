import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { ConnectionSyncStatus, ConnectionType } from '@/types/connections';

export interface IConnectionDetailRequest {
  id: number;
}

export interface IConnectionDetailResponse {
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
  status: ConnectionSyncStatus;
  driver: {
    name: string;
    classpath: string;
  };
  extendFields: object[];
}

class ConnectionDetailApi extends BaseApi<IConnectionDetailRequest, IConnectionDetailResponse> {
  constructor() {
    super({ url: ServiceMap.connectionDetail });
  }
}

const connectionDetailApi = new ConnectionDetailApi();

export { connectionDetailApi };

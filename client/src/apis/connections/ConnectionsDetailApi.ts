import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { ConnectionSyncStatus, ConnectionType } from '@/constants/connections';
import { IConnectionDriverItem } from '@/types/connections';

export interface IConnectionDetailRequest {
  id: number;
}

export interface IConnectionDetailResponse {
  id: number;
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
  errorMessage?: string;
  driver: IConnectionDriverItem;
  extendFields: object[];
}

class ConnectionsDetailApi extends BaseApi<IConnectionDetailRequest, IConnectionDetailResponse> {
  constructor() {
    super({ url: ServiceMap.connectionsDetail });
  }
}

const connectionsDetailApi = new ConnectionsDetailApi();

export { connectionsDetailApi };

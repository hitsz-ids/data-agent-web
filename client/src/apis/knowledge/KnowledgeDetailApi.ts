import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface KnowledgeDetailRequest {
  id: number;
}

export interface KnowledgeDetailResponse {
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
  extendFields: object[];
}

class KnowledgeDetailApi extends BaseApi<KnowledgeDetailRequest, KnowledgeDetailResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeDetail });
  }
}

const knowledgeDetailApi = new KnowledgeDetailApi();

export { knowledgeDetailApi };

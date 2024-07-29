import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeFileAddRequest {
  id: string;
  fileIds: number[];
}

export interface IKnowledgeFileAddResponse {
  id: number;
}

class KnowledgeFileAddApi extends BaseApi<IKnowledgeFileAddRequest, IKnowledgeFileAddResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeFileAdd });
  }
}

const knowledgeFileAddApi = new KnowledgeFileAddApi();

export { knowledgeFileAddApi };

import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeFileUpdateRequest {
  id: number;
  knowledgeFileId: number;
  name: string;
}

export interface IKnowledgeFileUpdateResponse {
  id: number;
}

class KnowledgeFileUpdateApi extends BaseApi<
  IKnowledgeFileUpdateRequest,
  IKnowledgeFileUpdateResponse
> {
  constructor() {
    super({ url: ServiceMap.knowledgeFileUpdate });
  }
}

const knowledgeFileUpdateApi = new KnowledgeFileUpdateApi();

export { knowledgeFileUpdateApi };

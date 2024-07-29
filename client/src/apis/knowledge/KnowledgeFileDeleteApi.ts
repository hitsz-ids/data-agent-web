import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeFileDeleteRequest {
  id: number; // 知识库id
  knowledgeFileIds: number[]; // 知识文件ids
}

export interface IKnowledgeFileDeleteResponse {}

class KnowledgeFileDeleteApi extends BaseApi<
  IKnowledgeFileDeleteRequest,
  IKnowledgeFileDeleteResponse
> {
  constructor() {
    super({ url: ServiceMap.knowledgeFileDelete });
  }
}

const knowledgeFileDeleteApi = new KnowledgeFileDeleteApi();

export { knowledgeFileDeleteApi };

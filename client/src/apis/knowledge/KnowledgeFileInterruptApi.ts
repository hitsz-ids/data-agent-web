import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeFileInterruptRequest {
  id: number; // 知识库id
  knowledgeFileId: number; // 知识文件ids
}

export interface IKnowledgeFileInterruptResponse {}

class KnowledgeFileInterruptApi extends BaseApi<
  IKnowledgeFileInterruptRequest,
  IKnowledgeFileInterruptResponse
> {
  constructor() {
    super({ url: ServiceMap.knowledgeFileInterrupt });
  }
}

const knowledgeFileInterruptApi = new KnowledgeFileInterruptApi();

export { knowledgeFileInterruptApi };

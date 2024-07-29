import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeFileTrainRequest {
  id: number; // 知识库id
  knowledgeFileIds: number[]; // 知识文件ids
}

export interface IKnowledgeFileTrainResponse {}

class KnowledgeFileTrainApi extends BaseApi<
  IKnowledgeFileTrainRequest,
  IKnowledgeFileTrainResponse
> {
  constructor() {
    super({ url: ServiceMap.knowledgeFileTrain });
  }
}

const knowledgeFileTrainApi = new KnowledgeFileTrainApi();

export { knowledgeFileTrainApi };

import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeDeleteRequest {
  ids: number[];
}

export interface IKnowledgeDeleteResponse {}

class KnowledgeDeleteApi extends BaseApi<IKnowledgeDeleteRequest, IKnowledgeDeleteResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeDelete, method: '' });
  }
}

const knowledgeDeleteApi = new KnowledgeDeleteApi();

export { knowledgeDeleteApi };

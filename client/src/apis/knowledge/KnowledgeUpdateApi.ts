import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeUpdateRequest {
  id: number;
  name: string;
  desc?: string;
}

export interface IKnowledgeUpdateResponse {
  id: number;
}

class KnowledgeUpdateApi extends BaseApi<IKnowledgeUpdateRequest, IKnowledgeUpdateResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeUpdate });
  }
}

const knowledgeUpdateApi = new KnowledgeUpdateApi();

export { knowledgeUpdateApi };

import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';

export interface IKnowledgeCreateRequest {
  name: string;
  desc?: string;
}

export interface IKnowledgeCreateResponse {
  id: number;
}

class KnowledgeCreateApi extends BaseApi<IKnowledgeCreateRequest, IKnowledgeCreateResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeCreate });
  }
}

const knowledgeCreateApi = new KnowledgeCreateApi();

export { knowledgeCreateApi };

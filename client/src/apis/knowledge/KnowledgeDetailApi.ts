import { ServiceMap } from '../ServiceMap';
import BaseApi from '../BaseApi';
import { IKnowledgeFileItem } from '@/types/knowledge';

export interface KnowledgeDetailRequest {
  id: number;
}

export interface KnowledgeDetailResponse {
  id: number;
  name: string;
  desc: string;
  createdTime: string;
  fileList: IKnowledgeFileItem[];
}

class KnowledgeDetailApi extends BaseApi<KnowledgeDetailRequest, KnowledgeDetailResponse> {
  constructor() {
    super({ url: ServiceMap.knowledgeDetail });
  }
}

const knowledgeDetailApi = new KnowledgeDetailApi();

export { knowledgeDetailApi };

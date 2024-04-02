import { ServiceMap } from '../ServiceMap';
import { IKnowledgeItem } from '@/types/knowledge';
import { BaseListApi, IListRequest, IListResponse } from '../BaseListApi';

export interface IKnowledgeListRequest extends IListRequest {}
export interface IKnowledgeListResponse extends IListResponse<IKnowledgeItem> {}

class KnowledgeListApi extends BaseListApi<
  IKnowledgeListRequest,
  IKnowledgeListResponse,
  IKnowledgeItem
> {
  constructor() {
    super({ url: ServiceMap.knowledgeList });
  }
}

const knowledgeListApi = new KnowledgeListApi();

export { knowledgeListApi };

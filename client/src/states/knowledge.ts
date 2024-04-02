import { knowledgeDetailApi } from '@/apis/knowledge/KnowledgeDetailApi';
import { IKnowledgeListResponse, knowledgeListApi } from '@/apis/knowledge/KnowledgeListApi';
import { KnowledgePage } from '@/pages/main/knowledge';
import { IKnowledgeItem } from '@/types/knowledge';
import { atom, atomFamily, selectorFamily, useSetRecoilState } from 'recoil';

const knowledgeListState = atom<IKnowledgeItem[]>({
  key: 'knowledgeList',
  default: []
});

const knowledgePageState = atom<KnowledgePage>({
  key: 'knowledgePage',
  default: 'empty'
});

const knowledgeIdState = atom({
  key: 'knowledgeId',
  default: 0
});

const knowledgeRequestIdState = atomFamily({
  key: 'knowledgeRequestIdState',
  default: 0
});

const knowledgeInfoQuery = selectorFamily({
  key: 'KnowledgeInfoQuery',
  get:
    knowledgeId =>
    async ({ get }) => {
      const id = get(knowledgeRequestIdState(knowledgeId));
      const response = await knowledgeDetailApi.request({
        id
      });
      return response;
    }
});

const useRefreshKnowledgeInfo = (id: number) => {
  const setUserInfoQueryRequestID = useSetRecoilState(knowledgeRequestIdState(id));
  return () => {
    setUserInfoQueryRequestID(requestId => requestId + 1);
  };
};

const useKnowledgeListApi = () => {
  const setList = useSetRecoilState(knowledgeListState);
  return (searchVal?: string) => {
    if (knowledgeListApi.loading) return;
    return knowledgeListApi
      .request({ pageNo: 1, pageSize: 20, searchVal })
      .then((res: IKnowledgeListResponse) => {
        setList(res.rows);
        return res.rows;
      });
  };
};

export { knowledgeListState, knowledgeIdState, knowledgePageState };
export { knowledgeInfoQuery, useRefreshKnowledgeInfo, useKnowledgeListApi };

import { knowledgeDetailApi } from '@/apis/knowledge/KnowledgeDetailApi';
import { IKnowledgeListResponse, knowledgeListApi } from '@/apis/knowledge/KnowledgeListApi';
import { KnowledgePage } from '@/pages/main/knowledge';
import { IKnowledgeItem } from '@/types/knowledge';
import { atom, atomFamily, selectorFamily, useSetRecoilState } from 'recoil';

const knowledgeListState = atom<IKnowledgeItem[]>({
  key: 'KnowledgeList',
  default: []
});

const knowledgePageState = atom<KnowledgePage>({
  key: 'KnowledgePage',
  default: 'empty'
});

const curKnowledgeIdState = atom({
  key: 'KnowledgeId',
  default: 0
});

const knowledgeRequestIdState = atomFamily({
  key: 'KnowledgeRequestIdState',
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
  const setKnowledgeInfoQueryRequestID = useSetRecoilState(knowledgeRequestIdState(id));
  return () => {
    setKnowledgeInfoQueryRequestID(requestId => requestId + 1);
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

export { knowledgeListState, curKnowledgeIdState, knowledgePageState };
export { knowledgeInfoQuery, useRefreshKnowledgeInfo, useKnowledgeListApi };

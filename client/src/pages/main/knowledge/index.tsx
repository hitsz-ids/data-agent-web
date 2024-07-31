import React, { useEffect } from 'react';

import MainContainer from '@/components/main-container';
import { useRecoilState } from 'recoil';
import { knowledgePageState } from '@/stores/knowledge';
import KnowledgeList from './list';
import EmptyComponent from '@/components/empty-component';
import KnowledgeDetail from './detail';

interface IKnowledgeProps {}

const EmptyContent = (
  <EmptyComponent>
    <div>EmptyContent</div>
  </EmptyComponent>
);

const pagesMap = {
  detail: <KnowledgeDetail></KnowledgeDetail>,
  empty: EmptyContent
};

export type KnowledgePage = keyof typeof pagesMap;

const Knowledge: React.FC<IKnowledgeProps> = () => {
  const [curPage, setCurPage] = useRecoilState(knowledgePageState);

  let CurPageComponent = pagesMap[curPage];

  useEffect(() => {
    return () => {
      setCurPage('empty');
    };
  }, []);

  return <MainContainer left={<KnowledgeList />} right={CurPageComponent}></MainContainer>;
};

export default Knowledge;

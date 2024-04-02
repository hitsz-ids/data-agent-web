import React from 'react';

import styles from './index.module.less';
import MainContainer from '@/components/main-container';
import { useRecoilValue } from 'recoil';
import { knowledgePageState } from '@/states/knowledge';
import KnowledgeList from './list';

interface IKnowledgeProps {}

const componentsMap = {
  create: <div>create</div>,
  detail: <div></div>,
  empty: <div>empty</div>
};

export type KnowledgePage = keyof typeof componentsMap;

const Knowledge: React.FC<IKnowledgeProps> = () => {
  const curComponent = useRecoilValue(knowledgePageState);

  let CurComponentToRender = componentsMap[curComponent];

  return (
    <div className={styles.knowledgeBox}>
      <MainContainer left={<KnowledgeList />} right={CurComponentToRender}></MainContainer>
    </div>
  );
};

export default Knowledge;

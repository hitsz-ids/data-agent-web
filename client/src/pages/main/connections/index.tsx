import React from 'react';
import ConnectionList from './list';
import ConnectionCreate from './create';
import EmptyComponent from '@/components/empty-component';
import ConnectionDetail from './detail';
import MainContainer from '@/components/main-container';
import { useRecoilValue } from 'recoil';
import { connectionPageState } from '@/states/connection';

interface IConnectionProps {}

const componentsMap = {
  create: ConnectionCreate,
  detail: ConnectionDetail,
  empty: EmptyComponent
};

export type ConnectionPage = keyof typeof componentsMap;

const Connection: React.FC<IConnectionProps> = () => {
  const curComponent = useRecoilValue(connectionPageState);

  let CurComponentToRender = componentsMap[curComponent];
  return (
    <MainContainer
      left={<ConnectionList></ConnectionList>}
      right={<CurComponentToRender></CurComponentToRender>}
    ></MainContainer>
  );
};

export default Connection;

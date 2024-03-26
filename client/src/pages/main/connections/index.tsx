import React, { useState } from 'react';
import ConnectionList from './list';
import ConnectionCreate from './create';
import EmptyComponent from '@/components/empty-component';
import ConnectionDetail from './detail';
import MainContainer from '@/components/main-container';

interface IConnectionProps {}
export interface IConnectionContentProps {
  connectionId?: number;
}

const componentsMap = {
  create: ConnectionCreate,
  detail: ConnectionDetail,
  empty: EmptyComponent
};

const Connection: React.FC<IConnectionProps> = () => {
  const [curComponent, setCurComponent] = useState<keyof typeof componentsMap>('empty');
  const [curId, setCurId] = useState<number>(0);

  const switchDetail = (id: number, callback: (isSuccess: boolean) => void) => {
    setCurComponent('detail');
    setCurId(id);
    callback(true);
  };

  const switchCreate = () => {
    setCurComponent('create');
    setCurId(0);
  };

  let CurComponentToRender = componentsMap[curComponent];
  return (
    <MainContainer
      left={
        <ConnectionList switchDetail={switchDetail} switchCreate={switchCreate}></ConnectionList>
      }
      right={<CurComponentToRender connectionId={curId}></CurComponentToRender>}
    ></MainContainer>
  );
  // return (
  //   <div className={styles.connectionLayout}>
  //     <div className={classNames(styles.connectionLeft, !showLeftBox ? styles.hidden : null)}></div>
  //     <div className={styles.connectionRight}></div>
  //   </div>
  // );
};

export default Connection;

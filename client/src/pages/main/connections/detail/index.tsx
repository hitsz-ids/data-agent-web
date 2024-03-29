import React from 'react';

import styles from './index.module.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { connectionIdState, connectionInfoQuery, connectionPageState } from '@/states/connection';
import ConnectionInfoComplete from '../create/connection-info-complete';

interface IConnectionDetailProps {}

const ConnectionDetail: React.FC<IConnectionDetailProps> = () => {
  const connectionId = useRecoilValue(connectionIdState);
  const connectioninfo = useRecoilValue(connectionInfoQuery(connectionId));
  const setConnectionPage = useSetRecoilState(connectionPageState);

  return (
    <div className={styles.connectionDetail}>
      <div className={styles.container}>
        <ConnectionInfoComplete
          type={connectioninfo.type}
          driver={connectioninfo.driver}
          connectionDetail={connectioninfo}
          cancel={() => {
            setConnectionPage('empty');
          }}
        ></ConnectionInfoComplete>
      </div>
    </div>
  );
};

export default ConnectionDetail;

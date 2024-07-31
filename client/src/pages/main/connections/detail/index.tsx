import React from 'react';

import styles from './index.module.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  curConnectionIdState,
  connectionsInfoQuery,
  connectionsPageState
} from '@/stores/connection';
import ConnectionInfoComplete from '../create/connection-info-complete';

interface IConnectionDetailProps {}

const ConnectionDetail: React.FC<IConnectionDetailProps> = () => {
  const connectionsId = useRecoilValue(curConnectionIdState);
  const connectionInfo = useRecoilValue(connectionsInfoQuery(connectionsId));
  const setConnectionPage = useSetRecoilState(connectionsPageState);

  return (
    <div className={styles.connectionDetail}>
      <div className={styles.container}>
        <ConnectionInfoComplete
          type={connectionInfo.type}
          driver={connectionInfo.driver}
          connectionDetail={connectionInfo}
          cancel={() => {
            setConnectionPage('empty');
          }}
        ></ConnectionInfoComplete>
      </div>
    </div>
  );
};

export default ConnectionDetail;

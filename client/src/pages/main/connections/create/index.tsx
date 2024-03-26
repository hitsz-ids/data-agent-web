import React, { useState } from 'react';

import styles from './index.module.less';
import Steps, { IStepItem } from '@/components/steps';
import { DatabaseConfigurationStep, ConnectionType } from '@/constants/connection';
import DatabaseChoice from './database-choice';
import { IConnectionDriverItem } from '@/types/connections';

interface IConnectionCreateProps {}

const createSteps: IStepItem[] = [{ label: '选择数据库' }, { label: '配置连接信息' }];

const ConnectionInfoComplete = () => {
  return <div>ConnectionInfoComplete</div>;
};

const ConnectionCreate: React.FC<IConnectionCreateProps> = () => {
  const [curStepNum, setCurStepNum] = useState(DatabaseConfigurationStep.TYPE_SELECTION);
  const databaseChange = (type: ConnectionType, driver: IConnectionDriverItem) => {
    console.log(type, driver);
  };

  return (
    <div className={styles.connectionCreate}>
      <div className={styles.container}>
        <Steps className={styles.createSteps} items={createSteps} curStepNum={curStepNum}></Steps>
        {curStepNum == DatabaseConfigurationStep.TYPE_SELECTION ? (
          <DatabaseChoice change={databaseChange}></DatabaseChoice>
        ) : (
          <ConnectionInfoComplete></ConnectionInfoComplete>
        )}
        <div className={styles.next}>
          {curStepNum == DatabaseConfigurationStep.TYPE_SELECTION ? (
            <button
              onClick={() => {
                setCurStepNum(DatabaseConfigurationStep.DETAIL_COMPLETION);
              }}
            >
              下一步
            </button>
          ) : (
            <button
              onClick={() => {
                setCurStepNum(DatabaseConfigurationStep.TYPE_SELECTION);
              }}
            >
              上一步
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCreate;

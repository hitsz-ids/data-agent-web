import React, { useState } from 'react';

import styles from './index.module.less';
import Steps, { IStepItem } from '@/components/steps';
import { DatabaseConfigurationStep, ConnectionType } from '@/constants/connections';
import DatabaseChoice from './database-choice';
import { IConnectionDriverItem } from '@/types/connections';
import ConnectionInfoComplete from './connection-info-complete';

interface IConnectionCreateProps {}

const createSteps: IStepItem[] = [{ label: '选择数据库' }, { label: '配置连接信息' }];

const ConnectionCreate: React.FC<IConnectionCreateProps> = () => {
  const [curStepNum, setCurStepNum] = useState(DatabaseConfigurationStep.TYPE_SELECTION);
  const [curDriver, setCurDriver] = useState<IConnectionDriverItem | undefined>(undefined); // 当前驱动信息 [驱动名称, 驱动类型
  const [curType, setCurType] = useState<ConnectionType>(ConnectionType.MYSQL); // 当前驱动信息 [驱动名称, 驱动类型

  const next = (type: ConnectionType, driver: IConnectionDriverItem) => {
    setCurType(type);
    setCurDriver(driver);
    setCurStepNum(DatabaseConfigurationStep.DETAIL_COMPLETION);
  };

  const handleCancel = () => {
    setCurStepNum(DatabaseConfigurationStep.TYPE_SELECTION);
  };

  return (
    <div className={styles.connectionCreate}>
      <div className={styles.container}>
        <Steps className={styles.createSteps} items={createSteps} curStepNum={curStepNum}></Steps>
        {curStepNum == DatabaseConfigurationStep.TYPE_SELECTION ? (
          <DatabaseChoice next={next}></DatabaseChoice>
        ) : (
          <ConnectionInfoComplete
            type={curType}
            driver={curDriver}
            cancel={handleCancel}
          ></ConnectionInfoComplete>
        )}
      </div>
    </div>
  );
};

export default ConnectionCreate;

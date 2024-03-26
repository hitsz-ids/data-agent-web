import React, { useEffect, useState } from 'react';

import styles from './index.module.less';
import { IConnectionDriverItem } from '@/types/connections';
import { ConnectionType } from '@/constants/connection';
import ConnectionTypeIcon, { connectionIconsMap } from '@/components/connection-type';
import classNames from 'classnames';
import { Select } from 'antd';
import { connectionDriverListApi } from '@/apis/connections/ConnectionDriverListApi';

interface IDatabaseChoiceProps {
  change: (type: ConnectionType, driver: IConnectionDriverItem) => void;
}

const DatabaseChoice: React.FC<IDatabaseChoiceProps> = props => {
  const [driverList, setDriverList] = useState<IConnectionDriverItem[]>([]); // 驱动列表
  const [curDbType, setCurDbType] = useState<ConnectionType>(ConnectionType.MYSQL); // 当前数据库类型
  const [curDriverIndex, setCurDriverIndex] = useState<number>(0); // 当前驱动索引

  const { change } = props;

  useEffect(() => {
    connectionDriverListApi.request({ pageNo: 1, pageSize: 1000, type: curDbType }).then(res => {
      setDriverList(res.rows || []);
    });
  }, [curDbType]);

  useEffect(() => {
    change(curDbType, driverList[curDriverIndex]);
  }, [curDriverIndex, curDbType]);

  const options = () => {
    return driverList.map((item, index) => ({ label: item.name, value: index }));
  };

  return (
    <div className={styles.databsseChoice}>
      <div className={styles.dbList}>
        {Object.entries(connectionIconsMap).map(([type, name]) => {
          let _type = type as unknown as ConnectionType;
          return (
            <div
              key={type}
              className={classNames(styles.dbItem, curDbType == _type ? styles.active : null)}
              onClick={() => {
                setCurDbType(_type);
              }}
            >
              <ConnectionTypeIcon
                className={styles.typeIcon}
                type={type as unknown as ConnectionType}
              />
              {name}
            </div>
          );
        })}
      </div>
      <div>
        <Select
          defaultValue={0}
          value={curDriverIndex}
          onChange={index => {
            setCurDriverIndex(parseInt(index + ''));
          }}
          options={options()}
        />
        <div>{driverList[curDriverIndex]?.name}</div>
      </div>
    </div>
  );
};

export default DatabaseChoice;

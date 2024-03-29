import React, { useEffect, useState } from 'react';

import styles from './index.module.less';
import { IConnectionDriverItem } from '@/types/connections';
import { ConnectionType } from '@/constants/connection';
import ConnectionTypeIcon, { connectionIconsMap } from '@/components/connection-type';
import classNames from 'classnames';
import { Form, Input, Select } from 'antd';
import { connectionDriverListApi } from '@/apis/connections/ConnectionDriverListApi';
import LinearButton from '@/components/linear-button';
import { DefaultOptionType } from 'antd/es/select';

interface IDatabaseChoiceProps {
  next: (type: ConnectionType, driver: IConnectionDriverItem) => void;
}

const DatabaseChoice: React.FC<IDatabaseChoiceProps> = props => {
  const [driverList, setDriverList] = useState<IConnectionDriverItem[]>([]); // 驱动列表
  const [curDbType, setCurDbType] = useState<ConnectionType>(ConnectionType.MYSQL); // 当前数据库类型
  const [curDriverIndex, setCurDriverIndex] = useState<number>(0); // 当前驱动索引
  const form = Form.useForm()[0];
  const { next } = props;

  useEffect(() => {
    connectionDriverListApi.request({ pageNo: 1, pageSize: 1000, type: curDbType }).then(res => {
      setDriverList(res.rows || []);
      form.setFieldsValue({ classpath: res.rows[0].classpath });
    });
  }, [curDbType]);

  const prepare: () => DefaultOptionType[] = () => {
    return driverList.map((item, index) => ({ label: item.name, value: index }));
  };

  return (
    <div className={styles.databsseChoice}>
      <div className={styles.dbList}>
        {Object.entries(connectionIconsMap).map(([type, name]) => {
          const _type = type as unknown as ConnectionType;
          return (
            <div
              key={type}
              className={classNames(styles.dbItem, curDbType == _type ? styles.active : null)}
              onClick={() => {
                setCurDbType(_type);
              }}
            >
              <ConnectionTypeIcon type={_type} showName />
            </div>
          );
        })}
      </div>
      <div className={styles.driver}>
        <Form form={form} labelAlign="left" labelCol={{ span: 3 }}>
          <Form.Item label="驱动" name="driver" initialValue={0}>
            <Select
              value={curDriverIndex}
              onChange={(index: number) => {
                setCurDriverIndex(index);
                form.setFieldsValue({ classpath: driverList[index].classpath });
              }}
              options={prepare()}
            />
          </Form.Item>
          <Form.Item
            label="Class"
            name="classpath"
            initialValue={driverList[curDriverIndex] ? driverList[curDriverIndex].classpath : ''}
          >
            <Input type="text" disabled />
          </Form.Item>
        </Form>
      </div>
      <div className={styles.operates}>
        <LinearButton
          onClick={() => {
            next(Number(curDbType), driverList[curDriverIndex]);
          }}
        >
          下一步
        </LinearButton>
      </div>
    </div>
  );
};

export default DatabaseChoice;

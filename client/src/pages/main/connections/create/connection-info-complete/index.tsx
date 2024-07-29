import React, { useEffect, useState } from 'react';

import styles from './index.module.less';
import { IConnectionDriverItem } from '@/types/connections';
import {
  ConnectionSyncStatus,
  ConnectionType,
  OracleLoginRole,
  OracleParamKey
} from '@/constants/connections';
import ConnectionTypeIcon, { connectionIconsMap } from '@/components/connection-type';
import { Button, Form, Input, Progress, Radio, RadioChangeEvent, Select, message } from 'antd';
import LinearButton from '@/components/linear-button';
import { connectionsTestApi } from '@/apis/connections/ConnectionsTestApi';
import { DefaultOptionType } from 'antd/es/select';
import {
  IConnectionsCreateRequest,
  connectionsCreateApi
} from '@/apis/connections/ConnectionsCreateApi';
import { IConnectionDetailResponse } from '@/apis/connections/ConnectionsDetailApi';
import {
  curConnectionIdState,
  connectionsPageState,
  useConnectionsListApi
} from '@/states/connection';
import { useSetRecoilState } from 'recoil';
import { connectionsUpdateApi } from '@/apis/connections/ConnectionsUpdateApi';
import classNames from 'classnames';
import ConnectionStatusIcon from '@/components/connection-status';
import { connectionsSyncInterruptApi } from '@/apis/connections/ConnectionsInterruptApi';

interface IConnectionInfoCompleteProps {
  type: ConnectionType;
  driver?: IConnectionDriverItem;
  connectionDetail?: IConnectionDetailResponse;
  cancel: () => void;
}

const oracleLoginRoleOptions: DefaultOptionType[] = [
  { label: OracleLoginRole.NORMAL, value: OracleLoginRole.NORMAL },
  { label: OracleLoginRole.SYS_DBA, value: OracleLoginRole.SYS_DBA },
  { label: OracleLoginRole.SYS_OPER, value: OracleLoginRole.SYS_OPER }
];

export const connectionStatusClassMap = {
  [ConnectionSyncStatus.CREATED]: styles.warning,
  [ConnectionSyncStatus.SYNCHRONIZING]: null,
  [ConnectionSyncStatus.SUCCESS]: null,
  [ConnectionSyncStatus.INTERRUPTED]: styles.failed,
  [ConnectionSyncStatus.FAILED]: styles.failed
};

const ConnectionInfoComplete: React.FC<IConnectionInfoCompleteProps> = props => {
  const { type, driver, connectionDetail, cancel } = props;
  const [testLoading, setTestLoading] = useState(false);
  const [authVisible, setAuthVisible] = useState<boolean | null>(null);
  const connectionListApi = useConnectionsListApi();
  const setCurConnectionId = useSetRecoilState(curConnectionIdState);
  const setConnectionsPageState = useSetRecoilState(connectionsPageState);
  const form = Form.useForm()[0];

  useEffect(() => {
    formValuesChange();
    return () => {
      connectionsTestApi.cancel();
    };
  }, []);

  useEffect(() => {
    if (connectionDetail) {
      form.setFieldsValue(connectionDetail);
      const visible = !!(connectionDetail.username && connectionDetail.password);
      form.setFieldValue('auth', visible);
      setAuthVisible(visible);
    } else {
      setAuthVisible(true);
      form.setFieldValue('auth', true);
    }
  }, [connectionDetail]);

  const handleTest = () => {
    const testParam = getFormValues();
    setTestLoading(true);
    connectionsTestApi
      .request(testParam)
      .then(() => {
        message.success('连接成功');
      })
      .finally(() => {
        setTestLoading(false);
      });
  };

  const handleSubmit = () => {
    connectionsCreateApi.request(getFormValues()).then(res => {
      message.success('数据接入创建成功');
      setCurConnectionId(res.id);
      setConnectionsPageState('detail');
      connectionListApi();
    });
  };

  const handleUpdate = () => {
    connectionsUpdateApi.request(getFormValues()).then(res => {
      message.success('数据接入更新成功');
      setCurConnectionId(res.id);
      setConnectionsPageState('detail');
      connectionListApi();
    });
  };

  const getFormValues: () => IConnectionsCreateRequest = () => {
    const formValues = form.getFieldsValue();
    for (const key in formValues) {
      if (key === 'URL' || key === 'auth') continue;
      if (formValues[key] === undefined) {
        formValues[key] = '';
      }
    }
    return Object.assign({ ...formValues }, { type, driver });
  };

  const getDefaultPort = (type: ConnectionType) => {
    switch (type) {
      case ConnectionType.MYSQL:
        return 3306;
      case ConnectionType.ORACLE:
        return 1521;
      case ConnectionType.POSTGRESQL:
        return 5432;
      case ConnectionType.SQLSERVER:
        return 1433;
      default:
        return 3306;
    }
  };

  const formValuesChange = () => {
    const formValues = form.getFieldsValue();
    let url = '';
    if (
      type === ConnectionType.MYSQL ||
      type === ConnectionType.POSTGRESQL ||
      type === ConnectionType.SQLSERVER
    ) {
      url = `jdbc::${connectionIconsMap[type].toLowerCase()}://${formValues.host || ''}:${formValues.port || ''}/${formValues.database || ''}`;
    } else if (type === ConnectionType.ORACLE) {
      url = `jdbc::${connectionIconsMap[type].toLowerCase()}://${formValues.host || ''}:${formValues.port || ''}/${formValues.database || ''}`;
    }
    form.setFieldValue('URL', url);
  };

  const handelAuthChange = (e: RadioChangeEvent) => {
    const visible = e.target.value;
    if (!visible) {
      clearAuth();
    }
    setAuthVisible(visible);
  };

  const clearAuth = () => {
    form.setFieldValue('username', '');
    form.setFieldValue('password', '');
  };

  const renderMessageBox = () => {
    const { status = ConnectionSyncStatus.CREATED } = connectionDetail || {};
    let element = null;
    switch (status) {
      case ConnectionSyncStatus.SYNCHRONIZING:
        element = (
          <div className={styles.syncProgress}>
            <Progress
              style={{
                margin: 0
              }}
              percent={30}
              strokeColor={'var(--color-process)'}
              strokeWidth={26}
            />
            <LinearButton
              className={styles.stopBtn}
              onClick={() => {
                interruptSync();
              }}
            >
              终止
            </LinearButton>
          </div>
        );
        break;
      case ConnectionSyncStatus.FAILED:
        element = (
          <div className={styles.syncStatus}>错误信息：{connectionDetail?.errorMessage}</div>
        );
        break;
      case ConnectionSyncStatus.INTERRUPTED:
        element = <div className={styles.syncStatus}>用户中断</div>;
        break;
      default:
        break;
    }
    return (
      <div className={classNames(styles.messageBox, connectionStatusClassMap[status])}>
        {element}
      </div>
    );
  };
  const interruptSync = () => {
    if (!connectionDetail) return;
    const { id } = connectionDetail;
    connectionsSyncInterruptApi.request({ id }).then(() => {
      message.success('终止成功');
      // TODO 更新列表详情
    });
  };

  return (
    <div className={styles.connectionInfoComplete}>
      <div className={styles.title}>
        <ConnectionTypeIcon
          className={styles.icon}
          type={type}
          size="large"
          showName
        ></ConnectionTypeIcon>
        <ConnectionStatusIcon
          status={connectionDetail?.status}
          message={connectionDetail?.errorMessage}
          renderType="text"
        ></ConnectionStatusIcon>
      </div>
      {connectionDetail ? renderMessageBox() : null}
      <Form
        form={form}
        className={styles.form}
        labelAlign="left"
        colon={false}
        labelCol={{ style: { width: 82 } }}
        onChange={formValuesChange}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <div className={styles.host}>
          <Form.Item
            style={{ width: '50%' }}
            label="主机"
            name="host"
            labelAlign="left"
            initialValue={'localhost'}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            style={{ width: '50%' }}
            label="端口"
            name="port"
            labelAlign="left"
            initialValue={getDefaultPort(type)}
            labelCol={{ style: { width: 40, marginLeft: '20px' } }}
          >
            <Input type="text" />
          </Form.Item>
        </div>
        <Form.Item label="身份验证" name="auth">
          <Radio.Group onChange={handelAuthChange}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        {authVisible && (
          <>
            <Form.Item label="用户名" name="username">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input type="text" />
            </Form.Item>
          </>
        )}
        <Form.Item label="数据库" name="database">
          <Input type="text" />
        </Form.Item>
        {type == ConnectionType.ORACLE && (
          <React.Fragment>
            <Form.Item label="Oracle参数" name="oracleParamKey">
              <Radio.Group
                onChange={() => {
                  form.setFieldValue('oracleParamValue', '');
                }}
              >
                <Radio value={OracleParamKey.SID}>{OracleParamKey.SID}</Radio>
                <Radio value={OracleParamKey.SERVICE_NAME}>{OracleParamKey.SERVICE_NAME}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label=" " name="oracleParamValue">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="role" name="oracleLoginRole" initialValue={OracleLoginRole.NORMAL}>
              <Select options={oracleLoginRoleOptions}></Select>
            </Form.Item>
          </React.Fragment>
        )}
        {type == ConnectionType.SQLSERVER && (
          <Form.Item label="instance" name="instance">
            <Input type="text" />
          </Form.Item>
        )}
        <Form.Item label="URL" name="URL">
          <Input type="text" />
        </Form.Item>
      </Form>
      <div className={styles.operates}>
        <div>
          <Button onClick={handleTest} type="link" loading={testLoading}>
            测试连接
          </Button>
        </div>
        <div>
          <Button className={styles.cancelBtn} onClick={() => cancel()}>
            取消
          </Button>
          <LinearButton
            onClick={() => {
              connectionDetail ? handleUpdate() : handleSubmit();
            }}
          >
            确定
          </LinearButton>
        </div>
      </div>
    </div>
  );
};

export default ConnectionInfoComplete;

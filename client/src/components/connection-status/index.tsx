import React from 'react';

import styles from './index.module.less';
import classNames from 'classnames';
import { ConnectionSyncStatus } from '@/constants/connections';
import { Tooltip } from 'antd';

export const connectionStatusClassMap = {
  [ConnectionSyncStatus.CREATED]: styles.warning,
  [ConnectionSyncStatus.SYNCHRONIZING]: styles.syncing,
  [ConnectionSyncStatus.SUCCESS]: styles.success,
  [ConnectionSyncStatus.INTERRUPTED]: styles.warning,
  [ConnectionSyncStatus.FAILED]: styles.failed
};

export const connectionStatusTextMap = {
  [ConnectionSyncStatus.CREATED]: '待处理',
  [ConnectionSyncStatus.SYNCHRONIZING]: '处理中',
  [ConnectionSyncStatus.SUCCESS]: '正常',
  [ConnectionSyncStatus.INTERRUPTED]: '中断',
  [ConnectionSyncStatus.FAILED]: '失败'
};

interface IConnectionStatusIconProps {
  status?: ConnectionSyncStatus;
  message?: string;
  renderType?: 'icon' | 'text';
}

const ConnectionStatusIcon: React.FC<IConnectionStatusIconProps> = props => {
  const { status = ConnectionSyncStatus.CREATED, message, renderType = 'icon' } = props;
  const Icon = (
    <i
      className={classNames(
        styles.connectionStatusIcon,
        renderType == 'text' ? styles.text : styles.icon,
        connectionStatusClassMap[status]
      )}
    >
      {renderType === 'text' ? connectionStatusTextMap[status] : null}
    </i>
  );

  return message && renderType == 'icon' ? (
    <Tooltip
      title={
        <span style={{ color: 'var(--text-color-primary)' }} onClick={e => e.stopPropagation()}>
          {' '}
          {message}
        </span>
      }
      placement="top"
      color={'white'}
    >
      {Icon}
    </Tooltip>
  ) : (
    Icon
  );
};

export default ConnectionStatusIcon;

import React from 'react';

import styles from './index.module.less';
import classNames from 'classnames';
import { ConnectionSyncStatus } from '@/constants/connection';

export const connectionStatusClassMap = {
  [ConnectionSyncStatus.CREATED]: styles.warning,
  [ConnectionSyncStatus.SYNCHRONIZING]: styles.syncing,
  [ConnectionSyncStatus.SUCCESS]: styles.success,
  [ConnectionSyncStatus.INTERRUPTED]: styles.warning,
  [ConnectionSyncStatus.FAILED]: styles.failed
};

interface IConnectionStatusIconProps {
  status: ConnectionSyncStatus;
}

const ConnectionStatusIcon: React.FC<IConnectionStatusIconProps> = props => {
  const { status } = props;
  return (
    <i className={classNames(styles.connectionStatusIcon, connectionStatusClassMap[status])}></i>
  );
};

export default ConnectionStatusIcon;

import React from 'react';

import styles from './index.module.less';
import { ConnectionType } from '@/constants/connection';
import Iconfont from '../iconfont';
import classNames from 'classnames';

// 跟iconfont图标对应的数据库类型
export const connectionIconsMap: { [key in ConnectionType]: string } = {
  [ConnectionType.MYSQL]: 'Mysql',
  [ConnectionType.ORACLE]: 'Oracle',
  [ConnectionType.POSTGRESQL]: 'PostgreSQL',
  [ConnectionType.SQLSERVER]: 'SQLServer'
};

interface IConnectionTypeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ConnectionType;
  showName?: boolean;
  className?: string;
}

const ConnectionTypeIcon: React.FC<IConnectionTypeIconProps> = props => {
  const { type, showName, className } = props;
  return (
    <Iconfont
      className={classNames(styles.typeIcon, className)}
      code={connectionIconsMap[type].toLowerCase()}
    >
      {showName ? connectionIconsMap[type] : null}
    </Iconfont>
  );
};

export default ConnectionTypeIcon;

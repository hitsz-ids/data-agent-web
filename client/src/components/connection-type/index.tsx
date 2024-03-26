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
  className?: string;
}

const ConnectionTypeIcon: React.FC<IConnectionTypeIconProps> = props => {
  return (
    <Iconfont
      className={classNames(styles.typeIcon, props.className)}
      code={connectionIconsMap[props.type].toLowerCase()}
    ></Iconfont>
  );
};

export default ConnectionTypeIcon;

import React from 'react';

import styles from './index.module.less';
import Iconfont from '../iconfont';

interface IEmptyComponentProps {
  children?: React.ReactNode;
}

const EmptyComponent: React.FC<IEmptyComponentProps> = props => {
  const { children } = props;
  return (
    <div className={styles.emptyComponent}>
      <div className={styles.mainContainer}>
        <div className={styles.robot}>
          <Iconfont code="robot" className={styles.icon}></Iconfont>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default EmptyComponent;

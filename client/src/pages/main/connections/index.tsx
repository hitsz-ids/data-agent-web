import React from 'react';

import styles from './index.module.less';

import ConnectionList from './list';

interface IConnectionProps {}

const Connection: React.FC<IConnectionProps> = () => {
  return (
    <div className={styles.connectionLayout}>
      <ConnectionList></ConnectionList>
      <div className={styles.connectionRight}></div>
    </div>
  );
};

export default Connection;

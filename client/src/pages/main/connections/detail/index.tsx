import React, { useEffect } from 'react';

import styles from './index.module.less';
import { IConnectionContentProps } from '..';

interface IConnectionDetailProps extends IConnectionContentProps {}

const ConnectionDetail: React.FC<IConnectionDetailProps> = props => {
  const { connectionId } = props;
  useEffect(() => {
    // Fetch data or perform any side effects here
    console.log('modify connection detail', connectionId);
  }, [connectionId]);

  return <div className={styles.connectionDetail}>Detail{connectionId}</div>;
};

export default ConnectionDetail;

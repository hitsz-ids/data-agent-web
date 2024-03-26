import React, { useEffect } from 'react';

import styles from './index.module.less';

interface IMyComponentProps {}

const MyComponent: React.FC<IMyComponentProps> = props => {
  useEffect(() => {
    // Fetch data or perform any side effects here
  }, []);

  return <div className={styles.myComponent}></div>;
};

export default MyComponent;

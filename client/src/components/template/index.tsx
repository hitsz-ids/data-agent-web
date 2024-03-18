import React, { useEffect } from 'react';

import styles from './index.less.module.less';

const MyComponent: React.FC = () => {
  useEffect(() => {
    // Fetch data or perform any side effects here
  }, []);

  return <div className={styles.myComponent}></div>;
};

export default MyComponent;

import React, { useEffect } from 'react';

import styles from './index.module.less';

interface ITestProps {}

const Test: React.FC<ITestProps> = () => {
  console.log('test render');
  useEffect(() => {
    // Fetch data or perform any side effects here
    return () => {};
  }, []);

  return <div className={styles.test}></div>;
};

export default Test;

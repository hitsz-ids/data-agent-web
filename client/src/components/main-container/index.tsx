import React from 'react';

import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { showLeftBoxState } from '@/stores/main';
import classNames from 'classnames';
import Iconfont from '../iconfont';

interface IMainContainerProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const MainContainer: React.FC<IMainContainerProps> = props => {
  const [showLeftBox, setShowLeftBox] = useRecoilState(showLeftBoxState);

  const { left, right } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={classNames(styles.left, !showLeftBox ? styles.isHidden : null)}>
        <div className={styles.leftBox}>{left}</div>
        {!showLeftBox && (
          <div
            className={styles.openBtn}
            onClick={() => {
              setShowLeftBox(true);
            }}
          >
            <Iconfont code="arrow-left" style={{ transform: 'rotate(180deg)' }}></Iconfont>
          </div>
        )}
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className={styles.right}>{right}</div>
      </React.Suspense>
    </div>
  );
};

export default MainContainer;

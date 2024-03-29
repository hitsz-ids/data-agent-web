import React from 'react';

import styles from './index.module.less';
import classNames from 'classnames';

interface ILinearButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'large' | 'default';
}

const LinearButton: React.FC<ILinearButtonProps> = props => {
  const { children, size = 'default', ...other } = props;

  return (
    <button {...other} className={classNames(styles.linearButton, styles[size])}>
      {children}
    </button>
  );
};

export default LinearButton;

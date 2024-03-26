import React from 'react';

import styles from './index.module.less';
import classNames from 'classnames';
import Iconfont from '../iconfont';

interface ICreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CreateButton: React.FC<ICreateButtonProps> = props => {
  const { children, ...other } = props;

  return (
    <button {...other} className={classNames(styles.createButton)}>
      <Iconfont className={styles.addIcon} code="add"></Iconfont>
      {children}
    </button>
  );
};

export default CreateButton;

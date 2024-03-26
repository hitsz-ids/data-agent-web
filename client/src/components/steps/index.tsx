import React from 'react';

import styles from './index.module.less';
import classNames from 'classnames';

export interface IStepItem {
  label: string;
}

interface IStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  curStepNum?: number;
  items: IStepItem[];
  className?: string;
}

const Steps: React.FC<IStepsProps> = props => {
  const { curStepNum = 1, items, className, ...other } = props;

  const renderItem = () => {
    return items.map((item, index) => (
      <div
        key={index}
        className={classNames(styles.stepItem, index < curStepNum ? styles.isDone : null)}
      >
        {index != 0 && <i className={styles.line}></i>}
        <i className={styles.serial}>{index + 1}</i>
        <span>{item.label}</span>
      </div>
    ));
  };

  return (
    <div className={classNames(styles.steps, className)} {...other}>
      {renderItem()}
    </div>
  );
};

export default Steps;

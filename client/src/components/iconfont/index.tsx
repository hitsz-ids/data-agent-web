import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

interface IIconfont extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
  disabled?: boolean;
  pointer?: boolean;
}

const Iconfont = React.memo((props: IIconfont) => {
  const { code, className, disabled, pointer, ...other } = props;
  return (
    <i
      {...other}
      className={classnames(
        styles.iconBox,
        className || null,
        disabled ? styles.isDisabled : null,
        pointer ? styles.cursor : null
      )}
    >
      <svg aria-hidden="true" className={styles.Iconfont}>
        <use xlinkHref={`#icon-${code}`}></use>
      </svg>
    </i>
  );
});

export default Iconfont;

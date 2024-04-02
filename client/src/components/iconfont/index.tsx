import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

interface IIconfontProps extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
  disabled?: boolean;
  pointer?: boolean;
  hover?: boolean;
}

const Iconfont = React.memo((props: IIconfontProps) => {
  const { code, className, disabled, pointer, hover, onClick, children, ...other } = props;
  return (
    <i
      className={classnames(
        styles.iconBox,
        className,

        disabled ? styles.disabled : null,
        !disabled && pointer ? styles.pointer : null,
        !disabled && hover ? styles.hover : null
      )}
      onClick={disabled ? undefined : onClick}
      {...other}
    >
      <svg aria-hidden="true" className={classnames(styles.iconfont)}>
        <use xlinkHref={`#icon-${code}`}></use>
      </svg>
      {children ? <span className={styles.iconText}>{children}</span> : null}
    </i>
  );
});

export default Iconfont;

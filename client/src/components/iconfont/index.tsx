import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

interface IIconfont extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
  disabled?: boolean;
  pointer?: boolean;
  hover?: boolean;
}

const Iconfont = React.memo((props: IIconfont) => {
  const { code, className, disabled, pointer, hover, onClick, ...other } = props;
  return (
    <i
      className={classnames(
        styles.iconBox,
        className,
        disabled ? styles.isDisabled : null,
        !disabled && pointer ? styles.cursor : null,
        !disabled && hover ? styles.hover : null
      )}
      onClick={disabled ? undefined : onClick}
      {...other}
    >
      <svg
        aria-hidden="true"
        className={classnames(styles.iconfont, props.children ? styles.withWord : null)}
      >
        <use xlinkHref={`#icon-${code}`}></use>
      </svg>
      {props.children}
    </i>
  );
});

export default Iconfont;

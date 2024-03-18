import React from 'react';

import styles from './index.less.module.less';
import Iconfont from '../iconfont';
import Input, { SearchProps } from 'antd/es/input';

interface ISearchInputProps extends SearchProps {}

const SearchInput: React.FC<ISearchInputProps> = props => {
  const prefix = <Iconfont className={styles.searchIcon} code="search"></Iconfont>;
  return (
    <span className={styles.searchInput}>
      <Input.Search {...props} prefix={prefix} allowClear></Input.Search>
    </span>
  );
};

export default SearchInput;

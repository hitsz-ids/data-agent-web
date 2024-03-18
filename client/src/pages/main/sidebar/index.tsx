import React, { memo, useState } from 'react';
import styles from './index.module.less';
import { INavItem } from '@/types/common';
import Iconfont from '@/components/iconfont';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface ISidebarProps {
  navConfig: INavItem[];
}

const Sidebar: React.FC<ISidebarProps> = memo(props => {
  const { navConfig } = props;
  const [activeIndex, setActivateIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      {navConfig.map((item, index) => {
        return (
          <div
            key={item.key}
            className={classNames(styles.item, activeIndex === index ? styles.isActive : null)}
            onClick={() => {
              setActivateIndex(index);
              navigate(item.path);
            }}
          >
            <Iconfont className={styles.icon} code={item.icon} />
            <div className={styles.title}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
});

export default Sidebar;

import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';
import { INavItem } from '@/types/common';
import Sidebar from './sidebar';
import RoutePath from '@/routers/path';
import { useLang } from '@/i18n';

interface IMainProps {}

const Main: React.FC<IMainProps> = () => {
  const { t } = useLang();
  const navConfig: INavItem[] = [
    {
      key: '0',
      icon: 'chat',
      title: t('common.nav.chat'),
      path: RoutePath.CHAT
    },
    {
      key: '1',
      icon: 'knowledge',
      title: t('common.nav.knowledge'),
      path: RoutePath.KNOWLEDGE
    },
    {
      key: '2',
      icon: 'connection',
      title: t('common.nav.connections'),
      path: RoutePath.CONNECTION
    }
  ];
  return (
    <div className={styles.mainLayout}>
      <div className={styles.header}>
        <div className={styles.logo}>DGAgent</div>
        <div className={styles.opts}>消息、个人中心</div>
      </div>
      <div className={styles.body}>
        <Sidebar navConfig={navConfig}></Sidebar>
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;

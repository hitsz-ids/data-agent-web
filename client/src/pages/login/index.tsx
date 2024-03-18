import RoutePath from '@/routers/path';
// import loginService from '@/services/login';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useLang } from '@/i18n';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  const toMain = () => {
    navigate(RoutePath.MAIN);
  };
  return (
    <div className={styles.login}>
      <Button onClick={toMain}>{t('login.login')}</Button>
      <div className={styles.test}>{t('login.currentTime', { time: Date() })}</div>
    </div>
  );
};

export default Login;

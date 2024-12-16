import RoutePath from '@/routers/path';
// import loginService from '@/services/login';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useLang } from '@/i18n';
import { useStore } from '@/hooks/test';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const { t } = useLang();
  const [vv, setVV] = useStore(1);
  const [vv1, setVV1] = useStore(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('vv changed');
  }, [vv]);

  const toMain = () => {
    navigate(RoutePath.MAIN);
  };

  return (
    <div className={styles.login}>
      <Button onClick={toMain}>{t('login.login')}</Button>
      <div className={styles.test}>{t('login.currentTime', { time: Date() })}</div>
      <div>
        <Button type="primary" onClick={() => setVV(vv + 1)}>
          +
        </Button>
        test:{vv}
        <Button type="primary" onClick={() => setVV1(vv1 + 1)}>
          ++
        </Button>
        test:{vv1}
      </div>
    </div>
  );
};

export default Login;

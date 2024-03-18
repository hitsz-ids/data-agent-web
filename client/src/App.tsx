import React, { useEffect, useRef, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router';
import styles from './App.module.less';

import '@/assets/iconfont/iconfont.js';
import '@/styles/index.less';
import { initLang, useLang } from '@/i18n';
import { themeManager } from './theme';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import systemApi from './apis/SystemApi';

initLang();
themeManager.init();

enum InitState {
  STARTING,
  DONE
}

const App: React.FC = () => {
  const [initState, setInitState] = useState(InitState.DONE);
  const isLoading = useRef<Boolean>();
  const { t } = useLang();

  useEffect(() => {
    // getSystemInfo();
  }, []);

  function getSystemInfo() {
    if (isLoading.current) {
      return Promise.reject();
    }
    isLoading.current = true;
    return systemApi
      .send()
      .then(() => {
        setInitState(InitState.DONE);
      })
      .finally(() => {
        isLoading.current = false;
      });
  }
  return (
    <ConfigProvider>
      <div className={styles.app}>
        {initState === InitState.STARTING && <div>{t('app.loading')}...</div>}

        {initState === InitState.DONE && (
          <RecoilRoot>
            <RouterProvider router={router}></RouterProvider>
          </RecoilRoot>
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;

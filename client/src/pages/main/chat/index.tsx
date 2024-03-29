import React from 'react';

import styles from './index.module.less';
import LinearButton from '@/components/linear-button';
import Iconfont from '@/components/iconfont';

interface IChatProps {}

const Chat: React.FC<IChatProps> = () => {
  return (
    <div className={styles.chatBox}>
      <LinearButton size="large">
        <Iconfont code="add">新建对话</Iconfont>
      </LinearButton>
    </div>
  );
};

export default Chat;

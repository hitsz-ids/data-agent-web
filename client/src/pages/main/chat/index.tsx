import React from 'react';

import styles from './index.module.less';
import CreateButton from '@/components/create-button';

interface IChatProps {}

const Chat: React.FC<IChatProps> = () => {
  return (
    <div className={styles.chatBox}>
      <CreateButton>新建对话</CreateButton>
    </div>
  );
};

export default Chat;

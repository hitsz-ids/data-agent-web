import React, { useEffect } from 'react';
import ConnectionList from './list';
import ConnectionCreate from './create';
import EmptyComponent from '@/components/empty-component';
import ConnectionDetail from './detail';
import MainContainer from '@/components/main-container';
import { useRecoilState } from 'recoil';
import { connectionsPageState } from '@/states/connection';

interface IConnectionProps {}

const EmptyContent = () => {
  return (
    <EmptyComponent>
      <div>
        数据接入是我的核心功能之一，这意味着我可以连接到多个数据库并根据你的需求生成相应的SQL查询语句。一旦你选择了一个已连接的数据库，我会立即获取该数据库的表和字段信息，在对话中基于这些信息生成与所选数据库相关的SQL查询语句。
      </div>
      <div>
        这个功能的优点是，你不需要记住每个数据库的所有表和字段的详细信息，也不需要处理不同数据库系统之间可能存在的SQL语法差异。我会自动处理这些问题，让你更专注于查询的逻辑本身而不是查询语句的编写。
      </div>
      <div>在未来，我会根据选择连接的数据库展示SQL查询结果。</div>
    </EmptyComponent>
  );
};

const pagesMap = {
  create: ConnectionCreate,
  detail: ConnectionDetail,
  empty: EmptyContent
};

export type ConnectionPages = keyof typeof pagesMap;

const Connection: React.FC<IConnectionProps> = () => {
  const [curPage, setCurPage] = useRecoilState(connectionsPageState);

  let CurPageComponent = pagesMap[curPage];
  useEffect(() => {
    return () => {
      setCurPage('empty');
    };
  }, []);
  return (
    <MainContainer
      left={<ConnectionList></ConnectionList>}
      right={<CurPageComponent></CurPageComponent>}
    ></MainContainer>
  );
};

export default Connection;

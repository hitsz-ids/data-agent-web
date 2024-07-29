import React, { useEffect } from 'react';

import styles from './index.module.less';
import { curKnowledgeIdState, knowledgeInfoQuery } from '@/stores/knowledge';
import { useRecoilValue } from 'recoil';
import { Table, TableProps } from 'antd';
import { IKnowledgeFileItem } from '@/types/knowledge';
import Iconfont from '@/components/iconfont';

interface IKnowledgeDetailProps {}

const KnowledgeDetail: React.FC<IKnowledgeDetailProps> = props => {
  const connectionInfo = useRecoilValue(knowledgeInfoQuery(useRecoilValue(curKnowledgeIdState)));

  useEffect(() => {}, []);

  const columns: TableProps<IKnowledgeFileItem>['columns'] = [
    {
      title: '序号',
      render: (_, __, index) => <span>{(index += 1)}</span>
    },
    {
      title: '名称',
      dataIndex: 'labelName',
      key: 'labelName'
    },
    {
      title: '类型',
      render: () => <span>文件</span>
    },
    {
      title: '最后更新时间',
      dataIndex: 'modifiedTime'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: ' ',
      render: () => (
        <span>
          <Iconfont code="more"></Iconfont>
        </span>
      )
    }
  ];

  const InfoLabel = (props: { label: string; value: string }) => {
    return (
      <div className={styles.infoLabel}>
        <div className={styles.label}>{props.label}：</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    );
  };
  return (
    <div className={styles.knowledgeDetail}>
      <div className={styles.container}>
        <div className={styles.detailInfo}>
          <InfoLabel label="名称" value={connectionInfo.name}></InfoLabel>
          <InfoLabel label="描述" value={connectionInfo.desc}></InfoLabel>
          <InfoLabel label="创建时间" value={connectionInfo.createdTime}></InfoLabel>
        </div>
        <div className={styles.filesInfo}>
          <Table rowKey={'id'} columns={columns} dataSource={connectionInfo.fileList || []} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDetail;

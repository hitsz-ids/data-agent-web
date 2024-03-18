import React, { useEffect } from 'react';

import styles from './index.module.less';
import CreateButton from '@/components/create-button';
import SearchInput from '@/components/search-input';
import { Checkbox } from 'antd';
import { connectionDeleteApi } from '@/apis/connections/ConnectionDeleteApi';
import classNames from 'classnames';
import Iconfont from '@/components/iconfont';
import { useRecoilState } from 'recoil';
import { connectionListState, useConnectionList } from '@/states/connection';
// import { IConnectionListResponse, connectionListApi } from '@/apis/connections/ConnectionListApi';

interface IConnectionListProps {}

const ConnectionList: React.FC<IConnectionListProps> = () => {
  const [curId, setCurId] = React.useState<number>(0);
  const [deleteState, setDeleteState] = React.useState<boolean>(false);
  const [connectionList, setConnectionList] = useRecoilState(connectionListState);

  useEffect(() => {
    getList();
  }, []);

  const getList = (searchVal?: string) => {
    useConnectionList(searchVal);
  };
  // const getList = (searchVal?: string) => {
  //   connectionListApi
  //     .request({ pageNo: 1, pageSize: 20, searchVal })
  //     .then((res: IConnectionListResponse) => {
  //       setConnectionList(res.rows);
  //     });
  // };

  const handleSearch = (value: string) => {
    if (!value) return;
    getList(value);
  };

  const handleAddClick = () => {};

  const handleDeleteClick = (ids: number[]) => {
    if (!ids.length || connectionDeleteApi.loading) return;
    connectionDeleteApi.request({ ids }).then(() => {
      getList();
    });
  };

  const deleteCheckedChange = (values: number[]) => {
    console.log(values);
  };

  const switchCurConnection = (index: number) => {
    setCurId(index);
  };

  return (
    <div className={styles.connectionLeft}>
      <div className={styles.leftTop}>
        <CreateButton onClick={handleAddClick}>新建数据接入</CreateButton>
      </div>
      <div className={styles.leftMiddle}>
        <div className={styles.searchInput}>
          <SearchInput placeholder="搜索连接信息" onSearch={handleSearch}></SearchInput>
        </div>
        <Checkbox.Group
          className={classNames(styles.connectionList, deleteState ? styles.deleteState : null)}
          onChange={deleteCheckedChange}
        >
          {connectionList.map(item => {
            return (
              <div
                key={item.id}
                className={classNames(styles.item, curId === item.id ? styles.isActive : null)}
                onClick={() => {
                  if (deleteState) return;
                  switchCurConnection(item.id);
                }}
              >
                {deleteState && (
                  <div className={styles.checkboxArea}>
                    <Checkbox id={item.id + ''} value={item.id}></Checkbox>
                  </div>
                )}
                <label htmlFor={item.id + ''} className={styles.infoArea}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.time}>{item.createdTime}</div>
                  <Iconfont
                    className={styles.deleteIcon}
                    code={'delete'}
                    onClick={event => {
                      event.stopPropagation();
                      handleDeleteClick([item.id]);
                    }}
                  ></Iconfont>
                </label>
              </div>
            );
          })}
        </Checkbox.Group>
      </div>
      <div className={styles.leftBottom}>
        {!deleteState ? (
          <span
            className={styles.deleteBtn}
            onClick={() => {
              setDeleteState(true);
            }}
          >
            批量删除
          </span>
        ) : (
          <span
            className={styles.deleteBtn}
            onClick={() => {
              setDeleteState(false);
            }}
          >
            取消
          </span>
        )}
      </div>
    </div>
  );
};

export default ConnectionList;

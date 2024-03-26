import React, { useEffect } from 'react';
import { Checkbox, Dropdown, message } from 'antd';

import styles from './index.module.less';
import CreateButton from '@/components/create-button';
import SearchInput from '@/components/search-input';
import { connectionDeleteApi } from '@/apis/connections/ConnectionDeleteApi';
import classNames from 'classnames';
import Iconfont from '@/components/iconfont';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { connectionListState, useConnectionListApi } from '@/states/connection';
import { showLeftBoxState } from '@/states/main';
import ConnectionStatusIcon from '@/components/connection-status';
import ConnectionTypeIcon from '@/components/connection-type';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { connectionSyncApi } from '@/apis/connections/ConnectionSyncApi';

interface IConnectionListProps {
  switchDetail(id: number, callback: (isSuccess: boolean) => void): void;
  switchCreate(): void;
}

const ConnectionList: React.FC<IConnectionListProps> = props => {
  const [curId, setCurId] = React.useState<number>(0);
  const [deleteState, setDeleteState] = React.useState<boolean>(false);
  const [connectionList] = useRecoilState(connectionListState);
  const { switchDetail, switchCreate } = props;
  const listApi = useConnectionListApi();
  const setShowLeftBox = useSetRecoilState(showLeftBoxState);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = (searchVal?: string) => {
    listApi(searchVal);
  };

  const handleSearch = (value: string) => {
    if (!value) return;
    getList(value);
  };

  const handleDeleteClick = (ids: number[]) => {
    if (!ids.length || connectionDeleteApi.loading) return;
    connectionDeleteApi.request({ ids }).then(() => {
      setCheckedIds([]);
      getList();
      setDeleteState(false);
    });
  };

  const deleteCheckedChange = (values: number[]) => {
    setCheckedIds(values);
  };

  const collapseLeftBox = () => {
    setShowLeftBox(false);
  };

  const moreOptions: ItemType[] = [
    {
      key: 'connect',
      label: (
        <Iconfont className={styles.dropdownIcon} code="connect" hover>
          连接
        </Iconfont>
      )
    },
    {
      key: 'sync',
      label: (
        <Iconfont className={styles.dropdownIcon} code="reload" hover>
          同步
        </Iconfont>
      )
    },
    {
      key: 'delete',
      label: (
        <Iconfont className={styles.dropdownIcon} code="delete" hover>
          删除
        </Iconfont>
      )
    }
  ];

  const handleMenuClick = ({ key, id }: { key: string; id: number }) => {
    if (key === 'connect') {
      console.log('connect', id);
    } else if (key === 'sync') {
      connectionSyncApi
        .request({ id })
        .then(() => {
          message.success('同步中');
        })
        .catch(() => {
          message.error('同步失败');
        });
    } else if (key === 'delete') {
      handleDeleteClick([id]);
    }
  };

  return (
    <div className={styles.connectionLeft}>
      <div className={styles.leftTop}>
        <CreateButton
          onClick={() => {
            switchCreate();
          }}
        >
          新建连接
        </CreateButton>
      </div>
      <div className={styles.leftMiddle}>
        <div className={styles.searchInput}>
          <SearchInput placeholder="搜索连接信息" onSearch={handleSearch}></SearchInput>
        </div>
        <Checkbox.Group
          className={classNames(styles.connectionList, deleteState ? styles.deleteState : null)}
          value={checkedIds}
          onChange={deleteCheckedChange}
        >
          {connectionList.map(item => {
            return (
              <div
                key={item.id}
                className={classNames(styles.item, curId === item.id ? styles.isActive : null)}
                onClick={() => {
                  if (deleteState) return;
                  switchDetail(item.id, (isSuccess: boolean) => {
                    if (isSuccess) setCurId(item.id);
                  });
                }}
              >
                {deleteState && (
                  <div className={styles.checkboxArea}>
                    <Checkbox id={item.id + ''} value={item.id}></Checkbox>
                  </div>
                )}
                <label htmlFor={item.id + ''} className={styles.infoArea}>
                  <div className={styles.info}>
                    <ConnectionTypeIcon type={item.type}></ConnectionTypeIcon>
                    <span className={classNames(styles.name, 'text-ellipsis')}>{item.name}</span>
                    <ConnectionStatusIcon status={item.status}></ConnectionStatusIcon>
                  </div>
                </label>
                <Dropdown
                  menu={{
                    items: moreOptions,
                    onClick: ({ key, domEvent }) => {
                      domEvent.stopPropagation();
                      handleMenuClick({ key, id: item.id });
                    }
                  }}
                  trigger={['click']}
                >
                  <Iconfont
                    onClick={event => event.stopPropagation()}
                    className={styles.moreIcon}
                    code={'more'}
                  ></Iconfont>
                </Dropdown>
              </div>
            );
          })}
        </Checkbox.Group>
      </div>
      <div className={styles.leftBottom}>
        {!deleteState ? (
          <>
            <Iconfont
              onClick={() => {
                setDeleteState(true);
              }}
              code={'delete'}
              hover
              pointer
            >
              批量删除
            </Iconfont>
            <Iconfont
              code={'arrow-left'}
              pointer
              onClick={() => {
                collapseLeftBox();
              }}
            ></Iconfont>
          </>
        ) : (
          <>
            <Checkbox
              className={styles.checkAll}
              indeterminate={checkedIds.length > 0 && checkedIds.length < connectionList.length}
              value={checkAll}
              onChange={value => {
                setCheckAll(value.target.checked);
                setCheckedIds(value.target.checked ? connectionList.map(item => item.id) : []);
              }}
            >
              全选
            </Checkbox>
            <Iconfont
              style={{ transform: 'translateX(-10px)' }}
              onClick={() => {
                handleDeleteClick(checkedIds);
              }}
              code="delete"
              hover
              pointer
              disabled={checkedIds.length === 0}
            >
              删除
            </Iconfont>
            <span
              className={styles.cancelDelete}
              onClick={() => {
                setCheckedIds([]);
                setDeleteState(false);
              }}
            >
              取消
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionList;

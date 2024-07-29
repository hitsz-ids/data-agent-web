import React, { useEffect } from 'react';
import { Checkbox, Dropdown, message } from 'antd';

import styles from './index.module.less';
import LinearButton from '@/components/linear-button';
import SearchInput from '@/components/search-input';
import { connectionsDeleteApi } from '@/apis/connections/ConnectionsDeleteApi';
import classNames from 'classnames';
import Iconfont from '@/components/iconfont';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  curConnectionIdState,
  connectionsListState,
  connectionsPageState,
  useRefreshConnectionInfo,
  useConnectionsListApi
} from '@/states/connection';
import { showLeftBoxState } from '@/stores/main';
import ConnectionStatusIcon from '@/components/connection-status';
import ConnectionTypeIcon from '@/components/connection-type';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { connectionSyncApi } from '@/apis/connections/ConnectionsSyncApi';
import { useLang } from '@/i18n';

interface IConnectionListProps {}

const ConnectionList: React.FC<IConnectionListProps> = () => {
  const [deleteState, setDeleteState] = React.useState<boolean>(false);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);

  const [curConnectionId, setConnectionsId] = useRecoilState(curConnectionIdState);
  const connectionList = useRecoilValue(connectionsListState);
  const setShowLeftBox = useSetRecoilState(showLeftBoxState);
  const setConnectionsPageState = useSetRecoilState(connectionsPageState);
  const connectionInfoRefresh = useRefreshConnectionInfo(useRecoilValue(curConnectionIdState));

  const listApi = useConnectionsListApi();
  const { t } = useLang();

  useEffect(() => {
    getList();
  }, []);

  const getList = (searchVal?: string) => {
    listApi(searchVal);
  };

  const handleSearch = (value: string) => {
    getList(value);
  };

  const handleDeleteClick = (ids: number[]) => {
    if (!ids.length || connectionsDeleteApi.loading) return;
    connectionsDeleteApi.request({ ids }).then(() => {
      setCheckedIds([]);
      getList();
      setDeleteState(false);
      setCheckAll(false);
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
          {t('connection.connect')}
        </Iconfont>
      )
    },
    {
      key: 'sync',
      label: (
        <Iconfont className={styles.dropdownIcon} code="reload" hover>
          {t('common.sync')}
        </Iconfont>
      )
    },
    {
      key: 'delete',
      label: (
        <Iconfont className={styles.dropdownIcon} code="delete" hover>
          {t('common.delete')}
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
          message.success(t('common.sync.processing'));
          getList();
        })
        .catch(() => {
          message.error(t('common.sync.fail'));
        });
    } else if (key === 'delete') {
      handleDeleteClick([id]);
    }
  };

  return (
    <div className={styles.connectionLeft}>
      <div className={styles.leftTop}>
        <LinearButton
          size="large"
          onClick={() => {
            setConnectionsPageState('create');
            setConnectionsId(0);
          }}
        >
          <Iconfont code="add">
            {t('common.create')}
            {t('connection.connect')}
          </Iconfont>
        </LinearButton>
      </div>
      <div className={styles.leftMiddle}>
        <div className={styles.searchInput}>
          <SearchInput
            placeholder={t('connection.list.search')}
            onSearch={handleSearch}
          ></SearchInput>
        </div>
        <React.Suspense>
          <Checkbox.Group
            className={classNames(styles.connectionList, deleteState ? styles.deleteState : null)}
            value={checkedIds}
            onChange={deleteCheckedChange}
          >
            {connectionList.map(item => {
              return (
                <div
                  key={item.id}
                  className={classNames(
                    styles.item,
                    curConnectionId === item.id ? styles.isActive : null
                  )}
                  onClick={() => {
                    if (deleteState) return;
                    connectionInfoRefresh();
                    setConnectionsId(item.id);
                    setConnectionsPageState('detail');
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
                      <ConnectionStatusIcon
                        message={item.errorMessage}
                        status={item.status}
                      ></ConnectionStatusIcon>
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
                    <span onClick={event => event.stopPropagation()}>
                      <Iconfont className={styles.moreIcon} code={'more'}></Iconfont>
                    </span>
                  </Dropdown>
                </div>
              );
            })}
          </Checkbox.Group>
        </React.Suspense>
      </div>
      <div className={styles.leftBottom}>
        {!deleteState ? (
          <React.Fragment>
            <Iconfont
              onClick={() => {
                setDeleteState(true);
              }}
              code={'delete'}
              hover
              pointer
            >
              {t('common.delete.batch')}
            </Iconfont>
            <Iconfont
              code={'arrow-left'}
              pointer
              onClick={() => {
                collapseLeftBox();
              }}
            ></Iconfont>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Checkbox
              className={styles.checkAll}
              indeterminate={checkedIds.length > 0 && checkedIds.length < connectionList.length}
              checked={checkAll}
              onChange={value => {
                setCheckAll(value.target.checked);
                setCheckedIds(value.target.checked ? connectionList.map(item => item.id) : []);
              }}
            >
              {t('common.checkAll')}
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
              {t('common.delete')}
            </Iconfont>
            <span
              className={styles.cancelDelete}
              onClick={() => {
                setCheckedIds([]);
                setDeleteState(false);
              }}
            >
              {t('common.cancel')}
            </span>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ConnectionList;

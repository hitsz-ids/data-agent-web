import React, { useEffect } from 'react';
import { Checkbox, Dropdown } from 'antd';

import styles from './index.module.less';
import LinearButton from '@/components/linear-button';
import SearchInput from '@/components/search-input';
// import { knowledgeDeleteApi } from '@/apis/knowledge/KnowledgeDeleteApi';
import classNames from 'classnames';
import Iconfont from '@/components/iconfont';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  knowledgeIdState,
  knowledgeListState,
  knowledgePageState,
  useKnowledgeListApi
} from '@/states/knowledge';
import { showLeftBoxState } from '@/states/main';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useLang } from '@/i18n';

interface IKnowledgeListProps {}

const KnowledgeList: React.FC<IKnowledgeListProps> = () => {
  const [curId, setCurId] = React.useState<number>(0);
  const knowledgeList = useRecoilValue(knowledgeListState);
  const [deleteState, setDeleteState] = React.useState<boolean>(false);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);
  const setKnowledgePageState = useSetRecoilState(knowledgePageState);
  const setKnowledgeIdState = useSetRecoilState(knowledgeIdState);
  const setShowLeftBox = useSetRecoilState(showLeftBoxState);

  const listApi = useKnowledgeListApi();
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
    // if (!ids.length || knowledgeDeleteApi.loading) return;
    // knowledgeDeleteApi.request({ ids }).then(() => {
    //   setCheckedIds([]);
    //   getList();
    //   setDeleteState(false);
    //   setCheckAll(false);
    // });
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
          {t('knowledge.connect')}
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
      // knowledgeSyncApi
      //   .request({ id })
      //   .then(() => {
      //     message.success(t('common.sync.success'));
      //   })
      //   .catch(() => {
      //     message.error(t('common.sync.fail'));
      //   });
    } else if (key === 'delete') {
      handleDeleteClick([id]);
    }
  };

  return (
    <div className={styles.knowledgeLeft}>
      <div className={styles.leftTop}>
        <LinearButton
          size="large"
          onClick={() => {
            setKnowledgePageState('create');
            setKnowledgeIdState(0);
          }}
        >
          <Iconfont code="add">
            {t('common.create')}
            {t('knowledge.connect')}
          </Iconfont>
        </LinearButton>
      </div>
      <div className={styles.leftMiddle}>
        <div className={styles.searchInput}>
          <SearchInput
            placeholder={t('knowledge.list.search')}
            onSearch={handleSearch}
          ></SearchInput>
        </div>
        <Checkbox.Group
          className={classNames(styles.knowledgeList, deleteState ? styles.deleteState : null)}
          value={checkedIds}
          onChange={deleteCheckedChange}
        >
          {knowledgeList.map(item => {
            return (
              <div
                key={item.id}
                className={classNames(styles.item, curId === item.id ? styles.isActive : null)}
                onClick={() => {
                  if (deleteState) return;
                  setCurId(item.id);
                  setKnowledgeIdState(item.id);
                  setKnowledgePageState('detail');
                }}
              >
                {deleteState && (
                  <div className={styles.checkboxArea}>
                    <Checkbox id={item.id + ''} value={item.id}></Checkbox>
                  </div>
                )}
                <label htmlFor={item.id + ''} className={styles.infoArea}>
                  <div className={styles.info}>
                    <span className={classNames(styles.name, 'text-ellipsis')}>{item.name}</span>
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
              indeterminate={checkedIds.length > 0 && checkedIds.length < knowledgeList.length}
              checked={checkAll}
              onChange={value => {
                setCheckAll(value.target.checked);
                setCheckedIds(value.target.checked ? knowledgeList.map(item => item.id) : []);
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

export default KnowledgeList;

import React, { useEffect } from 'react';
import { Checkbox } from 'antd';

import styles from './index.module.less';
import LinearButton from '@/components/linear-button';
import SearchInput from '@/components/search-input';
import classNames from 'classnames';
import Iconfont from '@/components/iconfont';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  curKnowledgeIdState,
  knowledgeListState,
  knowledgePageState,
  useKnowledgeListApi,
  useRefreshKnowledgeInfo
} from '@/stores/knowledge';
import { showLeftBoxState } from '@/stores/main';
import { useLang } from '@/i18n';
import { knowledgeDeleteApi } from '@/apis/knowledge/KnowledgeDeleteApi';

interface IKnowledgeListProps {}

const KnowledgeList: React.FC<IKnowledgeListProps> = () => {
  const [deleteState, setDeleteState] = React.useState<boolean>(false);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);

  const [curId, setCurId] = useRecoilState(curKnowledgeIdState);
  const knowledgeList = useRecoilValue(knowledgeListState);
  const setKnowledgePageState = useSetRecoilState(knowledgePageState);
  const setShowLeftBox = useSetRecoilState(showLeftBoxState);
  const refreshKnowledgeInfo = useRefreshKnowledgeInfo(useRecoilValue(curKnowledgeIdState));

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
    if (!ids.length || knowledgeDeleteApi.loading) return;
    knowledgeDeleteApi.request({ ids }).then(() => {
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

  return (
    <div className={styles.knowledgeLeft}>
      <div className={styles.leftTop}>
        <LinearButton size="large" onClick={() => {}}>
          <Iconfont code="add">
            {t('common.create')}
            {t('knowledge.knowledge')}
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
                  refreshKnowledgeInfo();
                  setCurId(item.id);
                  setKnowledgePageState('detail');
                }}
              >
                {deleteState && (
                  <div className={styles.checkboxArea}>
                    <Checkbox id={item.id + ''} value={item.id}></Checkbox>
                  </div>
                )}
                <label htmlFor={item.id + ''} className={styles.infoArea}>
                  <div className={classNames(styles.name, 'text-ellipsis')}>{item.name}</div>
                  <div className={styles.time}>{item.createdTime}</div>
                </label>
                <Iconfont
                  className={styles.deleteBtn}
                  code="delete"
                  onClick={() => {
                    handleDeleteClick([item.id]);
                  }}
                  hover
                ></Iconfont>
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

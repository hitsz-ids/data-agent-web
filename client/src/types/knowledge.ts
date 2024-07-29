import { KnowledgeFileTrainStatus } from '@/constants/knowledge';

export interface IKnowledgeItem {
  id: number;
  name: string;
  desc?: string;
  createdTime: string;
}

export interface IKnowledgeFileItem {
  id: number; //知识库文件id
  originName: string; // 原始文件名
  labelName: string; // 展示文件名，默认跟originName一致
  modifiedTime: string; //最后更新时间
  status: KnowledgeFileTrainStatus;
  errorMessage?: string; // 训练失败错误信息
}

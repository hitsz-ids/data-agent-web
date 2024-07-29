//训练状态：
export enum KnowledgeFileTrainStatus {
  CREATED = 0, // 已创建
  TRAINING = 1, // 训练中
  TRAINED = 2, // 训练完成
  TRAIN_FAILED = 3, // 训练失败
  INTERRUPTED = 4 // 被强行停止
}

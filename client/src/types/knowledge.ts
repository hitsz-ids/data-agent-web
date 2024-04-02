export interface IKnowledgeItem {
  id: number;
  name: string;
  errorMessage?: string;
  createdTime: string;
  modifiedTime: string;
}

export interface IKnowledgeDriverItem {
  id: number;
  name: string;
  classpath: string;
}

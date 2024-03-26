import { ConnectionSyncStatus, ConnectionType } from '@/constants/connection';

export interface IConnectionItem {
  id: number;
  name: string;
  type: ConnectionType;
  status: ConnectionSyncStatus;
  errorMessage?: string;
  createdTime: string;
  modifiedTime: string;
}

export interface IConnectionDriverItem {
  id: number;
  name: string;
  classpath: string;
}

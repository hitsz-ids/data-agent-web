export enum ConnectionType {
  MYSQL = 1,
  ORACLE = 2,
  POSTGRESQL = 3,
  SQLSERVER = 4
}

export enum ConnectionSyncStatus {
  CREATED = 0,
  SYNCHRONIZING = 1,
  SUCCESS = 2,
  FAILED = 3,
  INTERRUPTED = 4
}

export enum DatabaseConfigurationStep {
  TYPE_SELECTION = 1,
  DETAIL_COMPLETION = 2
}

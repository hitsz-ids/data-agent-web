class ServiceMap {
  static login = '/api/login';
  static system = '/api/system';

  // 数据接入
  static connectionCreate = '/api/connections/create';
  static connectionList = '/api/connections/list';
  static connectionDetail = '/api/connections/detail';
  static connectionUpdate = '/api/connections/update';
  static connectionDelete = '/api/connections/delete';

  static connectionSync = '/api/connections/sync';
  static connectionSyncStatus = '/api/connections/sync/status';
  static connectionSyncInterrupt = '/api/connections/sync/interrupt';
  static connectionDriverList = '/api/connections/driver/list';

  static connectionTest = '/api/connections/test';
}

export { ServiceMap };

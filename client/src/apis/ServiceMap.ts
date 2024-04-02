class ServiceMap {
  static login = '/api/login';
  static system = '/api/system';

  // 数据接入
  static connectionsCreate = '/api/connections/create';
  static connectionsList = '/api/connections/list';
  static connectionsDetail = '/api/connections/detail';
  static connectionsUpdate = '/api/connections/update';
  static connectionsDelete = '/api/connections/delete';

  static connectionsSync = '/api/connections/sync';
  static connectionsSyncStatus = '/api/connections/sync/status';
  static connectionsSyncInterrupt = '/api/connections/sync/interrupt';
  static connectionsDriverList = '/api/connections/driver/list';

  static connectionsTest = '/api/connections/test';

  // 知识库

  static knowledgeList = '/api/knowledges/list';
  static knowledgeDetail = '/api/knowledges/detail';
}

export { ServiceMap };

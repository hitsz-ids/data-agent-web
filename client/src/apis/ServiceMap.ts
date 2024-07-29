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
  static knowledgeCreate = '/api/knowledge/create';
  static knowledgeList = '/api/knowledge/list';
  static knowledgeDetail = '/api/knowledge/detail';
  static knowledgeUpdate = '/api/knowledge/update';
  static knowledgeDelete = '/api/knowledge/delete';

  static knowledgeFileAdd = '/api/knowledge/file/add';
  static knowledgeFileUpdate = '/api/knowledge/file/update';
  static knowledgeFileTrain = '/api/knowledge/file/train';
  static knowledgeFileInterrupt = '/api/knowledge/file/interrupt';
  static knowledgeFileStatus = '/api/knowledge/file/status';
  static knowledgeFileDelete = '/api/knowledge/file/delete';

  static knowledgeTemplateDownload = '/api/knowledge/template/download';
}

export { ServiceMap };

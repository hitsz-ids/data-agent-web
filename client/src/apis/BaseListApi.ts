import BaseApi from './BaseApi';
import { CreateAxiosDefaults } from 'axios';

export interface IListRequest {
  pageNo: number;
  pageSize: number;
  searchVal?: string;
}

export interface IListResponse<T> {
  total: number;
  rows: T[];
}

class BaseListApi<
  Request extends IListRequest,
  Response extends IListResponse<T>,
  T
> extends BaseApi<Request, Response> {
  constructor(opts: CreateAxiosDefaults<Request>) {
    super(opts);
  }
}

export { BaseListApi };

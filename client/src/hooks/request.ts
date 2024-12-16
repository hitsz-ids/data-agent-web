import { BaseResponse } from '@/apis/BaseApi';
import axios, { InternalAxiosRequestConfig, Method } from 'axios';
import { useState } from 'react';

interface IProps {
  url: string;
  method: Method;
}

function requestSuccessInterceptor(requestObj: InternalAxiosRequestConfig) {
  return requestObj;
}

function requestFailInterceptor(error: any) {
  return error;
}

axios.interceptors.request.use(requestSuccessInterceptor, requestFailInterceptor);

function useBaseRequest<REQ, RES = BaseResponse<{}>>(options: IProps) {
  const { url, method } = options;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // request 方法通过 fetch API 发出 http 请求
  function request(param: REQ): Promise<RES> {
    setLoading(true);
    return axios
      .create({ url, method })
      .request({ data: param })
      .then(res => {
        setData(res.data);
        return res.data;
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // 将 request， error， loading 作为自定义 hook 的返回值
  return [request, loading, data, error];
}

interface IGetOptions {
  url: string;
}

export function useGet<REQ, RES>(options: IGetOptions) {
  return useBaseRequest<REQ, RES>({
    method: 'GET',
    url: options.url
  });
}

export function usePost<REQ, RES>(options: IGetOptions) {
  return useBaseRequest<REQ, RES>({
    method: 'POST',
    url: options.url
  });
}

interface IUserListRequest {
  name: string;
}
interface IUserListResponse {}

export const useUserListApi = () => {
  return useGet<IUserListRequest, IUserListResponse>({ url: '/user/list' });
};

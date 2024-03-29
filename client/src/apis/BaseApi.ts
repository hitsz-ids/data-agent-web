import { notification } from 'antd';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  Method
} from 'axios';

export interface BaseResponse<T> {
  data: T;
  code: number; // 返回0是成功，其他均为异常
  errorMsg: string;
  traceId: string;
}

abstract class BaseApi<REQ, RES> {
  private axiosInstance: AxiosInstance;
  private url: string;
  private method: Method | string;
  public loading: boolean = false;
  private canceler: Canceler | undefined;

  constructor(opts: CreateAxiosDefaults<REQ>) {
    const { url, method } = opts;
    this.url = url || '';
    this.method = method || 'POST';
    this.axiosInstance = axios.create(opts);

    this.axiosInstance.interceptors.request.use(this.requestInterceptor.bind(this));
    this.axiosInstance.interceptors.response.use(
      this.responseSuccessInterceptor.bind(this),
      this.responseErrorInterceptor.bind(this)
    );
  }

  private requestInterceptor(axiosConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const source = axios.CancelToken.source();
    this.canceler = source.cancel;
    axiosConfig.cancelToken = source.token;
    return axiosConfig;
  }

  private responseSuccessInterceptor(response: AxiosResponse<BaseResponse<RES>, REQ>) {
    return response;
  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    const { code } = error;
    if (code === 'ERR_CANCELED') {
      return 'ERR_CANCELED';
    }
    const { status } = error?.response || {};
    if (status === 404) {
      //
    } else {
      notification?.error({
        message: '出错了',
        description: error?.response?.data?.message
      });
    }
    return error?.response.statusText;
  }

  request(data?: REQ): Promise<RES> {
    this.loading = true;
    const config: AxiosRequestConfig = {
      url: this.url,
      method: this.method,
      ...(this.method.toUpperCase() === 'GET' ? { params: data } : { data })
    };
    let cacheResolve: (data: RES) => void, cacheReject: (response: BaseResponse<RES>) => void;
    const promise = new Promise<RES>((resolve, reject) => {
      cacheResolve = resolve;
      cacheReject = reject;
    });
    this.axiosInstance
      .request<BaseResponse<RES>>(config)
      .then(res => {
        if (res.data.code == 0) {
          cacheResolve(res.data.data);
        } else {
          cacheReject(res.data);
        }
      })
      .finally(() => {
        this.loading = false;
      });
    return promise;
  }

  cancel() {
    if (this.canceler) {
      this.canceler('cancel');
      this.canceler = undefined;
    }
  }
}

export default BaseApi;

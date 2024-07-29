import { message, notification } from 'antd';
import axios, {
  AxiosError,
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

abstract class BaseApi<REQ = {}, RES = BaseResponse<{}>> {
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
    this.registerInterceptors();
  }

  // 注册拦截器
  private registerInterceptors() {
    this.axiosInstance.interceptors.request.use(this.requestInterceptor.bind(this));
    this.axiosInstance.interceptors.response.use(
      this.responseSuccessInterceptor.bind(this),
      this.responseErrorInterceptor.bind(this)
    );
  }

  // 请求拦截器
  private requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const cancelSource = axios.CancelToken.source();
    this.canceler = cancelSource.cancel;
    config.cancelToken = cancelSource.token;
    return config;
  }

  // 响应成功拦截器
  private responseSuccessInterceptor(response: AxiosResponse<BaseResponse<RES>, REQ>) {
    return response;
  }

  // 响应错误拦截器
  private async responseErrorInterceptor(
    error: AxiosError<AxiosResponse<BaseResponse<RES>>>
  ): Promise<any> {
    if (axios.isCancel(error)) {
      return '请求已取消';
    }
    const { response } = error;
    if (response) {
      const { status } = response;
      if (status === 404) {
        notification?.error({
          message: '页面不存在',
          description: '请求的页面不存在'
        });
      } else {
        notification?.error({
          message: '出错了',
          description: '请求出错，请稍后再试'
        });
      }
      return Promise.reject(error);
    }
  }

  // 请求通用方法
  async request(data?: REQ): Promise<RES> {
    try {
      this.loading = true;
      const config: AxiosRequestConfig = {
        url: this.url,
        method: this.method,
        ...(this.method.toUpperCase() === 'GET' ? { params: data } : { data })
      };
      const response = await this.axiosInstance.request<BaseResponse<RES>>(config);
      const axiosData = response.data;
      if (axiosData.code === 0) {
        return axiosData.data;
      } else {
        message.warning(axiosData.errorMsg);
        return axiosData.data;
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.loading = false;
    }
  }

  cancel() {
    if (this.canceler) {
      this.canceler('请求已取消');
      this.canceler = undefined;
    }
  }
}

export default BaseApi;

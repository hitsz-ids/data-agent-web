/**
 * 数据存储工具类 支持localStorage/sessionStorage
 * DataType: 数据类型
 * StorageType： 存储类型
 */

export enum StorageType {
  LOCAL = 1,
  SESSION
}

export interface IStorageOpts {
  type?: StorageType;
  defaultValue?: string;
}

class WebStorageTool {
  /**
   * 保存数据
   * @param key
   * @param value
   * @param type
   * @returns boolean
   */
  public static set(key: string, value: string | number | boolean, type?: StorageType): boolean {
    if (!key || value === null) {
      return false;
    }
    value = String(value);
    switch (type) {
      case StorageType.SESSION:
        sessionStorage.setItem(key, value);
        break;
      default:
        localStorage.setItem(key, value);
        break;
    }
    return true;
  }

  /**
   * 获取字符串
   * @param key
   * @param opts
   * @returns string
   */
  public static get(key: string, opts?: IStorageOpts): string {
    let result: string | null = '';
    const { type, defaultValue } = opts || {};
    switch (type) {
      case StorageType.SESSION:
        result = sessionStorage.getItem(key);
        break;
      default:
        result = localStorage.getItem(key);
        break;
    }
    if (result === undefined || result === null) {
      result = defaultValue || '';
    }
    return result;
  }

  /**
   * 获取数字
   * @param key
   * @param opts 配置
   * @returns number
   */
  public static getNumber(key: string, opts?: IStorageOpts): number {
    let result: string | null = '';
    const { type, defaultValue } = opts || {};

    switch (type) {
      case StorageType.SESSION:
        result = sessionStorage.getItem(key);
        break;
      default:
        result = localStorage.getItem(key);
        break;
    }
    if (result === null) {
      return Number(defaultValue || 0);
    }
    return Number(result);
  }

  /**
   * 获取boolean
   * @param key
   * @param opts 配置项
   * @returns boolean
   */
  public static getBoolean(key: string, opts?: IStorageOpts): boolean {
    let result: string | null | boolean = '';
    const { type, defaultValue } = opts || {};

    switch (type) {
      case StorageType.SESSION:
        result = sessionStorage.getItem(key);
        break;
      default:
        result = localStorage.getItem(key);
        break;
    }
    if (result === 'true') {
      return true;
    }
    if (defaultValue !== undefined) {
      return !!defaultValue;
    }
    return false;
  }

  /**
   * 删除存储
   * @param key
   * @param type
   * @returns boolean
   */
  public static remove(key: string, type?: StorageType): boolean {
    if (!key) {
      return false;
    }
    switch (type) {
      case StorageType.SESSION:
        sessionStorage.removeItem(key);
        break;
      default:
        localStorage.removeItem(key);
        break;
    }
    return true;
  }
}
export { WebStorageTool };

export class Utils {
  /*
   * 深拷贝
   * */
  public static deepClone(obj: any) {
    if (obj === null || obj === undefined) {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj);
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    if (typeof obj !== 'object') {
      return obj;
    }
    let cloneObj = new obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = this.deepClone(obj[key]);
      }
    }
    return cloneObj;
  }

  public static isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]' && obj !== null;
  }

  /*
   * 个位数前补零
   * */
  public static prefixZero(value: number) {
    return value < 10 ? '0' + value : value;
  }

  // diffStyle:当天的时间样式是否需要区分
  public static dateToString(timestamp: number, diffStyle?: boolean): string {
    let modifiedTime = new Date(timestamp);
    let today = new Date();
    let hours = Utils.prefixZero(modifiedTime.getHours());
    let minutes = Utils.prefixZero(modifiedTime.getMinutes());
    let seconds = Utils.prefixZero(modifiedTime.getSeconds());
    if (diffStyle && today.toDateString() === modifiedTime.toDateString()) {
      // 当天
      return `${hours}:${minutes}:${seconds}`;
    } else {
      let year = modifiedTime.getFullYear();
      let month = Utils.prefixZero(modifiedTime.getMonth() + 1);
      let day = Utils.prefixZero(modifiedTime.getDate());
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
  }

  // 节流
  public static throttle(func: (...args: any) => void, delay: number, immediate?: boolean) {
    let timer = 0;
    let prevTime = 0;
    return (...args: any) => {
      const now = Date.now();
      const remaining = delay - (now - prevTime);
      if (immediate && remaining < 0) {
        func.apply(this, args);
        prevTime = Date.now();
        window.clearTimeout(timer);
        timer = 0;
        return;
      }
      if (!timer) {
        timer = window.setTimeout(() => {
          func.apply(this, args);
          timer = 0;
          prevTime = Date.now();
        }, delay);
      }
    };
  }

  // 防抖
  public static debounce(func: (...args: any) => void, wait = 0) {
    if (typeof func !== 'function') {
      throw new TypeError('need a function arguments');
    }
    let timer = 0;
    let result: any;

    return (...args: any) => {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function () {
        result = func(args);
      }, wait);
      return result;
    };
  }
}

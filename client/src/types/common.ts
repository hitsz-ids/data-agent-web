import RoutePath from '@/routers/path';

export interface ConstItem {
  checked?: boolean; // 是否选中
  name?: string; // 名称
  value?: any; // 值
  type?: any; // 类型
  key?: string | number; // key
}

export interface INavItem {
  key: string;
  icon: string;
  title: string;
  path: RoutePath;
}

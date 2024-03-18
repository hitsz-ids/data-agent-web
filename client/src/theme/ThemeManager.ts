import { ThemeEnum, ThemeType } from '.';
import { WebStorageTool } from '@/tools/WebStorageTool';
import { LocalStorageKeys } from '@/constants/storage';
import styles from '@/theme/styles/index.module.less';

export class ThemeManager {
  private _currentTheme: ThemeType = ThemeEnum.LIGHT;

  get currentTheme() {
    return this._currentTheme;
  }

  public init = () => {
    const storageTheme = WebStorageTool.get(LocalStorageKeys.THEME_KEY) as ThemeType;
    this.setTheme(storageTheme || ThemeEnum.LIGHT);
  };

  public setTheme = (theme: ThemeType) => {
    this._currentTheme = theme;
    this._setCSSVariables(theme);
    WebStorageTool.set(LocalStorageKeys.THEME_KEY, theme);
  };

  private _setCSSVariables(theme: ThemeType) {
    document.documentElement.className = styles['common'] + ' ' + styles[theme];
    document.documentElement.setAttribute('theme', theme);
  }
}

import { ThemeManager } from './ThemeManager';

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export type ThemeType = (typeof ThemeEnum)[keyof typeof ThemeEnum];

export const themeManager = new ThemeManager();

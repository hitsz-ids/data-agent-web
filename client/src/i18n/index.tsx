import i18n, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EN from './en-us';
import ZH from './zh-cn';
import dayjs from 'dayjs';

export enum LangEnum {
  EN = 'en',
  ZH = 'zh'
}

export type LangType = (typeof LangEnum)[keyof typeof LangEnum];

const resources = {
  [LangEnum.EN]: {
    translation: EN
  },
  [LangEnum.ZH]: {
    translation: ZH
  }
};

const initLang = () => {
  i18n
    // 检测用户当前使用的语言
    // 文档: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      resources: resources
    });

  if (i18n.services.formatter) {
    i18n.services.formatter.add('DD/MM/YY', value => {
      return dayjs(value).format('DD/MM/YY');
    });

    i18n.services.formatter.add('YYYY-MM-DD', value => {
      return dayjs(value).format('YYYY-MM-DD');
    });
  }
};

const useLang = () => {
  const setLang = (lang: LangType) => {
    i18n.changeLanguage(lang);
  };
  return { t, lang: i18n.language, setLang };
};

export default i18n;
export { initLang, useLang };

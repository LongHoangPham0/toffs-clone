import i18n from 'i18next';
import {
  initReactI18next,
} from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// load file language
import lang_en from './locales/en/index';
import lang_cn from './locales/cn/index';
import lang_vi from './locales/vn/index';
import lang_ms from './locales/ms/index';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "id",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    nsSeparator: false,
    resources: {
      en: {
        translation: lang_en
      },
      zh: {
        translation: lang_cn
      },
      vi: {
        translation: lang_vi
      },
      ms: {
        translation: lang_ms
      }
    }
  });


export default i18n;

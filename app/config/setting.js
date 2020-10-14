/**
 * Basic Setting Variables Define
 */
const production = false;
export const BaseSetting = {
  name: 'Battle Time',
  displayName: 'Battle Time',
  appVersion: '1.0.0',
  defaultLanguage: 'es',
  languageSupport: ['en', 'es'],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    es: {
      translation: require('../lang/es.json'),
    },
  },
  serverUrl: production ? 'http://3.18.93.168:8000' : 'http://3.128.39.215:8000',
  apiUrl: production ? 'http://3.18.93.168:8000/api' : 'http://3.128.39.215:8000/api',
  agoraAppId: '60b17d9654e14c8f8b95930a82ce99bd',
};

import { createI18n } from 'vue-i18n';

const loadMessages = () => {
  const locales = require.context('@/i18n/locales', true, /[\w-]+\.json$/i)
  return locales.keys().reduce((locs, loc) => ({ ...locs, [loc.replace(/\.|\/|json/g, '')]: locales(loc) }), {})
};

const i18n = createI18n({
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: loadMessages()
});

export default i18n;
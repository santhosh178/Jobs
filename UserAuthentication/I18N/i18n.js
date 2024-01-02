import I18n from 'react-native-i18n';
import translations from './translations';
 
I18n.fallbacks = true;

I18n.translations = translations;
const defaultLocale = 'en-US';
const deviceLocale = Platform.OS === 'ios' ? I18n.locale.replace(/[-_](.*)/, '') : I18n.locale;
I18n.locale = deviceLocale || defaultLocale;
 
export default I18n;
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import AppConstants from '../utils/AppConstants'

export const getCurrentLocale = () => {
  const fallback = { languageTag: AppConstants.FALLBACK_LOCALE }
  const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback
  return languageTag
}

export const setI18nConfig = () => {
  const languageTag = getCurrentLocale()
  translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

const translationGetters = {
  en: () => require('./en.json')
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

export default translate

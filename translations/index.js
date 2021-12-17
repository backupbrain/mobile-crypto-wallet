import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
// import memoize from 'lodash.memoize'
import AppConstants from '../utils/AppConstants'

export const getCurrentLocale = () => {
  const fallback = { languageTag: AppConstants.FALLBACK_LOCALE }
  const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback
  return languageTag
}

export const setI18nConfig = () => {
  const languageTag = getCurrentLocale()
  /* translate.cache.clear() */
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

const translationGetters = {
  en: () => require('./en.json')
}

const translate = (key, vars) => {
  let response = null
  if (!vars || vars === undefined) {
    // response = i18n.t(key)
    response = translationGetters.en()[key]
  } else {
    // response = replaceVariables(i18n.t(key), vars)
    response = replaceVariables(translationGetters.en()[key], vars)
  }
  return response
}

const replaceVariables = (string, variables) => {
  Object.keys(variables).forEach((toReplace) => {
    string = string.replace(new RegExp(`{\\s*${toReplace}\\s*}`, 'g'), variables[toReplace])
  })

  return string
}

/* const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
) */

export const significantDigitsFormat = (num, significantFiguresOpt) => {
  // Set default sigfigs to 3
  const isNegative = (num < 0)
  num = Math.abs(num)
  significantFiguresOpt = (typeof significantFiguresOpt === 'undefined') ? 3 : significantFiguresOpt
  // Only assigns sig figs and suffixes for numbers > 1
  if (num <= 1) return (isNegative ? '-' : '') + num.toPrecision(significantFiguresOpt)
  // Calculate for numbers > 1
  var power10 = log10(num)
  // var power10ceiling = Math.floor(power10) + 1
  // 0 = '', 1 = 'K', 2 = 'M', 3 = 'B', 4 = 'T'
  var SUFFIXES = ['', 'K', 'M', 'B', 'T']
  // 100: power10 = 2, suffixNum = 0, suffix = ''
  // 1000: power10 = 3, suffixNum = 1, suffix = 'K'
  var suffixNum = Math.floor(power10 / 3)
  var suffix = SUFFIXES[suffixNum]
  // Would be 1 for '', 1000 for 'K', 1000000 for 'M', etc.
  var suffixPower10 = Math.pow(10, suffixNum * 3)
  var base = num / suffixPower10
  var baseRound = base.toPrecision(significantFiguresOpt)
  return (isNegative ? '-' : '') + baseRound + suffix
}

const log10 = (num) => {
  // Per http://stackoverflow.com/questions/3019278/how-can-i-specify-the-base-for-math-log-in-javascript#comment29970629_16868744
  // Handles floating-point errors log10(1000) otherwise fails at (2.99999996)
  return (Math.round(Math.log(num) / Math.LN10 * 1e6) / 1e6)
}

export default translate

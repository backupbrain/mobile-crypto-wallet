/**
 * Get the PKT price from a PKT price ticker
 */
// import 'dotenv/config'
import { getCurrentLocale } from '../translations'
import AppConstants from '../utils/AppConstants'
import AdaptiveStorage from '../utils/AdaptiveStorage'

const apiKey = AppConstants.PKT_TICKER_API_KEY

export default class PktPriceTicker {
  static get DEBUG () { return true }

  // update frequency is 4 times per day
  static get UPDATE_FREQUENCY_S () {
    return (6 * 60 * 60)
  }

  // don't let someone retrieve a new price more than once per hour
  static get MAX_UPDATE_TIMEOUT_S () {
    return (1 * 60 * 60)
  }

  static get url () {
    return 'https://pktticker.tonygaitatzis.com'
  }

  constructor () {
    this.apiKey = apiKey
    this.priceHistory = {}
    this.spotPrice = {}
    this.lastSpotPriceFetchTime = {}
    const supportedCurrencies = AppConstants.SUPPORTED_CURRENCIES
    for (const row in supportedCurrencies) {
      const currency = supportedCurrencies[row]
      this.spotPrice[currency] = AppConstants.DEFAULT_PKT_FIAT_VALUE
      const spotPriceStorageKey = `pkt${currency}${AppConstants.PKT_SPOT_PRICE_KEY_SUFFIX}`
      // const priceHistoryStorageKey = `pkt${currency}${AppConstants.PKT_PRICE_HISTORY_KEY_SUFFIX}`
      const spotPriceTimesmatpStorageKey = `pkt${currency}${AppConstants.PKT_SPOT_PRICE_TIMESTAMP_KEY_SUFFIX}`

      this.getDataFromStorage(spotPriceStorageKey, `${AppConstants.DEFAULT_PKT_FIAT_VALUE}`)
        .then(response => {
          this.spotPrice[currency] = response
        })

      // set the last retrieved time
      this.getDataFromStorage(spotPriceTimesmatpStorageKey, 0)
        .then(response => {
          this.lastSpotPriceFetchTime[currency] = response
        })
      /*
      this.spotPrice[currency] = this.getDataFromStorage(spotPriceStorageKey, `${AppConstants.DEFAULT_PKT_FIAT_VALUE}`)
      this.priceHistory[currency] = this.getDataFromStorage(priceHistoryStorageKey, '[]')
      /* */
    }
  }

  getUserFiatCurrency () {
    return AppConstants.DEFAULT_CURRENCY_CODE
  }

  async getDataFromStorage (key, defaultValue) {
    const stringData = await AdaptiveStorage.get(key, defaultValue)
    return JSON.parse(stringData)
  }

  saveDataToStorage (key, data) {
    AdaptiveStorage.set(key, JSON.stringify(data))
  }

  isEligibleToFetchRemote (otherCurrency) {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    // if the last fetch time is expired
    if (currentTimestamp - this.lastSpotPriceFetchTime[otherCurrency] > PktPriceTicker.MAX_UPDATE_TIMEOUT_S) {
      return true
    } else {
      // if there is no value for this currency yet
      if (this.spotPrice[otherCurrency] === null || this.spotPrice[otherCurrency] === undefined) {
        return true
      } else {
        return false
      }
    }
  }

  getHeaders () {
    const headers = {
      Authorization: `Api-Key ${this.apiKey}`,
      'Content-Type': 'application/json; encoding=utf-8'
    }
    return headers
  }

  async fetchSpotPrice (otherCurrency) {
    let spotPrice = AppConstants.DEFAULT_PKT_FIAT_VALUE
    if (this.isEligibleToFetchRemote(otherCurrency)) {
      otherCurrency = otherCurrency.toUpperCase()
      const endpoint = `${PktPriceTicker.url}/api/1.0/spot/PKT/${otherCurrency}`
      // const headers = this.getHeaders()
      const response = await window.fetch(endpoint) // , { headers: headers })
      const data = await response.json()
      spotPrice = parseFloat(data.price)
      this.spotPrice[otherCurrency] = spotPrice
      this.saveDataToStorage(`pkt${otherCurrency}${AppConstants.PKT_SPOT_PRICE_KEY_SUFFIX}`, spotPrice)
    } else {
      const spotPriceStorageKey = `pkt${otherCurrency}${AppConstants.PKT_SPOT_PRICE_KEY_SUFFIX}`
      const response = await this.getDataFromStorage(spotPriceStorageKey, `${AppConstants.DEFAULT_PKT_FIAT_VALUE}`)
      this.spotPrice[otherCurrency] = response
      spotPrice = response
    }
    return spotPrice
  }

  async fetchSpotHisory (otherCurrency) {
    let priceHistory = []
    if (this.isEligibleToFetchRemote(otherCurrency)) {
      otherCurrency = otherCurrency.toUpperCase()
      const endpoint = `${PktPriceTicker.url}/api/1.0/history/spot/PKT/${otherCurrency}`
      // const headers = this.getHeaders()
      const response = await window.fetch(endpoint) // , { headers: headers })
      const data = await response.json()
      priceHistory = data
      this.priceHistory[otherCurrency] = priceHistory
      this.saveDataToStorage(`pkt${otherCurrency}${AppConstants.PKT_PRICE_HISTORY_KEY_SUFFIX}`, priceHistory)
    } else {
      const priceHistoryStorageKey = `pkt${otherCurrency}${AppConstants.PKT_PRICE_HISTORY_KEY_SUFFIX}`
      const response = await this.getDataFromStorage(priceHistoryStorageKey, [])
      this.priceHistory[otherCurrency] = response
      priceHistory = response
    }
    return priceHistory
  }

  getCurrentSpotPrice (otherCurrency) {
    otherCurrency = otherCurrency.toUpperCase()
    if (otherCurrency in this.spotPrice) {
      return this.spotPrice[otherCurrency]
    } else {
      throw new Error(`Currency ${otherCurrency} does not exist`)
    }
  }

  convertTo (amount, otherCurrency) {
    otherCurrency = otherCurrency.toUpperCase()
    return amount * this.getCurrentSpotPrice(otherCurrency)
  }

  convertFrom (amount, otherCurrency) {
    otherCurrency = otherCurrency.toUpperCase()
    return amount / this.getCurrentSpotPrice(otherCurrency)
  }

  convertCurrency (isConverted, amount) {
    let output = 0.00
    if (isConverted) {
      output = this.convertFrom(amount, this.getUserFiatCurrency())
    } else {
      output = this.formatAmount(this.convertTo(amount, this.getUserFiatCurrency()))
      output = parseFloat(output)
    }
    if (isNaN(output)) {
      output = 0.00
    }
    return output
  }

  formatAmount (amount) {
    const floatAmount = parseFloat(amount)
    const locale = getCurrentLocale()
    return floatAmount.toLocaleString(locale)
  }

  primaryCurrencyCode (isConverted, alternateCurrencyCode) {
    if (isConverted === true) {
      return alternateCurrencyCode
    } else {
      return AppConstants.MAIN_CRYPTO_CURRENCY_CODE
    }
  }

  alternateCurrencyCode (isConverted, alternateCurrencyCode) {
    if (isConverted === true) {
      return AppConstants.MAIN_CRYPTO_CURRENCY_CODE
    } else {
      return alternateCurrencyCode
    }
  }

  log (message) {
    const className = this.constructor.name
    let strMessage = message
    if (typeof message !== 'string') {
      strMessage = JSON.stringify(message)
    }
    if (PktPriceTicker.DEBUG) {
      console.log(`[${className}] ${strMessage}`)
    }
  }
}

/**
 * Get the PKT price from a PKT price ticker
 */
import 'dotenv/config'
import { getCurrentLocale } from '../translations'
import AppConstants from '../utils/AppConstants'
import AdaptiveStorage from '../utils/AdaptiveStorage'

const apiKey = process.env.PKT_TICKER_API_KEY

export default class PktPriceTicker {
  url () { return 'https://pktticker.tonygaitatzis.com' }

  constructor () {
    console.log('new PktPriceTicker()')
    this.apiKey = apiKey
    this.priceHistory = {}
    this.spotPrice = {}
    const supportedCurrencies = AppConstants.SUPPORTED_CURRENCIES
    for (const row in supportedCurrencies) {
      const currency = supportedCurrencies[row]
      console.log(currency)
      this.spotPrice[currency] = 0.02
      const spotPriceStorageKey = `pkt${currency}${AppConstants.PKT_SPOT_PRICE_KEY_SUFFIX}`
      const priceHistoryStorageKey = `pkt${currency}${AppConstants.PKT_PRICE_HISTORY_KEY_SUFFIX}`
      console.log(spotPriceStorageKey)

      this.getDataFromStorage(spotPriceStorageKey, `${AppConstants.DEFAULT_PKT_FIAT_VALUE}`)
        .then(response => {
          console.log('spotPrice')
          console.log(response)
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
    console.log('stringData')
    console.log(stringData)
    return JSON.parse(stringData)
  }

  saveDataToStorage (key, data) {
    AdaptiveStorage.set(key, JSON.stringify(data))
  }

  getHeaders () {
    const headers = {
      Authorization: `Api-Key ${this.apiKey}`,
      'Content-Type': 'application/json; encoding=utf-8'
    }
    return headers
  }

  async fetchSpotPrice (otherCurrency) {
    otherCurrency = otherCurrency.toUpperCase()
    const endpoint = `${this.url}/api/1.0/spot/PKT/${otherCurrency}`
    const headers = this.getHeaders()
    const response = await fetch(endpoint, { headers: headers })
    const data = await response.json()
    // TODO: extract data from response
    const spotPrice = parseFloat(data.amount)
    this.spotPrice[otherCurrency] = spotPrice
    this.saveDataToStorage(`pkt${otherCurrency}${AppConstants.PKT_SPOT_PRICE_KEY_SUFFIX}`, spotPrice)
    return response
  }

  async fetchSpotHisory (otherCurrency) {
    otherCurrency = otherCurrency.toUpperCase()
    const endpoint = `${this.url}/api/1.0/history/spot/PKT/${otherCurrency}`
    const headers = this.getHeaders()
    const response = await fetch(endpoint, { headers: headers })
    const data = await response.json()
    // TODO: extract data from response
    const history = data
    this.priceHistory[otherCurrency] = history
    this.saveDataToStorage(`pkt${otherCurrency}${AppConstants.PKT_PRICE_HISTORY_KEY_SUFFIX}`, history)
    return response
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
    }
    if (isNaN(output)) {
      output = '0.00'
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
}

export const isValidPktAddress = (address) => {
  let isValidPktAddress = true
  if (address.length <= AppConstants.PKT_ADDRESS_LENGTH) {
    isValidPktAddress = false
  } else {
    const pktPrefix = AppConstants.PKT_ADDRESS_PREFIX
    if (address.substr(0, pktPrefix.length) !== pktPrefix) {
      isValidPktAddress = false
    }
  }
  return isValidPktAddress
}

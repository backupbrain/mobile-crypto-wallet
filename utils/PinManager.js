import AppConstants from '../utils/AppConstants'
import AdaptiveStorage from '../utils/AdaptiveStorage'


export default class PinManager {
  constructor() {
    this.get()
  }

  async get() {
    let pin = this.pin
    if (pin === undefined) {
      pin = await AdaptiveStorage.get(AppConstants.LOGIN_PIN_KEY)
    }
    this.pin = pin
    return pin
  }

  async set(pin) {
    this.pin = pin
    await AdaptiveStorage.set(AppConstants.LOGIN_PIN_KEY, pin)
  }

  static async saveTime() {
    console.log('save ',new Date().getTime())
    await AdaptiveStorage.set(AppConstants.PIN_LOGIN_TIMEOUT_KEY, new Date().getTime())
  }

  static async getTime() {
    const time = await AdaptiveStorage.get(AppConstants.PIN_LOGIN_TIMEOUT_KEY, 0)
    return time
  }

  static async hasLogoutTimeExpired() {

    const time = await PinManager.getTime()
    console.log(new Date().getTime() - time)
    if (new Date().getTime() - time > AppConstants.PIN_LOGIN_TIMEOUT_S * 1000)
      return true
    else
      return false
  }

  isValid(pin) {
    return pin === this.pin
  }

  async clear() {
    await AdaptiveStorage.remove(AppConstants.LOGIN_PIN_KEY)
  }
}

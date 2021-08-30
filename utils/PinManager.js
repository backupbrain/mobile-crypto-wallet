import AppConstants from '../utils/AppConstants'
import AdaptiveStorage from '../utils/AdaptiveStorage'

export default class PinManager {
  constructor () {
    this.get()
  }

  async get () {
    let pin = this.pin
    if (pin === undefined) {
      pin = await AdaptiveStorage.get(AppConstants.LOGIN_PIN_KEY)
    }
    this.pin = pin
    return pin
  }

  async set (pin) {
    this.pin = pin
    await AdaptiveStorage.set(AppConstants.LOGIN_PIN_KEY, pin)
  }

  isValid (pin) {
    return pin === this.pin
  }

  async clear () {
    await AdaptiveStorage.remove(AppConstants.LOGIN_PIN_KEY)
  }
}

import AppConstants from '../utils/AppConstants'
import AdaptiveStorage from '../utils/AdaptiveStorage'

export default class PassphraseManager {
  constructor () {
    this.get()
  }

  async get () {
    let passphrase = this.passphrase
    if (passphrase === undefined) {
      passphrase = await AdaptiveStorage.get(AppConstants.PASSPHRASE_KEY)
    }
    this.passphrase = passphrase
    return passphrase
  }

  async set (passphrase) {
    this.passphrase = passphrase
    AdaptiveStorage.set(AppConstants.PASSPHRASE_KEY, passphrase)
  }

  isValid (passphrase) {
    return passphrase === this.passphrase
  }

  clear () {
    AdaptiveStorage.remove(AppConstants.PASSPHRASE_KEY)
  }
}

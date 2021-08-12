import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'
import base32 from 'base32'
import { authenticator } from 'otplib'
import randomBytes from 'randombytes'

export default class TwoFactorAuth {
  constructor (user, service) {
    this.timer = null
    this.user = user
    this.service = service
    this.secret = null
    this.otpauth = null
  }

  async initialize () {
    await this.getOrSetPairingCode()
    this.startTokenGenerator()
  }

  destructor () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  /**
   * Create a 32-byte random seed
   *
   * @return string
   *
   * IMPORTANT: this function differs on native
   */
  createSecret () {
    return randomBytes(32)
  }

  async getPairingCode () {
    const secret = await AdaptiveStorage.get(AppConstants.AUTH_PAIRING_CODE)
    this.secret = secret
    return secret
  }

  createPairingCode () {
    const secret = base32.encode(new Date().toGMTString())
    AdaptiveStorage.set(AppConstants.AUTH_PAIRING_CODE, secret)
    this.secret = secret
    return secret
  }

  async getOrSetPairingCode () {
    let secret = await this.getPairingCode()
    if (!secret) {
      secret = this.createPairingCode()
    }
    return secret
  }

  startTokenGenerator () {
    this.otpauth = authenticator.keyuri(this.user, this.service, this.secret)
  }

  isPinValid (pin) {
    return authenticator.check(pin, this.secret)
  }
}

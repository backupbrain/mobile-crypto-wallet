import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'
import { authenticator } from 'otplib'

export default class TwoFactorAuth {
  static DEBUG() { return false }

  constructor(user, service) {
    this.log(`.constructor("${user}", "${service}")`)
    this.timer = null
    this.user = user
    this.service = service
    this.secret = null
    this.pairingCode = null
    this.otpauth = null
    this.onTokenGenerated = null
  }

  async initialize() {
    this.log('.initialize()')
    this.secret = await this.getOrSetPairingCode()
    this.otpauth = this.getGooglePairingUrl(this.secret)
    this.timer = setInterval(() => {
      if (this.timeUntilTokenExpires() === 30) {
        this.token = this.generateToken(this.secret)
      }
    }, 1000)
    this.token = this.generateToken(this.secret)
  }

  destructor() {
    this.log('.destructor()')
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  async resetPairing() {
    await this.createPairingCode()
    this.getGooglePairingUrl()
    this.generateToken()
  }

  static async getPairingCode() {
    /* this.log('.getPairingCode()') */
    const secret = await AdaptiveStorage.get(AppConstants.AUTH_PAIRING_CODE)
    /* this.secret = secret */
    return secret
  }

  async createPairingCode() {
    /* this.log('.createPairingCode()') */
    const secret = authenticator.generateSecret()
    await AdaptiveStorage.set(AppConstants.AUTH_PAIRING_CODE, secret)
    this.secret = secret
    console.log(`secret: ${secret}`)
    return secret
  }

  generateRandomPairingCode() {
    /* this.log('.generateRandomPairingCode()') */
    const secret = authenticator.generateSecret()
    return secret
  }

  static async savePairingCode(secret) {
    await AdaptiveStorage.set(AppConstants.AUTH_PAIRING_CODE, secret)
    /* await this.initialize() */
    return secret;
  }

  async getOrSetPairingCode() {
    /* this.log('.getOrSetPairingCode()') */
    let secret = await TwoFactorAuth.getPairingCode()
    if (!secret) {
      secret = await this.createPairingCode()
    }
    return secret
  }

  getGooglePairingUrl(secret) {
    /* this.log('.startTokenGenerator()') */
    const otpauth = authenticator.keyuri(this.user, this.service, secret)
    /* this.otpauth = otpauth
    this.secret=secret */
    return otpauth
  }

  timeUntilTokenExpires() {
    return authenticator.timeRemaining()
  }

  generateToken(secret) {
    /* this.log('.generateToken()') */
    const token = authenticator.generate(secret)
    console.log(`generating token ${token}`)
    if (this.onTokenGenerated) {
      this.onTokenGenerated(token)
    }
    /* this.token = token */
    return token
  }

  static isPinValid(pin,secret) {
    console.log('.isPinValid()',pin,secret)
    const isValid = authenticator.verify({ token: pin, secret: secret })
    console.log(`Verifying pin ${pin} against  ${secret}: ${JSON.stringify(isValid)}`)
    return isValid
  }

  log(message) {
    const className = this.constructor.name
    let strMessage = message
    if (typeof message !== 'string') {
      strMessage = JSON.stringify(message)
    }
    if (TwoFactorAuth.DEBUG) {
      console.log(`[${className}] ${strMessage}`)
    }
  }
}

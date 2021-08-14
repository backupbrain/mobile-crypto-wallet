import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'
import { authenticator } from 'otplib'

export default class TwoFactorAuth {
  static DEBUG () { return false }

  constructor (user, service) {
    this.log(`.constructor("${user}", "${service}")`)
    this.timer = null
    this.user = user
    this.service = service
    this.secret = null
    this.pairingCode = null
    this.otpauth = null
    this.onTokenGenerated = null
  }

  async initialize () {
    this.log('.initialize()')
    await this.getOrSetPairingCode()
    this.getGooglePairingUrl()
    this.timer = setInterval(() => {
      if (this.timeUntilTokenExpires() === 30) {
        this.generateToken()
      }
    }, 1000)
    this.generateToken()
  }

  destructor () {
    this.log('.destructor()')
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  async resetPairing () {
    await this.createPairingCode()
    this.getGooglePairingUrl()
    this.generateToken()
  }

  async getPairingCode () {
    this.log('.getPairingCode()')
    const secret = await AdaptiveStorage.get(AppConstants.AUTH_PAIRING_CODE)
    this.secret = secret
    return secret
  }

  async createPairingCode () {
    this.log('.createPairingCode()')
    const secret = authenticator.generateSecret()
    await AdaptiveStorage.set(AppConstants.AUTH_PAIRING_CODE, secret)
    this.secret = secret
    console.log(`secret: ${secret}`)
    return secret
  }

  async getOrSetPairingCode () {
    this.log('.getOrSetPairingCode()')
    let secret = await this.getPairingCode()
    if (!secret) {
      secret = await this.createPairingCode()
    }
    return secret
  }

  getGooglePairingUrl () {
    this.log('.startTokenGenerator()')
    const otpauth = authenticator.keyuri(this.user, this.service, this.secret)
    this.otpauth = otpauth
    return otpauth
  }

  timeUntilTokenExpires () {
    return authenticator.timeRemaining()
  }

  generateToken () {
    this.log('.generateToken()')
    const token = authenticator.generate(this.secret)
    this.log(`generating token ${token}`)
    if (this.onTokenGenerated) {
      this.onTokenGenerated(token)
    }
    this.token = token
    return token
  }

  isPinValid (pin) {
    this.log('.isPinValid()')
    const isValid = authenticator.verify({ token: pin, secret: this.secret })
    this.log(`Verifying pin ${pin} against ${this.token} ${this.secret}: ${JSON.stringify(isValid)}`)
    return isValid
  }

  log (message) {
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

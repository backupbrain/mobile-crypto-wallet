import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'

export default class TransactionNoteManager {
  static DEBUG () { return false }

  connstructor () {
    this.log('.constructor()')
    this.notes = {}
    this.isLoaded = false
  }

  async getAll () {
    this.log('.getAll()')
    let notes = await AdaptiveStorage.get(AppConstants.TRANSACTION_NOTES_KEY)
    if (notes === undefined || notes === null) {
      notes = {}
    }
    this.notes = notes
    this.isLoaded = true
    return notes
  }

  async get (transactionId) {
    this.log(`.get("${transactionId}")`)
    if (!this.isLoaded) {
      await this.getAll()
    }
    return this.notes[transactionId]
  }

  async set (transactionId, text) {
    this.log(`.set("${transactionId}", "${text}")`)
    if (!this.isLoaded) {
      await this.getAll()
    }
    this.notes[transactionId] = text
    await this.save()
  }

  async remove (transactionId) {
    this.log(`.remove("${transactionId}")`)
    if (!this.isLoaded) {
      await this.getAll()
    }
    delete this.notes[transactionId]
  }

  async save () {
    this.log('.save()')
    if (!this.isLoaded) {
      await this.getAll()
    }
    await AdaptiveStorage.set(AppConstants.TRANSACTION_NOTES_KEY, this.notes)
  }

  async clearAll () {
    this.log('.clearAll()')
    this.notes={}
    await AdaptiveStorage.set(AppConstants.TRANSACTION_NOTES_KEY, this.notes)
  }

  log (message) {
    const className = this.constructor.name
    let strMessage = message
    if (typeof message !== 'string') {
      strMessage = JSON.stringify(message)
    }
    if (TransactionNoteManager.DEBUG) {
      console.log(`[${className}] ${strMessage}`)
    }
  }
}

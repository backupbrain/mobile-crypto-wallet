import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'

export default class TransactionNoteManager {
  connstructor () {
    this.notes = {}
    this.isLoaded = false
  }

  async getAll () {
    let notes = await AdaptiveStorage.get(AppConstants.TRANSACTION_NOTES_KEY)
    if (notes === undefined) {
      notes = {}
    }
    this.notes = notes
    this.isLoaded = true
    return notes
  }

  async get (transactionId) {
    if (!this.isLoaded) {
      await this.getAll()
    }
    return this.notes[transactionId]
  }

  async set (transactionId, text) {
    if (!this.isLoaded) {
      await this.getAll()
    }
    this.notes[transactionId] = text
    await this.save()
  }

  async remove (transactionId) {
    if (!this.isLoaded) {
      await this.getAll()
    }
    delete this.notes[transactionId]
  }

  async save () {
    if (!this.isLoaded) {
      await this.getAll()
    }
    await AdaptiveStorage.save(AppConstants.TRANSACTION_NOTES_KEY, this.notes)
  }
}

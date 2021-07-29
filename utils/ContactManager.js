import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'

export class Contact {
  constructor (name, address) {
    this.name = name
    this.address = address
  }
}

export default class PktAddressContactManager {
  constructor () {
    this.contacts = []
    this.lookup = {}
  }

  async initialize () {
    this.getAll()
  }

  async getAll () {
    const contacts = await AdaptiveStorage.get(AppConstants.CONTACT_LIST_KEY)
    this.setAll(contacts)
  }

  async save () {
    await AdaptiveStorage.set(AppConstants.CONTACT_LIST_KEY, this.contacts)
  }

  async get (address) {
    if (this.contacts.length === 0) {
      await this.getAll()
    }
    const row = this.lookup[address]
    if (row !== undefined) {
      return this.contacts[row]
    }
  }

  async set (contact) {
    // check if there is an existing contact with this address
    const row = this.lookup[contact.address]
    if (row !== undefined) {
      this.contacts[row] = contact
    } else {
      this.contacts.push(contact)
      this.lookup[contact.address] = this.contacts.length - 1
    }
    await this.save()
  }

  async setAll (contacts) {
    this.contacts.splice(0, this.contacts.length - 1)
    for (let row = 0; row < contacts.length; row++) {
      const contact = contacts[row]
      this.contacts.push(contact)
      this.lookup[contact.address] = row
    }
    await this.save()
    return contacts
  }

  async clearAll () {
    this.setAll([])
  }

  async remove (address) {
    const row = this.lookup[address]
    if (row !== undefined) {
      this.contacts.splice(row, 1)
    }
    await this.save()
  }
}

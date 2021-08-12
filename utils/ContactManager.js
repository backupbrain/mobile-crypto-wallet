import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'

export class Contact {
  constructor (name, address) {
    this.name = name
    this.address = address
  }
}

export default class ContactManager {
  static get DEBUG () { return false }

  constructor () {
    this.contacts = []
    this.lookup = {}
    this.isLoaded = false
  }

  async initialize () {
    this.log('.initialize()')
    this.getAll()
  }

  async getAll () {
    this.log('.getAll()')
    let contacts = await AdaptiveStorage.get(AppConstants.CONTACT_LIST_KEY)
    if (contacts === undefined || contacts === null) {
      contacts = []
    }
    this.setAll(contacts)
    this.isLoaded = true
  }

  async save () {
    this.log('.save()')
    await AdaptiveStorage.set(AppConstants.CONTACT_LIST_KEY, this.contacts)
  }

  async getByAddress (address) {
    this.log('.getByAddress()')
    if (this.contacts.length === 0) {
      await this.getAll()
    }
    const row = this.lookup[address]
    if (row !== undefined) {
      return this.contacts[row]
    }
  }

  async getByName (name) {
    this.log('.getByName()')
    if (this.contacts.length === 0) {
      await this.getAll()
    }
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i]
      if (contact.name === name) {
        return contact
      }
    }
  }

  async set (contact) {
    this.log(`.set(${contact.name}, ${contact.address})`)
    // check if there is an existing contact with this address
    const row = this.lookup[contact.address]
    if (row !== undefined) {
      this.contacts[row] = contact
    } else {
      this.contacts.push(contact)
      this.lookup[contact.address] = this.contacts.length - 1
    }
    // await this.save()
  }

  async add (name, address) {
    const contact = new Contact(name, address)
    return this.set(contact)
  }

  async removeByRow (row) {
    this.log(`.removeByRow(${row})`)
    this.contacts.splice(row, 1)
    this.setAll(this.contacts)
  }

  /*
  async updateRow (row, name, address) {
    await this.removeByRow(row)
    const contact = new Contact(name, address)
    await this.set(contact)
  }

  async updateAddress (oldAddress, name, newAddress) {
    this.log(`.updateAddress(${oldAddress}, ${name}, ${newAddress})`)
    // await this.remove(oldAddress)
    // const contact = new Contact(name, newAddress)
    // await this.set(contact)
  }
  /* */

  async setAll (contacts) {
    this.log('.setAll()')
    this.contacts = []
    const lookup = {}
    for (let row = 0; row < contacts.length; row++) {
      const contact = contacts[row]
      this.contacts.push(contact)
      lookup[contact.address] = row
    }
    this.lookup = lookup
    await this.save()
    return contacts
  }

  async clearAll () {
    this.log('.clearAll()')
    this.setAll([])
  }

  async remove (address) {
    this.log(`.remove(${address})`)
    const row = this.lookup[address]
    if (row !== undefined) {
      await this.removeByRow(row)
    }
  }

  log (message) {
    const className = this.constructor.name
    let strMessage = message
    if (typeof message !== 'string') {
      strMessage = JSON.stringify(message)
    }
    if (ContactManager.DEBUG) {
      console.log(`[${className}] ${strMessage}`)
    }
  }
}

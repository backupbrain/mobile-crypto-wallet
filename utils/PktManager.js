// TODO: implement actual gRPC calls
// import Bs58Check from 'bs58check'
// import Bech32 from 'bech32'
import AppConstants from '../utils/AppConstants'

export default class PktManager {
  constructor () {
    this.myAddresses = [
      {
        amount: 123456.00134,
        address: 'pktak02tulj96mayclh96uk1qz40pvqy3s26p4glgya'
      },
      {
        amount: 56.00134,
        address: 'pktakmayclh96uk1qz02tulj9640pvqy3s26p4glgya'
      },
      {
        amount: 0.0000134,
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      }
    ]
    this.addressLookup = {}
  }

  async createWallet () {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  async openWallet (passphrase) {
    return new Promise((resolve, reject) => {
      resolve(true)
    }, 10)
  }

  async createAddress () {
    const address = {
      amount: 0,
      address: 'pkth96uk1qz02tuakmaycllj9640pvqy3s26p4glgya'
    }
    this.myAddresses.push(address)
    return new Promise((resolve, reject) => {
      resolve(address)
    })
  }

  async getAddresses () {
    const myAddresses = this.myAddresses
    const addressLookup = {}
    for (let i = 0; i < myAddresses.length; i++) {
      const address = myAddresses[i]
      addressLookup[address.address] = address
    }
    this.addressLookup = addressLookup
    return new Promise(resolve => {
      resolve(myAddresses)
    }, 10)
    // return myAddresses
  }

  async getAddressInfo (address) {
    await this.getAddresses()
    return this.addressLookup[address]
  }

  async isAmountLessThanWalletBalance (amount, address) {
    const addressInfo = this.getAddressInfo(address)
    if (addressInfo !== undefined && addressInfo !== null) {
      return (amount <= addressInfo.amount)
    } else {
      return false
    }
  }

  async estimateNetworkFee (numAddresses) {
    // TODO: create a transaction but don't sign it.
    // from there, get an estimate of the network fee.
    // Note: network fee depends on which coins are spent
    // so it's impossible to know what the actual network fee inspect
    // until after the spend happens
  }

  async getConfirmedBalance () {

  }

  async getUnconfirmedBalance () {

  }

  async getTotalBalance () {
    // sub the balances in the addresses
    const addresses = await this.getAddresses()
    let total = 0
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      total += address.amount
    }
    return total
  }

  async sendCoins (fromAddress, toAddress, amount) {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  async getTransactions (filterAddress, numTransactions, offset) {
    if (filterAddress === undefined) {
      filterAddress = '*'
    }
    if (numTransactions === undefined) {
      numTransactions = 10
    }
    if (offset === undefined) {
      offset = 0
    }
    const transactions = [
      {
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        category: 'receive',
        amount: 0.01000000,
        label: '',
        vout: 1,
        confirmations: 1,
        blockhash: '00000000000001753b24411d0e4726212f6a53aeda481ceff058ffb49e1cd969',
        blockheight: 1772396,
        blockindex: 73,
        blocktime: 1592600085,
        txid: '69be85fa295f48223aca54354510d8607b62906c4fcb2ac742b218c90d57cf2f',
        walletconflicts: [],
        time: 1592599884,
        timereceived: 1592599884,
        'bip125-replaceable': 'no'
      },
      {
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        category: 'receive',
        amount: 0.00010000,
        label: '',
        vout: 0,
        confirmations: 1,
        blockhash: '00000000000001753b24411d0e4726212f6a53aeda481ceff058ffb49e1cd969',
        blockheight: 1772396,
        blockindex: 72,
        blocktime: 1592600085,
        txid: '1e35cf4bfc8a54fab721dc8bfec6fb0cb9baea94466b134aa9a57fa304ba1d05',
        walletconflicts: [],
        time: 1592599938,
        timereceived: 1592599938,
        'bip125-replaceable': 'no'
      }
    ]
    return new Promise((resolve, reject) => {
      resolve(transactions)
    })
  }

  /*
  // FIXME: this is the "official" checking method, but returns false alwayys
  // it appears to fail both the Bs58Check.decode(addr) and Bech32.decode(addr)
  static isValidAddress (addr) {
    const config = {
      bs58Prefixes: [0x75, 0x38, 0xa3, 0x22],
      bech32Prefix: 'pkt'
    }
    try {
      const x = Bs58Check.decode(addr)
      return config.bs58Prefixes.indexOf(x[0]) > -1
    } catch (e) {
      try {
        const x = Bech32.decode(addr)
        return x.prefix === config.bech32Prefix
      } catch (e) {
        return false
      }
    }
  }
  /* */

  static isValidAddress (address) {
    let isValidPktAddress = true
    if (address.length !== AppConstants.PKT_ADDRESS_LENGTH) {
      isValidPktAddress = false
    } else {
      const pktPrefix = AppConstants.PKT_ADDRESS_PREFIX
      if (address.substr(0, pktPrefix.length) !== pktPrefix) {
        isValidPktAddress = false
      }
    }
    return isValidPktAddress
  }
}

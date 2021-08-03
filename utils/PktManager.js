// TODO: implement actual gRPC calls
import Bs58Check from 'bs58check'
import Bech32 from 'bech32'

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
    this.myaddresses.push(address)
    return new Promise((resolve, reject) => {
      resolve(address)
    })
  }

  async getAddresses () {
    const myAddresses = this.myAddresses
    return new Promise(resolve => {
      resolve(myAddresses)
    }, 10)
  }

  async getUsignedBalance () {

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

  async getTransactions () {
    const transactions = [
      {
        address: 'mi25UrzHnvn3bpEfFCNqJhPWJn5b77a5NE',
        category: 'receive',
        amount: 0.01000000,
        label: '',
        vout: 1,
        confirmations: 1,
        blockhash: '00000000000001753b24411d0e4726212f6a53aeda481ceff058ffb49e1cd969',
        blockheight: 1772396,
        blockindex: 73,
        blocktime: 1592600085,
        txid: '8e2ab10cabe9ec04ed438086a80b1ac72558cc05bb206e48fc9a18b01b9282e9',
        walletconflicts: [],
        time: 1592599884,
        timereceived: 1592599884,
        'bip125-replaceable': 'no'
      },
      {
        address: 'mi25UrzHnvn3bpEfFCNqJhPWJn5b77a5NE',
        category: 'receive',
        amount: 0.00010000,
        label: '',
        vout: 0,
        confirmations: 1,
        blockhash: '00000000000001753b24411d0e4726212f6a53aeda481ceff058ffb49e1cd969',
        blockheight: 1772396,
        blockindex: 72,
        blocktime: 1592600085,
        txid: 'ca4898d8f950df03d6bfaa00578bd0305d041d24788b630d0c4a32debcac9f36',
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

  static isValidAddress (addr) {
    const config = {
      bs58Prefixes: [0x75, 0x38, 0xa3, 0x22],
      bech32Prefix: 'pkt'
    }
    try {
      const x = Bs58Check.decode(addr)
      return config.bs58Prefixes.indexOf(x[0]) > -1
    } catch (e) {
      console.log('')
    }
    try {
      const x = Bech32.decode(addr)
      return x.prefix === config.bech32Prefix
    } catch (e) {
      console.log('')
    }
    return false
  }
}

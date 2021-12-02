// TODO: implement actual gRPC calls
// import Bs58Check from 'bs58check'
// import Bech32 from 'bech32'
import AppConstants from '../utils/AppConstants'
import bip39words from './bip39words'

export default class PktManager {
  constructor () {
    this.myAddresses = [
      {
        address: 'pkt1qnzwh7fuw6yrxyphn5r5fcutr5fnqueeh7penc0',
        total: 0,
        stotal: 0,
        spendable: 0,
        sspendable: 0,
        immaturereward: 0,
        simmaturereward: 0,
        unconfirmed: 0,
        sunconfirmed: 0,
        outputcount: 1
      },
      {
        address: 'pkt1qnzwh7fuw6yrxyphn5r5fcutr5fnqueeh7penc0',
        total: 98001,
        stotal: 105227772493824,
        spendable: 98001,
        sspendable: 105227772493824,
        immaturereward: 0,
        simmaturereward: 0,
        unconfirmed: 0,
        sunconfirmed: 0,
        outputcount: 1
      },
      {
        address: 'pkt1qtnc7c8sj7w3ncehz0a33xuqhlxm0msmykrp2g6',
        total: 49500,
        stotal: 53150220288000,
        spendable: 49500,
        sspendable: 53150220288000,
        immaturereward: 0,
        simmaturereward: 0,
        unconfirmed: 0,
        sunconfirmed: 0,
        outputcount: 1
      },
      {
        address: 'pkt1qjmdr45cpxu9kyw43ax0k6kcu8l70vezeeedjtq',
        total: 1990000,
        stotal: 2136746229760000,
        spendable: 1990000,
        sspendable: 2136746229760000,
        immaturereward: 0,
        simmaturereward: 0,
        unconfirmed: 0,
        sunconfirmed: 0,
        outputcount: 1
      }
    ]
    this.addressLookup = {}
  }

  async createWallet () {
    return new Promise((resolve, reject) => {
      const phrase = []
      const totalBip39Words = bip39words.length
      for (let i = 0; i < 15; i++) {
        const randInt = Math.floor(Math.random() * totalBip39Words) + 1
        const randWord = bip39words[randInt]
        phrase.push(randWord)
        bip39words.splice(randInt, 0)
      }
      resolve(phrase)
    }, 10)
  }

  async openWallet (passphrase) {
    return new Promise((resolve, reject) => {
      resolve(true)
    }, 10)
  }

  async createAddress () {
    const address = {
      address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
      total: 0.00,
      stotal: 1073741405,
      spendable: 0.9999996097758412,
      sspendable: 1073741405,
      immaturereward: 0,
      simmaturereward: 0,
      unconfirmed: 0,
      sunconfirmed: 0,
      outputcount: 1
    }
    /* this.myAddresses.push(address) */
    return new Promise((resolve, reject) => {
      resolve(address)
    }, 10)
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
      return (amount <= addressInfo.total)
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
      total += address.total
    }
    return total
  }

  async sendCoins (fromAddress, toAddress, amount) {
    const transactionId = '1e35cf4bfc8a54fab721dc8bfec6fb0cb9baea94466b134aa9a57fa304ba1d05'
    return new Promise((resolve, reject) => {
      resolve(transactionId)
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
        abandoned: false,
        account: '',
        address: 'pkt1qwpw7pd44r6ghl9whr0sgsnz8t66zm27ejqm5ka',
        amount: -29700,
        blockhash: 'c3877f15eeeaf3aa6371d15e47890e89e36fbf49425b555d7a0bd0a6019d6472',
        blocktime: 1629036261,
        category: 'send',
        confirmations: 2926,
        fee: -1.3131648302078247e-07,
        time: 1629036261,
        timereceived: 1629036261,
        trusted: false,
        txid: '093e8ac60e197e12a50c52489c1ec163e55cbbcd40d208f0d89077ba4bbc5c1b',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qp08pc8dmkuu8sz6txl0azm2cepwja9u6w8pj6z',
        amount: -599.9999998686835,
        blockhash: 'c3877f15eeeaf3aa6371d15e47890e89e36fbf49425b555d7a0bd0a6019d6472',
        blocktime: 1629036261,
        category: 'send',
        confirmations: 2926,
        fee: -1.3131648302078247e-07,
        time: 1629036261,
        timereceived: 1629036261,
        trusted: false,
        txid: '093e8ac60e197e12a50c52489c1ec163e55cbbcd40d208f0d89077ba4bbc5c1b',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qp08pc8dmkuu8sz6txl0azm2cepwja9u6w8pj6z',
        amount: 599.9999998686835,
        blockhash: 'c3877f15eeeaf3aa6371d15e47890e89e36fbf49425b555d7a0bd0a6019d6472',
        blocktime: 1629036261,
        category: 'receive',
        confirmations: 2926,
        time: 1629036261,
        timereceived: 1629036261,
        trusted: false,
        txid: '093e8ac60e197e12a50c52489c1ec163e55cbbcd40d208f0d89077ba4bbc5c1b',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qp08pc8dmkuu8sz6txl0azm2cepwja9u6w8pj6z',
        amount: -30300,
        blockhash: '3d42d21a3ce089aa7da2561375173593140568ee5b1e669bfbc62eaeb7f12da4',
        blocktime: 1629035406,
        category: 'send',
        confirmations: 2944,
        fee: 0,
        time: 1629035406,
        timereceived: 1629035406,
        trusted: false,
        txid: 'c055d372c2698a1284d5d9373c4da7fdc447c3af5408cddbbbb6167030ce2db8',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qp08pc8dmkuu8sz6txl0azm2cepwja9u6w8pj6z',
        amount: 30300,
        blockhash: '3d42d21a3ce089aa7da2561375173593140568ee5b1e669bfbc62eaeb7f12da4',
        blocktime: 1629035406,
        category: 'receive',
        confirmations: 2944,
        time: 1629035406,
        timereceived: 1629035406,
        trusted: false,
        txid: 'c055d372c2698a1284d5d9373c4da7fdc447c3af5408cddbbbb6167030ce2db8',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qgjgj0a4na30kwqw0yjqfdfeaktaze27g4uf05f',
        amount: 25000,
        blockhash: '034d9138f0b624c1ad8ca3c583b6f51c11c4547ad77c9ee76dc1881aede6eaea',
        blocktime: 1627863423,
        category: 'receive',
        confirmations: 22499,
        time: 1627863423,
        timereceived: 1627863423,
        trusted: false,
        txid: 'da200702a77abf9a0e0850943343ea88d2fef3c479de785922196bd3849710e1',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qcr60rnnsrluy2cgaj0mwwfhgefyxkw07a238p7',
        amount: -155000,
        blockhash: 'bf834bfd5daa1677d7b153284de26759c263db62c555400238b3e99447f8a9ba',
        blocktime: 1627508765,
        category: 'send',
        confirmations: 28487,
        fee: -2.5890767574310303e-07,
        time: 1627508765,
        timereceived: 1627508765,
        trusted: false,
        txid: '7ee02ca333c857c2f8d57b8cd10cf505db10fabe07f4d13ee38180715b20cd88',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: -0.9999996097758412,
        blockhash: 'bf834bfd5daa1677d7b153284de26759c263db62c555400238b3e99447f8a9ba',
        blocktime: 1627508765,
        category: 'send',
        confirmations: 28487,
        fee: -2.5890767574310303e-07,
        time: 1627508765,
        timereceived: 1627508765,
        trusted: false,
        txid: '7ee02ca333c857c2f8d57b8cd10cf505db10fabe07f4d13ee38180715b20cd88',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: 0.9999996097758412,
        blockhash: 'bf834bfd5daa1677d7b153284de26759c263db62c555400238b3e99447f8a9ba',
        blocktime: 1627508765,
        category: 'receive',
        confirmations: 28487,
        time: 1627508765,
        timereceived: 1627508765,
        trusted: false,
        txid: '7ee02ca333c857c2f8d57b8cd10cf505db10fabe07f4d13ee38180715b20cd88',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: -153449.99999986868,
        blockhash: 'e8a4924763482d1d3dba9f006fbeb11e0c15de479d390606652ff12f9f38c478',
        blocktime: 1627508410,
        category: 'send',
        confirmations: 28493,
        fee: -1.3131648302078247e-07,
        time: 1627508410,
        timereceived: 1627508410,
        trusted: false,
        txid: '44db6311afddcb3549fd633f03e80a78b922ab014be5b9dff744d07e3267610c',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: 153449.99999986868,
        blockhash: 'e8a4924763482d1d3dba9f006fbeb11e0c15de479d390606652ff12f9f38c478',
        blocktime: 1627508410,
        category: 'receive',
        confirmations: 28493,
        time: 1627508410,
        timereceived: 1627508410,
        trusted: false,
        txid: '44db6311afddcb3549fd633f03e80a78b922ab014be5b9dff744d07e3267610c',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qcr60rnnsrluy2cgaj0mwwfhgefyxkw07a238p7',
        amount: -1550,
        blockhash: 'e8a4924763482d1d3dba9f006fbeb11e0c15de479d390606652ff12f9f38c478',
        blocktime: 1627508410,
        category: 'send',
        confirmations: 28493,
        fee: -1.3131648302078247e-07,
        time: 1627508410,
        timereceived: 1627508410,
        trusted: false,
        txid: '44db6311afddcb3549fd633f03e80a78b922ab014be5b9dff744d07e3267610c',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: -155000,
        blockhash: '430a724f58484e3ef41dc59fab09a3a9a43e97b53e9e939fcf22f847cc65d97e',
        blocktime: 1627505589,
        category: 'send',
        confirmations: 28529,
        fee: 0,
        time: 1627505589,
        timereceived: 1627505589,
        trusted: false,
        txid: '72309a0a6a48d3a962f91bf7aead7b49e9ae5ca49d14c2dea2de86578398283e',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: 155000,
        blockhash: '430a724f58484e3ef41dc59fab09a3a9a43e97b53e9e939fcf22f847cc65d97e',
        blocktime: 1627505589,
        category: 'receive',
        confirmations: 28529,
        time: 1627505589,
        timereceived: 1627505589,
        trusted: false,
        txid: '72309a0a6a48d3a962f91bf7aead7b49e9ae5ca49d14c2dea2de86578398283e',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: -1,
        blockhash: '33cdfd0b74c44bf322ab805361e808b31cfcfc093c6b67d74fbb2702c4edfe91',
        blocktime: 1627505466,
        category: 'send',
        confirmations: 28532,
        fee: 0,
        time: 1627505466,
        timereceived: 1627505466,
        trusted: false,
        txid: '81daa1f89dac5b9db735c804212e50bc8b829f374465562b1cbec3732f4521ea',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: 1,
        blockhash: '33cdfd0b74c44bf322ab805361e808b31cfcfc093c6b67d74fbb2702c4edfe91',
        blocktime: 1627505466,
        category: 'receive',
        confirmations: 28532,
        time: 1627505466,
        timereceived: 1627505466,
        trusted: false,
        txid: '81daa1f89dac5b9db735c804212e50bc8b829f374465562b1cbec3732f4521ea',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q2qjypaa9kpg6nfscmewl5vlxsua74suhtvypxq',
        amount: -1859.9999998686835,
        blockhash: 'abd2bc81bdd0d6d7c8775f6d32242dd0e629ff284757fb60a401f4842a135304',
        blocktime: 1627505034,
        category: 'send',
        confirmations: 28537,
        fee: -1.3131648302078247e-07,
        time: 1627505034,
        timereceived: 1627505034,
        trusted: false,
        txid: '9e80926c14af14b05ecb29de65ab0ec791ff03a5e31efbc4afb127e833d7cce1',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q2qjypaa9kpg6nfscmewl5vlxsua74suhtvypxq',
        amount: 1859.9999998686835,
        blockhash: 'abd2bc81bdd0d6d7c8775f6d32242dd0e629ff284757fb60a401f4842a135304',
        blocktime: 1627505034,
        category: 'receive',
        confirmations: 28537,
        time: 1627505034,
        timereceived: 1627505034,
        trusted: false,
        txid: '9e80926c14af14b05ecb29de65ab0ec791ff03a5e31efbc4afb127e833d7cce1',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qu7af39jp575qqs4yc50h7h9erhmr6nyc0l404q',
        amount: -91140,
        blockhash: 'abd2bc81bdd0d6d7c8775f6d32242dd0e629ff284757fb60a401f4842a135304',
        blocktime: 1627505034,
        category: 'send',
        confirmations: 28537,
        fee: -1.3131648302078247e-07,
        time: 1627505034,
        timereceived: 1627505034,
        trusted: false,
        txid: '9e80926c14af14b05ecb29de65ab0ec791ff03a5e31efbc4afb127e833d7cce1',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: -1550,
        blockhash: 'abd2bc81bdd0d6d7c8775f6d32242dd0e629ff284757fb60a401f4842a135304',
        blocktime: 1627505034,
        category: 'send',
        confirmations: 28537,
        fee: 0,
        time: 1627505034,
        timereceived: 1627505034,
        trusted: false,
        txid: '4f0f72995185d7f76cfe187ab1796d6adf34e04f1fcee333e2938289d7dbe8e0',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mtyeymmdmc2the87psvlu9h6k0wywm8za0m83',
        amount: 1550,
        blockhash: 'abd2bc81bdd0d6d7c8775f6d32242dd0e629ff284757fb60a401f4842a135304',
        blocktime: 1627505034,
        category: 'receive',
        confirmations: 28537,
        time: 1627505034,
        timereceived: 1627505034,
        trusted: false,
        txid: '4f0f72995185d7f76cfe187ab1796d6adf34e04f1fcee333e2938289d7dbe8e0',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q2qjypaa9kpg6nfscmewl5vlxsua74suhtvypxq',
        amount: -93000,
        blockhash: 'e5ef9f17a11f65cebe32ab5bed245af3c283279641e5f39973dc1037ca07fe74',
        blocktime: 1627503889,
        category: 'send',
        confirmations: 28555,
        fee: 0,
        time: 1627503889,
        timereceived: 1627503889,
        trusted: false,
        txid: 'ef7dec5efa1de96f6d8da033f5bfd15c88c66631942263a665030624486843b0',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q2qjypaa9kpg6nfscmewl5vlxsua74suhtvypxq',
        amount: 93000,
        blockhash: 'e5ef9f17a11f65cebe32ab5bed245af3c283279641e5f39973dc1037ca07fe74',
        blocktime: 1627503889,
        category: 'receive',
        confirmations: 28555,
        time: 1627503889,
        timereceived: 1627503889,
        trusted: false,
        txid: 'ef7dec5efa1de96f6d8da033f5bfd15c88c66631942263a665030624486843b0',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qs4et8n3768lxm0l0fhxd2nx7vq85d699w8p3vf',
        amount: -7000,
        blockhash: '099b98066fb006b8095b1a1419b74cef24662b8ed2f7cde28c087b28104dc1fa',
        blocktime: 1627498638,
        category: 'send',
        confirmations: 28631,
        fee: -1.3131648302078247e-07,
        time: 1627498638,
        timereceived: 1627498638,
        trusted: false,
        txid: '41045fd414a64c16552135e2a88d1f1af3f728f8fb2c2cf5dba3d75cf50ea6bb',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: -3499.999999737367,
        blockhash: '099b98066fb006b8095b1a1419b74cef24662b8ed2f7cde28c087b28104dc1fa',
        blocktime: 1627498638,
        category: 'send',
        confirmations: 28631,
        fee: -1.3131648302078247e-07,
        time: 1627498638,
        timereceived: 1627498638,
        trusted: false,
        txid: '41045fd414a64c16552135e2a88d1f1af3f728f8fb2c2cf5dba3d75cf50ea6bb',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: 3499.999999737367,
        blockhash: '099b98066fb006b8095b1a1419b74cef24662b8ed2f7cde28c087b28104dc1fa',
        blocktime: 1627498638,
        category: 'receive',
        confirmations: 28631,
        time: 1627498638,
        timereceived: 1627498638,
        trusted: false,
        txid: '41045fd414a64c16552135e2a88d1f1af3f728f8fb2c2cf5dba3d75cf50ea6bb',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qt32rxqfgs6377epgz8qredxczdm0k6l6v4xnvl',
        amount: -341250,
        blockhash: '6c2f8897df37d7af0239e257aba4dd0621719eb874b7ebbc6f5c3abc0d0bc0d7',
        blocktime: 1627484301,
        category: 'send',
        confirmations: 28847,
        fee: -1.3131648302078247e-07,
        time: 1627484301,
        timereceived: 1627484301,
        trusted: false,
        txid: '95a49fd8a6b691d2b643b2159ab9114c2d8b7b035ce5c21251f7f5c17bad450c',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: -10499.999999868684,
        blockhash: '6c2f8897df37d7af0239e257aba4dd0621719eb874b7ebbc6f5c3abc0d0bc0d7',
        blocktime: 1627484301,
        category: 'send',
        confirmations: 28847,
        fee: -1.3131648302078247e-07,
        time: 1627484301,
        timereceived: 1627484301,
        trusted: false,
        txid: '95a49fd8a6b691d2b643b2159ab9114c2d8b7b035ce5c21251f7f5c17bad450c',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: 10499.999999868684,
        blockhash: '6c2f8897df37d7af0239e257aba4dd0621719eb874b7ebbc6f5c3abc0d0bc0d7',
        blocktime: 1627484301,
        category: 'receive',
        confirmations: 28847,
        time: 1627484301,
        timereceived: 1627484301,
        trusted: false,
        txid: '95a49fd8a6b691d2b643b2159ab9114c2d8b7b035ce5c21251f7f5c17bad450c',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: -351750,
        blockhash: '438ac5ca7641e8f4bcdc33a865a8d02813dd2029deb36b663048c011c966bdc0',
        blocktime: 1627084189,
        category: 'send',
        confirmations: 35475,
        fee: 0,
        time: 1627084189,
        timereceived: 1627084189,
        trusted: false,
        txid: '14915b0c191ae9b0aa4867a85542bf980388f55d9a70284a1957be59ce5b938f',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q6mzu3wtansmjnym3w90yfylkgwlm7ptzc4mk9g',
        amount: 351750,
        blockhash: '438ac5ca7641e8f4bcdc33a865a8d02813dd2029deb36b663048c011c966bdc0',
        blocktime: 1627084189,
        category: 'receive',
        confirmations: 35475,
        time: 1627084189,
        timereceived: 1627084189,
        trusted: false,
        txid: '14915b0c191ae9b0aa4867a85542bf980388f55d9a70284a1957be59ce5b938f',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q3tg70qczph6lpyjtjedkmmhlthmewrhedd9ca3',
        amount: 3000,
        blockhash: '18cab89950162cd961c9b91956af28b12ebeb6b7cd5f72eca7f8b7674c6eb262',
        blocktime: 1625872483,
        category: 'receive',
        confirmations: 55566,
        time: 1625872483,
        timereceived: 1625872483,
        trusted: false,
        txid: 'ce90cfd742840ee494c13e76e9c27471c71ce3cf4d89d0ab0bda6982be55073e',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qcjufd8astzhl96w38z0744kwc5v4ctxdv86ccy',
        amount: -297000,
        blockhash: '0650390053c793843ec72425d6486ab41abc5ef0d58dcc2e277d6361d99670dc',
        blocktime: 1625868582,
        category: 'send',
        confirmations: 55634,
        fee: -1.3131648302078247e-07,
        time: 1625868582,
        timereceived: 1625868582,
        trusted: false,
        txid: '97d829c56536f89e69e11cda7a6557a925f5f306c268367be8e4eff5b315baa7',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q3tg70qczph6lpyjtjedkmmhlthmewrhedd9ca3',
        amount: -2999.9999998686835,
        blockhash: '0650390053c793843ec72425d6486ab41abc5ef0d58dcc2e277d6361d99670dc',
        blocktime: 1625868582,
        category: 'send',
        confirmations: 55634,
        fee: -1.3131648302078247e-07,
        time: 1625868582,
        timereceived: 1625868582,
        trusted: false,
        txid: '97d829c56536f89e69e11cda7a6557a925f5f306c268367be8e4eff5b315baa7',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q3tg70qczph6lpyjtjedkmmhlthmewrhedd9ca3',
        amount: 2999.9999998686835,
        blockhash: '0650390053c793843ec72425d6486ab41abc5ef0d58dcc2e277d6361d99670dc',
        blocktime: 1625868582,
        category: 'receive',
        confirmations: 55634,
        time: 1625868582,
        timereceived: 1625868582,
        trusted: false,
        txid: '97d829c56536f89e69e11cda7a6557a925f5f306c268367be8e4eff5b315baa7',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1q3tg70qczph6lpyjtjedkmmhlthmewrhedd9ca3',
        amount: -300000,
        blockhash: '5719a12b576b69a9b9126354ec58c522a550b497e18d43ca2d8908ebd4ab552b',
        blocktime: 1625867792,
        category: 'send',
        confirmations: 55647,
        fee: 0,
        time: 1625867792,
        timereceived: 1625867792,
        trusted: false,
        txid: 'e09ebfaf4e89367bad7eb3517757373a20efe2910440f1d8c04dad1758897a18',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q3tg70qczph6lpyjtjedkmmhlthmewrhedd9ca3',
        amount: 300000,
        blockhash: '5719a12b576b69a9b9126354ec58c522a550b497e18d43ca2d8908ebd4ab552b',
        blocktime: 1625867792,
        category: 'receive',
        confirmations: 55647,
        time: 1625867792,
        timereceived: 1625867792,
        trusted: false,
        txid: 'e09ebfaf4e89367bad7eb3517757373a20efe2910440f1d8c04dad1758897a18',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qdlzm7llc749v8skfn3j8qnvd0wced6484lquam',
        amount: -499.9999998686835,
        blockhash: '6763264a16cc42a109d2526df77f4b45ac51a2eb608b0fbbdebbe3c6bb5ce7c0',
        blocktime: 1625866497,
        category: 'send',
        confirmations: 55671,
        fee: -1.3131648302078247e-07,
        time: 1625866497,
        timereceived: 1625866497,
        trusted: false,
        txid: '69be85fa295f48223aca54354510d8607b62906c4fcb2ac742b218c90d57cf2f',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qdlzm7llc749v8skfn3j8qnvd0wced6484lquam',
        amount: 499.9999998686835,
        blockhash: '6763264a16cc42a109d2526df77f4b45ac51a2eb608b0fbbdebbe3c6bb5ce7c0',
        blocktime: 1625866497,
        category: 'receive',
        confirmations: 55671,
        time: 1625866497,
        timereceived: 1625866497,
        trusted: false,
        txid: '69be85fa295f48223aca54354510d8607b62906c4fcb2ac742b218c90d57cf2f',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qt32rxqfgs6377epgz8qredxczdm0k6l6v4xnvl',
        amount: -100000,
        blockhash: '6763264a16cc42a109d2526df77f4b45ac51a2eb608b0fbbdebbe3c6bb5ce7c0',
        blocktime: 1625866497,
        category: 'send',
        confirmations: 55671,
        fee: -1.3131648302078247e-07,
        time: 1625866497,
        timereceived: 1625866497,
        trusted: false,
        txid: '69be85fa295f48223aca54354510d8607b62906c4fcb2ac742b218c90d57cf2f',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qnzwh7fuw6yrxyphn5r5fcutr5fnqueeh7penc0',
        amount: 98001,
        blockhash: '9cbcb3b6ca621f38de97302b60860d45053d44f566ffda7e9ec1f59d1ff2d650',
        blocktime: 1625160007,
        category: 'receive',
        confirmations: 67452,
        time: 1625160007,
        timereceived: 1625160007,
        trusted: false,
        txid: 'dce6702726788fdb3a268987bfdeb1e535cb4d9d86fcbfeb481614775ecd0b7f',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: '',
        address: 'pkt1qdlzm7llc749v8skfn3j8qnvd0wced6484lquam',
        amount: -100500,
        blockhash: '64f80ba7b983920a87281233bf8fb327f94e6308f41b84431a170af771891e10',
        blocktime: 1625159360,
        category: 'send',
        confirmations: 67463,
        fee: 0,
        time: 1625159360,
        timereceived: 1625159360,
        trusted: false,
        txid: 'a7e4fb05bdc0f5502bfe678f2328267d0707ba17c0f8855b4fe97e38cae4906f',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qdlzm7llc749v8skfn3j8qnvd0wced6484lquam',
        amount: 100500,
        blockhash: '64f80ba7b983920a87281233bf8fb327f94e6308f41b84431a170af771891e10',
        blocktime: 1625159360,
        category: 'receive',
        confirmations: 67463,
        time: 1625159360,
        timereceived: 1625159360,
        trusted: false,
        txid: 'a7e4fb05bdc0f5502bfe678f2328267d0707ba17c0f8855b4fe97e38cae4906f',
        vout: 1,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qy77um46gshvce9wtrkp5wxaza3ns9u3axa7dqf',
        amount: 34999.99999898486,
        blockhash: '893fb9785869bd7bf3683c43745a01e9a124889df1d82b8046de58464b926cb3',
        blocktime: 1624557393,
        category: 'receive',
        confirmations: 78038,
        time: 1624557393,
        timereceived: 1624557393,
        trusted: false,
        txid: '359170987de2e8b85f80865399e4ca53009f6458fb5ba92c2ef52f4898913651',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q3y4cutuguq4470v63v4ntwkl09ahwp3t696r4x',
        amount: 822.1662862449884,
        blockhash: '54e951fdfc0fb70c20f28c3a96b3946cf8f9a6e4f7b648a7f0b6f8041fd86706',
        blocktime: 1622556013,
        category: 'receive',
        confirmations: 111513,
        time: 1622556013,
        timereceived: 1622556013,
        trusted: false,
        txid: '83a3af37d41437df5f98948c15457778b1a9ac02e0eacb69b63a892bc20b63b8',
        vout: 0,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.00044208019971847534,
        blockhash: '2178d5a2c7601217c40e126292bfd526cb3826ef275bada1253ae1ff92468fc1',
        blocktime: 1622523255,
        category: 'generate',
        confirmations: 112082,
        generated: true,
        time: 1622523255,
        timereceived: 1622523255,
        trusted: false,
        txid: '561993dc12df754640f465ed4edeed18bf9442915c3ad54be80b4a98d5ed0e21',
        vout: 297,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0012589376419782639,
        blockhash: 'f1a3cc0a94d8e240279dc3c52c5fdb1d05fa2e67d8244a52f991ba02705ad4d9',
        blocktime: 1622523051,
        category: 'generate',
        confirmations: 112086,
        generated: true,
        time: 1622523051,
        timereceived: 1622523051,
        trusted: false,
        txid: '2e399d5c0535cee83f8368ef508c133af4f08417694828abcf8dd47407b93ea5',
        vout: 141,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0021874411031603813,
        blockhash: 'e0d1cb3452f949a2a30d4517f625ceea95dee9cafbc711c76089c62a8c18d846',
        blocktime: 1622522989,
        category: 'generate',
        confirmations: 112087,
        generated: true,
        time: 1622522989,
        timereceived: 1622522989,
        trusted: false,
        txid: '4e6635c7ff59a965850d66b258eb284b90e153aee332c31c6c49fc6f37d0c088',
        vout: 192,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0021874411031603813,
        blockhash: '32ee931775712b0d9bb33a52a6520144b70a5252a6463f14d08b9d6fa1f4f890',
        blocktime: 1622522930,
        category: 'generate',
        confirmations: 112088,
        generated: true,
        time: 1622522930,
        timereceived: 1622522930,
        trusted: false,
        txid: '1725dceb2a0c7e5349747699e8e0fc252cc66c3d47608cbff4ad0232a2637411',
        vout: 7,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.003951486200094223,
        blockhash: 'cbab9f13f5fb2a2641832428883dff8158992f1e2968f56da2d90bb07ed8ce16',
        blocktime: 1622522660,
        category: 'generate',
        confirmations: 112093,
        generated: true,
        time: 1622522660,
        timereceived: 1622522660,
        trusted: false,
        txid: 'a182037b56a57b717349c3e534d0e1e7c944a904a2e3cf139a452977b2ae6137',
        vout: 437,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.004725013859570026,
        blockhash: '0e28f39826bd7449c3d1282596927aed0394ea97c7cd8f6239f4ad29bd1910bf',
        blocktime: 1622522554,
        category: 'generate',
        confirmations: 112095,
        generated: true,
        time: 1622522554,
        timereceived: 1622522554,
        trusted: false,
        txid: '7b4579ad4e1356fafd7f4ce44de842499a0ed0bc32d91de2cb204873fb2da236',
        vout: 496,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '92cd6dfa3b995f832edaf91bbcdd0073b555c4e9afd528883a0ff3c31f5f5040',
        blocktime: 1622522503,
        category: 'generate',
        confirmations: 112096,
        generated: true,
        time: 1622522503,
        timereceived: 1622522503,
        trusted: false,
        txid: '2672f2da79623d655f850317780f1e4ae38c205b69c5b8023d6feb0202542e23',
        vout: 492,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '4d1482af8f028813dd717685ea218c4a09c9d4a8a0d6b556ba2ea58ede49ac0e',
        blocktime: 1622522460,
        category: 'generate',
        confirmations: 112097,
        generated: true,
        time: 1622522460,
        timereceived: 1622522460,
        trusted: false,
        txid: 'fdcf165b626062f9f6bbb7474552f0d7e67e63c9aca2f0f0e7f57f571d829290',
        vout: 437,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '020b9c285e01a49cfbe85732f54a341b27b9e856b519f7b46d133664810eff8b',
        blocktime: 1622522354,
        category: 'generate',
        confirmations: 112098,
        generated: true,
        time: 1622522354,
        timereceived: 1622522354,
        trusted: false,
        txid: '2d304202baea446c4fb0f4f87d491d9535e2b718e9f40e39060163a2fbb76151',
        vout: 373,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'e638d531dd64b00952cc244291bae3a872c92d0772da5d32941338604576f148',
        blocktime: 1622522235,
        category: 'generate',
        confirmations: 112100,
        generated: true,
        time: 1622522235,
        timereceived: 1622522235,
        trusted: false,
        txid: '9b789dea573b7c24312c4f61c479e6f547cb55b6e0fa2556b6d4a8fe2956afb1',
        vout: 137,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'e1e36d2cc5bb5b14682cf17f972726e4a707dc310d8aabae04376d181bec0f6e',
        blocktime: 1622522196,
        category: 'generate',
        confirmations: 112101,
        generated: true,
        time: 1622522196,
        timereceived: 1622522196,
        trusted: false,
        txid: '818e1bae79113ac678d82f4b09422069dc947f043bf8f937fb60b9ae612fcdd4',
        vout: 579,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'a012c0b0c431cca88247111a47fdb1f93c46045085d4f73b7ff738a3f694f37d',
        blocktime: 1622522160,
        category: 'generate',
        confirmations: 112102,
        generated: true,
        time: 1622522160,
        timereceived: 1622522160,
        trusted: false,
        txid: 'bdc8f73cd112b271ac1a7d0c37a9742a739847c3e8a68eb4a625b890c50d7fad',
        vout: 472,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'c1d5795429bf078a9d5657b8abc9092f1fb9c60e18f3b4ea04e4de1bc7b93eff',
        blocktime: 1622522057,
        category: 'generate',
        confirmations: 112104,
        generated: true,
        time: 1622522057,
        timereceived: 1622522057,
        trusted: false,
        txid: '7595d1c0776aea0e67c8200fff207801c13c85fe25a8887b008eae1ffc1a2828',
        vout: 43,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'cd464cbd76d024543bd89eec35d1a430432f899f64eb7e4a52fdaade7c72d95b',
        blocktime: 1622522023,
        category: 'generate',
        confirmations: 112105,
        generated: true,
        time: 1622522023,
        timereceived: 1622522023,
        trusted: false,
        txid: '1505aa313bc16ec28d286718bed00f99fac6421b774f69fc9b6578f8c5eb6c68',
        vout: 94,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '6a1a500854e2c1a0fbc4b21ae6bc53128e1cee09e05caf9d6ac7aafec303dd59',
        blocktime: 1622521999,
        category: 'generate',
        confirmations: 112106,
        generated: true,
        time: 1622521999,
        timereceived: 1622521999,
        trusted: false,
        txid: '26b8015e7ee7fb41da4de9fb8252a2712f295d4166b704b6274341773c0ace2e',
        vout: 515,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'deead5ea3a5203bd6a3944d6c1a40684978f0dbe7c897e41813dfb034913d84f',
        blocktime: 1622521879,
        category: 'generate',
        confirmations: 112107,
        generated: true,
        time: 1622521879,
        timereceived: 1622521879,
        trusted: false,
        txid: 'e81ab460fd0996f4ff0a92574b4bd4438af3d73e3ec8a0a47ae5449521e71954',
        vout: 625,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '43f116bdbb91fc5f4c85ed9525731a38ae36e97f1da4ffdd7e80c2f160db3de9',
        blocktime: 1622521727,
        category: 'generate',
        confirmations: 112110,
        generated: true,
        time: 1622521727,
        timereceived: 1622521727,
        trusted: false,
        txid: 'acc456a6c8cc6f8eb958ec92b5ea87fb452d6e1755228bb6d600048c89fdca0a',
        vout: 465,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '0ce6a66f158553870361438b31f9096a989aae1c5295070fad8f00c6fcc36b0c',
        blocktime: 1622521576,
        category: 'generate',
        confirmations: 112111,
        generated: true,
        time: 1622521576,
        timereceived: 1622521576,
        trusted: false,
        txid: '341a138af8bb1e9d75f487e56262e850f7c62e35c3eef7ae7400b3dd5b582a4e',
        vout: 528,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '67a6220597f220222c4774ca3a7c8cde393c4c268fae37ed5522f669e070b515',
        blocktime: 1622521394,
        category: 'generate',
        confirmations: 112115,
        generated: true,
        time: 1622521394,
        timereceived: 1622521394,
        trusted: false,
        txid: '69140d62fb7b07e3ab87284365860ae2153abcdfae30f49fb510585d1866ee20',
        vout: 52,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: 'b3cf1701f26c37657092a5d841cf909e2a5d04c4a9e645e675d82309bc012fdb',
        blocktime: 1622521127,
        category: 'generate',
        confirmations: 112118,
        generated: true,
        time: 1622521127,
        timereceived: 1622521127,
        trusted: false,
        txid: '2e11d7915fdd556f5978c287375355a4d3df62cc8606b7b4ef587de5146a1cc2',
        vout: 162,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '78857a11ce9f46ec5124033e29c135225a8aa81871db19b5464b04cee355b605',
        blocktime: 1622520781,
        category: 'generate',
        confirmations: 112124,
        generated: true,
        time: 1622520781,
        timereceived: 1622520781,
        trusted: false,
        txid: 'dda98d0e78b70d9e9cb9bd334c1d77d7ee8eb03fb6ab449a16fd048dcd2aa5b9',
        vout: 623,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '107dccf04c9c4280c892b81bffce4ab4dd46035ed2f74bc7b87177311cd5fda3',
        blocktime: 1622520736,
        category: 'generate',
        confirmations: 112125,
        generated: true,
        time: 1622520736,
        timereceived: 1622520736,
        trusted: false,
        txid: '45161a0718882d5eb2789ffda75c1ec3f1bda1a50f9bde336ac629521b2fedd0',
        vout: 601,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.005188252776861191,
        blockhash: '13925010c68be097f974e53a5b7335b022d037667d9a6e8a9354ddd944f631a1',
        blocktime: 1622520639,
        category: 'generate',
        confirmations: 112127,
        generated: true,
        time: 1622520639,
        timereceived: 1622520639,
        trusted: false,
        txid: '5bc5e387805c0be210f4c41d91a429cfb0520f18aeb75f4423547902b9f2514e',
        vout: 458,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.003467313013970852,
        blockhash: '2d72593e801c66b32094f0e34bdecd2983dede8c35c66c2ff51530ff6d96db01',
        blocktime: 1622520441,
        category: 'generate',
        confirmations: 112131,
        generated: true,
        time: 1622520441,
        timereceived: 1622520441,
        trusted: false,
        txid: 'b5a2530837f06ff0da351cd76527d6d00f294ed0fc3e584a8bd5a3557e1310f3',
        vout: 103,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0026595713570713997,
        blockhash: 'da9068d65a5a5805a87ea4334e110c36b6c0926ce7771ffd6c779675caadafad',
        blocktime: 1622520319,
        category: 'generate',
        confirmations: 112132,
        generated: true,
        time: 1622520319,
        timereceived: 1622520319,
        trusted: false,
        txid: '7b9f7a09609625e32004ca0cdc710e014ce56719d577814aa496134de2eb2050',
        vout: 584,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0026595713570713997,
        blockhash: '2cc111e8c20c41dde5087705aca7386a867b330e43177628540ce66d8a5e11de',
        blocktime: 1622520293,
        category: 'generate',
        confirmations: 112133,
        generated: true,
        time: 1622520293,
        timereceived: 1622520293,
        trusted: false,
        txid: '28a9c56e6f72cbbf58894bbc79d75211b3318def7d9003719f2a28e0e5d15953',
        vout: 445,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0026595713570713997,
        blockhash: '47233c477dfbd8ffa877aca855fc330c8985155cdd04d9a532d73f5e5d663955',
        blocktime: 1622520259,
        category: 'generate',
        confirmations: 112134,
        generated: true,
        time: 1622520259,
        timereceived: 1622520259,
        trusted: false,
        txid: 'aab879326de69fe70aecd0bed13eca39a388760950549d63200e5781f306965e',
        vout: 158,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
        amount: 0.0018444014713168144,
        blockhash: '070ad49c19fcb75d019cb0efcbd0b176dda514eeb77e69f70323d82a60b80906',
        blocktime: 1622520199,
        category: 'generate',
        confirmations: 112135,
        generated: true,
        time: 1622520199,
        timereceived: 1622520199,
        trusted: false,
        txid: 'abe319fbb381d1765397ecacf11506f8af1bbec116cf4374feb17c1cf4a173c0',
        vout: 432,
        walletconflicts: []
      },
      {
        abandoned: false,
        account: 'default',
        address: 'pkt1q3y4cutuguq4470v63v4ntwkl09ahwp3t696r4x',
        amount: 1371.343035692349,
        blockhash: 'ba0a1657c4226823c9a9edc19599310ce4076f184c26b27ee60c499fd7121ecb',
        blocktime: 1622468961,
        category: 'receive',
        confirmations: 113025,
        time: 1622468961,
        timereceived: 1622468961,
        trusted: false,
        txid: 'ea2b421f81327e68223e73b240ad54d33c0b735ebe99e75f7fc0b59df7901ce9',
        vout: 0,
        walletconflicts: []
      }
    ]
    return new Promise((resolve, reject) => {
      resolve(transactions.slice(offset, offset + numTransactions))
    }, 100)
  }

  async getTransaction (transactionId) {
    const transaction = {
      amount: 599.9999998686835,
      fee: 1.3131648302078247e-07,
      confirmations: 2936,
      blockhash: 'c3877f15eeeaf3aa6371d15e47890e89e36fbf49425b555d7a0bd0a6019d6472',
      blockindex: 0,
      blocktime: 1629036261,
      txid: '093e8ac60e197e12a50c52489c1ec163e55cbbcd40d208f0d89077ba4bbc5c1b',
      walletconflicts: [],
      time: 1629036261,
      timereceived: 1629036261,
      details: [
        {
          account: '',
          amount: -30300,
          category: 'send',
          fee: 1.3131648302078247e-07,
          vout: 0
        },
        {
          account: 'default',
          address: 'pkt1qp08pc8dmkuu8sz6txl0azm2cepwja9u6w8pj6z',
          amount: 599.9999998686835,
          category: 'receive',
          vout: 1
        }
      ],
      hex: '0100000001b82dce307016b6bbdbcd0854afc347c4fda74d3c37d9d584128a69c272d355c00000000000ffffffff0200000000011d0000160014705de0b6b51e917f95d71be0884c475eb42dabd973ffffff950000001600140bce1c1dbbb738780b4b37dfd16d58c85d2e979a00000000'
    }
    return new Promise((resolve, reject) => {
      resolve(transaction)
    }, 100)
  }

  /*
  // FIXME: this is the 'official' checking method, but returns false alwayys
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

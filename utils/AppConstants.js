// import 'dotenv/config'

const AppConstants = {
  DEVELOPER_MODE: process.env.DEVELOPER_MODE,
  PKT_TICKER_API_KEY: '',
  PIN_LENGTH: 4, // NOTE; this does not yet alter the length of the PIN login
  INLINE_ICON_HEIGHT: 24,
  PASSPHRASE_KEY: 'passphrase',
  CONTACT_LIST_KEY: 'contacts',
  BALANCE_VISIBILITY_KEY: 'balanceVisibility',
  AUTH_PAIRING_CODE: 'authPairingCode',
  LOGIN_PIN_KEY: 'loginPin',
  PKT_USD_SPOT_PRICE_KEY: 'pktUsdSpotPrice',
  TRANSACTION_NOTES_KEY: 'transactionNotes',
  PKT_ADDRESS_PREFIX: 'pkt',
  PKT_ADDRESS_LENGTH: 43,
  DEFAULT_CURRENCY_CODE: 'USD',
  MAIN_CRYPTO_CURRENCY_CODE: 'PKT',
  SUPPORTED_CURRENCIES: ['USD'],
  PKT_SPOT_PRICE_KEY_SUFFIX: 'SpotPrice',
  PKT_PRICE_HISTORY_KEY_SUFFIX: 'History',
  FALLBACK_LOCALE: 'en',
  DEFAULT_PKT_FIAT_VALUE: 0.02,
  PADDING_HORIZONTAL: 20,
  PADDING_VERTICAL: 16,
  DEFAULT_PADDING_PX: 20,
  PIN_LOGIN_TIMEOUT_S:60,
  PIN_LOGIN_TIMEOUT_KEY:'PIN_LOGIN_TIMEOUT_KEY',
  WALLET_HISTORY_BALANCE_KEY: 'walletBalanceHistory',
  NAVIGATION_STATE_KEY: 'NAVIGATION_STATE_KEY'
}

export default AppConstants

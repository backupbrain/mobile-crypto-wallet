import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AdaptiveStorage {
  static async isEncryptionAvailable () {
    let isEncryptionAvailable = false
    if (SecureStore !== undefined) {
      isEncryptionAvailable = await SecureStore.isAvailableAsync()
    }
    return isEncryptionAvailable
  }

  static async set (key, data) {
    const isEncrypted = await AdaptiveStorage.isEncryptionAvailable()
    if (isEncrypted) {
      await SecureStore.setItemAsync(key, JSON.stringify(data))
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(data))
    }
  }

  static async get (key, defaultValue) {
    const isEncrypted = await AdaptiveStorage.isEncryptionAvailable()
    if (isEncrypted) {
      const value = await SecureStore.getItemAsync(key)
      console.log('asyncStorage')
      console.log(value)
      if (value === undefined) {
        return defaultValue
      }
      return JSON.parse(value)
    } else {
      const value = await AsyncStorage.getItem(key)
      if (value === undefined) {
        return defaultValue
      }
      return JSON.parse(value)
    }
  }

  static async remove (key) {
    const isEncrypted = await AdaptiveStorage.isEncryptionAvailable()
    if (isEncrypted) {
      await SecureStore.deleteItemAsync(key)
      // await SecureStore.setItemAsync(key, '')
    } else {
      await AsyncStorage.removeItem(key)
      // await AsyncStorage.setItem(key, '')
    }
  }
}

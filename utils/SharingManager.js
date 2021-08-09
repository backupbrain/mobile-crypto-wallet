import { Share, Platform } from 'react-native'

export default class SharingManager {
  static hasSharing () {
    const platformOS = Platform.OS
    const mobilePlatforms = [
      'ios',
      'android'
    ]
    return mobilePlatforms.includes(platformOS)
  }

  static async share (message) {
    if (this.hasSharing()) {
      try {
        await Share.share({ message: message })
      } catch (error) {
        console.log('error sharing message')
      }
    }
  }
}

import { Clipboard, Platform } from 'react-native'

export default class ClipboardManager {
  static isMobile () {
    const platformOS = Platform.OS
    const mobilePlatforms = [
      'ios',
      'android'
    ]
    return mobilePlatforms.includes(platformOS)
  }

  static isWeb () {
    const platformOS = Platform.OS
    return platformOS === 'web'
  }

  static async set (data) {
    console.log(this.isWeb())
    console.log(`ClipboardManager.set('${data}')`)
    if (this.isWeb()) {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(data)
      } else {
        var textArea = document.createElement('textarea')
        textArea.value = data
        // Avoid scrolling to bottom
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.position = 'fixed'
        document.body.appendChild(textArea)
        textArea.focus()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    } else {
      await Clipboard.setString(data)
    }
  }

  static async get () {
    let data = null
    console.log(`${data} = ClipboardManager.get()`)
    if (this.isWeb()) {
      data = await navigator.clipboard.readText()
    } else {
      data = await Clipboard.getString(data)
    }
    return data
  }
}

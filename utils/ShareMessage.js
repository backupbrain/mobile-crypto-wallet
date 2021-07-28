import { Share } from 'react-native'

const shareMessage = async (message) => {
  try {
    await Share.share({ message: message })
  } catch (error) {
    console.log('error sharing message')
  }
}

export default shareMessage

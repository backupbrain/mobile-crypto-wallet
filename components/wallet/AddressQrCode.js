import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import QRCode from 'react-native-qrcode-generator'

const AddressQrCode = (props) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.qrCode}
        source={{
          uri: 'https://qr-creator.com/qr_image.php?data=pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk&size=4&colorcode=000000&errc=l&key=0jdue8fz'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    alignItems: 'center',
    borderRadius: '6px'
  },
  qrCode: {
    width: 200,
    height: 200
  }
})

export default AddressQrCode

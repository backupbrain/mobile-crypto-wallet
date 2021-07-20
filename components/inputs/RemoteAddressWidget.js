import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'
import AppConstants from '../../utils/AppConstants'

const RemoteAddressWidget = (props) => {
  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.object}>
        <Text style={styles.placeholder}>{props.placeholder}</Text>
        <View style={styles.buttons}>
          {props.onPersonIconPress &&
            <TouchableOpacity
              style={styles.buttonMiddle}
              onPress={() => {
                if (props.onQrCodePress) {
                  props.onPersonIconPress()
                }
              }}
            >
              <PersonIcon
                height={AppConstants.INLINE_ICON_HEIGHT}
                width={AppConstants.INLINE_ICON_WIDTH}
              />
            </TouchableOpacity>}
          {props.onQrCodePress &&
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => {
                if (props.onQrCodePress) {
                  props.onQrCodePress()
                }
              }}
            >
              <ScanQrCodeIcon
                height={AppConstants.INLINE_ICON_HEIGHT}
                width={AppConstants.INLINE_ICON_WIDTH}
              />
            </TouchableOpacity>}
        </View>
      </View>
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: '16px'
  },
  object: {
    backgroundColor: '#F1F2F4',
    borderRadius: 6,
    color: '#424A52',
    width: '100%',
    flexDirection: 'row',
    border: '1px solid #f00'
  },
  placeholder: {
    color: '#666',
    paddingLeft: '20px',
    paddingRight: '0px',
    paddingVertical: '16px',
    flexGrow: 1
  },
  buttons: {
    justifyContent: 'flex-end',
    flexShrink: 1,
    flexDirection: 'row',
    paddingLeft: '10px',
    border: '1px solid #00f'
  },
  buttonMiddle: {
    border: '1px solid #0c0',
    paddingRight: '8px',
    paddingLeft: '10px',
    height: '100%',
    justifyContent: 'center'
  },
  buttonRight: {
    border: '1px solid #0c0',
    paddingRight: '20px',
    paddingLeft: '8px',
    height: '100%',
    justifyContent: 'center'
  },
  label: {
    paddingBottmarginBom: '10px'
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default RemoteAddressWidget

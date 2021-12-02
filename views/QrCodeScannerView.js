import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  // DevSettings
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// import { NativeModules } from 'react-native';
// const { DevSettings } = NativeModules;

// import RNRestart from 'react-native-restart'
// import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

import { Camera } from 'expo-camera'
// import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

const BarcodeScannnerScreen = ({ route }) => {
  const [ratio, setRatio] = useState('4:3')
  const [imagePadding, setImagePadding] = useState(0)
  const [camera, setCamera] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [didScan, setDidScan] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [isCameraReady, setIsCameraReady] = useState(false)

  const { height, width } = Dimensions.get('window')
  const screenRatio = height / width
  const maskRowHeight = Math.round((height - 300) / 20)
  const maskColWidth = (width - 300) / 2
  const [isRatioSet, setIsRatioSet] = useState(false)
  const [inCameraMode, setInCameraMode] = useState(false)

  /*
  const [cameraInfo, setCameraInfo] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  })
  */
  // const [photo, setPhoto] = useState(null)
  const navigation = useNavigation()

  /*
  const goToCameraPage = (barcode) => {
    navigation.navigate('Camera', {
      barcode: barcode,
    })
    setBarcode('')
  }
  */

  const resetScanner = () => {
    setDidScan(false)
    setInCameraMode(false)
  }

  const switchToCamera = () => {
    console.log('switching to camera')
    setInCameraMode(true)
    navigation.setOptions({
      title: 'Scan QR Code'
    })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    // setDidScan(true);
    if (!inCameraMode) {
      setBarcode(data)
      setDidScan(false)
      switchToCamera()
      // goToCameraPage(data)
    }
  }

  const switchToBarcodeScanner = () => {
    setInCameraMode(false)
    navigation.setOptions({
      title: 'Scan QR Code'
    })
  }

  const prepareRatio = async () => {
    let desiredRatio = '4:3'
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync()

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const distances = {}
      const realRatios = {}
      let minDistance = null
      for (const ratio of ratios) {
        const parts = ratio.split(':')
        const realRatio = parseInt(parts[0]) / parseInt(parts[1])
        realRatios[ratio] = realRatio
        const distance = screenRatio - realRatio // ratio can't be taller than screen
        distances[ratio] = realRatio
        if (minDistance == null) {
          minDistance = ratio
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio
          }
        }
      }
      desiredRatio = minDistance
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      )
      setImagePadding(remainder / 2)
      setRatio(desiredRatio)
      setIsRatioSet(true)
    }
  }

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio()
    }
    setIsCameraReady(true)
  }

  useEffect(() => {
    const maybeResetScanner = () => {
      if (route.params?.reset) {
        console.log('resetting')
        resetScanner()
        // DevSettings.reload()
      }
    }
    async function getCameraStatus () {
      // You can await here
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setHasCameraPermission(status === 'granted')
      /*
      setHasCameraPermission((prevState) => ({
        ...prevState,
        hasCameraPermission: status === 'granted',
      }));
      /* */
    }
    if (!hasCameraPermission) {
      getCameraStatus()
    }
    maybeResetScanner()
  }, [route, hasCameraPermission]) // Or [] if effect doesn't need props or state

  const takePicture = async () => {
    console.log('taking picture')
    if (hasCameraPermission) {
      const imageData = await camera.takePictureAsync({
        skipProcessing: true,
        base64: true
      })
      // setPhoto(imageData)
      goToSendPkt(imageData)
    }
  }

  const goToSendPkt = (imageData) => {
    switchToBarcodeScanner()
    navigation.navigate('Wallet Home')
  }

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: '#000'
            }}
          >
            <Camera
              onBarCodeScanned={didScan ? undefined : handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject]}
              onCameraReady={setCameraReady}
              onFaceDetected={null}
              onTextRecognized={null}
              ref={(ref) => {
                setCamera(ref)
              }}
              ratio={ratio}
            />
            <View style={styles.maskOuter}>
              <View
                style={[
                  { flex: maskRowHeight },
                  styles.maskRow,
                  styles.maskFrame
                ]}
              />
              <View style={[{ flex: 30 }, styles.maskCenter]}>
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                <View style={styles.maskInner} />
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              </View>
              <View
                style={[
                  { flex: maskRowHeight },
                  styles.maskRow,
                  styles.maskFrame
                ]}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              />
            </View>
            <View style={{ height: imagePadding, backgroundColor: '#000' }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  information: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 30,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  manualInputContainer: {
    flexDirection: 'row'
  },
  barcodeButton: {
    fontSize: 18
  },
  barcodeInput: {
    padding: 8,
    backgroundColor: '#fff',
    fontSize: 18,
    textAlign: 'left',
    flexGrow: 1
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)'
  },
  maskRow: {
    width: '100%'
  },
  maskCenter: { flexDirection: 'row' }
})

export default BarcodeScannnerScreen

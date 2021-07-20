import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveButton from '../../components/buttons/ActiveButton'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import PktAddressInput from '../../components/inputs/PktAddressInput'

const EditContactView = ({ navigation, route }) => {
  const allowDelete = true
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.screenPadding}>
          <View style={styles.formContainer}>
            <GenericTextInput
              placeholder='Address name'
            />
            <PktAddressInput
              placeholder='PKT Address'
              help='0 characters remaining'
              navigation={navigation}
            />
          </View>
          <ActiveButton
            title='Save Address'
          />
          {allowDelete &&
            <ActiveButton
              title='Delete Address'
              variant='danger'
            />}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    marginBottom: '5px'
  },
  screenPadding: {
    width: '100%',
    paddingHorizontal: '20px'
  }
})

export default EditContactView

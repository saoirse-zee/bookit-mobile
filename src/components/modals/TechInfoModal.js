import React from 'react'
import { View, StyleSheet } from 'react-native'
import ModalContent from './ModalContent'
import { LabelText, MonoText } from '../StyledText'

const TechInfoModal = ({
  modalProps,
  onOkayPress,
}) => (
  <ModalContent
    title="Technical info"
    onOkayPress={onOkayPress}
  >
    <View style={styles.section}>
      <LabelText>Bookit API</LabelText>
      <MonoText>{ modalProps.bookitApiBaseUrl || 'Url has not been set.' }</MonoText>
    </View>
    <View style={styles.section}>
      <LabelText>Nonce</LabelText>
      <MonoText>{ modalProps.nonce || 'Nonce has not been set.' }</MonoText>
    </View>
  </ModalContent>
)

export default TechInfoModal

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  label: {
    color: '#555555',
    width: 60,
  },
})

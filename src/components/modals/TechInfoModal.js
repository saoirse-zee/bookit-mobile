import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import ModalContent from './ModalContent'
import { LabelText, MonoText } from '../StyledText'
import config from '../../../config.json'

const TechInfoModal = ({ onOkayPress }) => (
  <ModalContent
    title="Technical info"
    onOkayPress={onOkayPress}
  >
    <View style={styles.section}>
      <LabelText>Bookit API</LabelText>
      <MonoText>{ config.bookitApiBaseUrl }</MonoText>
    </View>
    <View style={styles.section}>
      <LabelText>Nonce</LabelText>
      <MonoText>{ config.nonce || 'Nonce has not been set.' }</MonoText>
    </View>
    <View style={styles.section}>
      <LabelText>Session ID</LabelText>
      <MonoText>{ Constants.sessionId }</MonoText>
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

import { DismissKeyboardView } from '@/components'
import { Colors, Fonts } from '@/constants'
import { Button, Typography } from '@/ui'
import React from 'react'
import { Animated, KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomTooltip } from '../ToolTip'
import { styles } from './styles'

export const FormWrapper = ({
  children,
  title = '',
  description = '',
  onContinue,
  disabledContinueBtn = false,
  loading = false,
  buttonTitle = 'Далее',
  error,
  showTooltip,
  tooltipTitle,
  tooltipMessage,
  style,
  scrollViewStyle,
  textBelowButtons,
}: any) => {
  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <Animated.ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.container, scrollViewStyle]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            style={[styles.content, style]}
          >
            <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
              <Typography.TitleText style={[styles.text, { fontFamily: Fonts.openSansBold }]} size={38}>
                {title}
              </Typography.TitleText>
              {description ? (
                <Typography.Default size={15} mt={24} style={styles.text}>
                  {description}
                </Typography.Default>
              ) : null}
            </View>
            <View>{children}</View>
            <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
              {showTooltip && (
                <CustomTooltip message={tooltipMessage}>
                  <Typography.Default
                    color={'#767575'}
                    mb={16}
                    style={[styles.text, { textDecorationLine: 'underline' }]}
                  >
                    {tooltipTitle}
                  </Typography.Default>
                </CustomTooltip>
              )}
              {textBelowButtons ? (
                <Typography.Default
                  color={'#767575'}
                  mb={16}
                  style={[styles.text, { textDecorationLine: 'underline' }]}
                >
                  {textBelowButtons}
                </Typography.Default>
              ) : null}
              <Button
                buttonStyle={{ marginBottom: 5 }}
                disabled={disabledContinueBtn}
                loading={loading}
                onPress={onContinue}
              >
                {buttonTitle}
              </Button>
              {error ? (
                <Typography.Description style={{ alignSelf: 'center' }} color={Colors.error} textAlign={'center'}>
                  {error}
                </Typography.Description>
              ) : null}
            </View>
          </KeyboardAvoidingView>
        </Animated.ScrollView>
      </SafeAreaView>
    </DismissKeyboardView>
  )
}

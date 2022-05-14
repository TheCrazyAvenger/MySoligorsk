import { DismissKeyboardView } from '@/components'
import { Colors, Fonts } from '@/constants'
import { Button, Typography } from '@/ui'
import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
}: any) => {
  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            style={styles.content}
          >
            <View>
              <Typography.TitleText lineH={50.73} style={[styles.text, { fontFamily: Fonts.openSansBold }]} size={38}>
                {title}
              </Typography.TitleText>
              {description ? (
                <Typography.Default size={15} mt={24} style={styles.text}>
                  {description}
                </Typography.Default>
              ) : null}
            </View>
            <View style={{ paddingVertical: 122 }}>{children}</View>
            <View>
              <Button disabled={disabledContinueBtn} loading={loading} onPress={onContinue}>
                {buttonTitle}
              </Button>
              {error ? (
                <Typography.Description
                  style={{ position: 'absolute', bottom: -22, alignSelf: 'center' }}
                  color={Colors.error}
                  textAlign={'center'}
                >
                  {error}
                </Typography.Description>
              ) : null}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </DismissKeyboardView>
  )
}

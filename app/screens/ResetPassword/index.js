import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {Header, SafeAreaView, Icon, TextInput, Button, Text} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {validateEmail} from '@utils';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default function ResetPassword({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');

  const onReset = async () => {
    if (!validateEmail(email)) {
      Alert.alert('', t('invalid_email'), [{text: 'Aceptar'}]);
    } else {
      await usersRepository.resetPassword(email);
      Alert.alert('', t('check_your_mail_inbox'), [
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ]);
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  return (
    <ImageBackground source={Images.backgroundLogin} style={BaseStyle.backgroundImage}>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderLeft={() => {
            return <Icon name="angle-left" size={28} />;
          }}
          onPressLeft={() => navigation.goBack()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <Text title1 semibold primaryColor style={{marginBottom: 80}}>
              {t('recover_password')}
            </Text>
            <Text body1 whiteColor style={{paddingBottom: 40}}>
              {t('enter_your_email')}.
            </Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={t('email')}
              value={email}
              selectionColor={colors.primary}
            />
            <Button
              style={{marginTop: 20}}
              full
              onPress={() => {
                onReset();
              }}
              upperFont>
              {t('send')}
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

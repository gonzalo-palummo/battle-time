import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {Header, SafeAreaView, Icon, Button, TextInput, Text, Loading} from '@components';
import {useTranslation} from 'react-i18next';
import {validateEmail} from '@utils';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [success, setSuccess] = useState({
    email: true,
    password: true,
    repassword: true,
  });
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = async () => {
    if (validateEmail(email) && password !== '' && repassword !== '') {
      setSuccess({
        email: true,
        password: true,
        repassword: true,
      });
      if (password === repassword) {
        const DTO = {
          email,
          password,
        };
        await usersRepository.signUp(DTO);
        Alert.alert(t('account_created_success'), t('check_your_mail_inbox'), [
          {text: 'Aceptar', onPress: () => navigation.goBack()},
        ]);
      } else {
        Alert.alert('', t('passwords_not_match'), [{text: 'Aceptar'}]);
      }
    } else {
      setSuccess({
        email: validateEmail(email),
        password: password !== '',
        repassword: repassword !== '',
      });
    }
  };

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
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <Text title1 semibold primaryColor style={{marginBottom: 80}}>
              {t('sign_up')}
            </Text>
            {[
              ['email', 'email', setEmail, email, 50],
              ['password', 'password', setPassword, password, 30],
              ['repeat_password', 'repassword', setRepassword, repassword, 30],
            ].map(input => {
              return (
                <TextInput
                  onChangeText={text => input[2](text)}
                  placeholder={t(input[0])}
                  secureTextEntry={input[1] === 'password' || input[1] === 'repassword'}
                  success={success[input[1]]}
                  value={input[3]}
                  maxLength={input[4]}
                  style={{marginTop: 12}}
                  key={input[0]}
                />
              );
            })}
            <View style={{paddingVertical: 30}}>
              <Button full upperFont onPress={sendData}>
                {t('send')}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Loading />
      </SafeAreaView>
    </ImageBackground>
  );
}

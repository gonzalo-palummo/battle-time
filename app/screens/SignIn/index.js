import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import jwtDecode from 'jwt-decode';

const authRepository = RepositoryFactory.get('auth');

export default function SignIn({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123123');
  const [success, setSuccess] = useState({email: true, password: true});

  const onLogin = async () => {
    if (email === '' || password === '') {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      const DTO = {
        email,
        password,
      };
      const token = await authRepository.signIn(DTO);
      const profileConfigured = !!jwtDecode(token).profile;
      dispatch(
        AuthActions.login({
          token: token,
          id: jwtDecode(token).id,
          profileConfigured: profileConfigured,
        }),
      );
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
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <Text title1 semibold primaryColor style={{marginBottom: 80}}>
              {t('join')}
            </Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
              placeholder={t('email')}
              success={success.email}
              value={email}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('password')}
              secureTextEntry={true}
              success={success.password}
              value={password}
              maxLength={30}
            />
            <Button
              style={{marginTop: 20}}
              full
              onPress={() => {
                onLogin();
              }}
              upperFont>
              {t('join')}
            </Button>
            <View style={styles.bottomTexts}>
              <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text
                  body1
                  semibold
                  whiteColor
                  style={{marginTop: 30, marginBottom: 15}}>
                  {t('forgot_your_password')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text body1 semibold whiteColor>
                  {t('create_account')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

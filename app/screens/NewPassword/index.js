import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, View, Alert} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Text, Button, Icon, Loading, TextInput} from '@components';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default function NewPassword({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [reNewPassword, setReNewPassword] = useState(null);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = async () => {
    if (password && newPassword && reNewPassword) {
      if (password.length >= 6 && newPassword.length >= 6 && reNewPassword.length >= 6) {
        if (newPassword === reNewPassword) {
          await usersRepository.newPassword(password, newPassword);
          Alert.alert('', t('password_changed_success'), [
            {
              text: 'Aceptar',
              onPress: () => {
                navigation.navigate('Profile');
              },
            },
          ]);
        } else {
          Alert.alert('', t('passwords_not_match'), [{text: 'Aceptar'}]);
        }
      } else {
        Alert.alert('', t('password_min_6_characters'), [{text: 'Aceptar'}]);
      }
    } else {
      Alert.alert('', t('complete_required_fields'), [{text: 'Aceptar'}]);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderLeft={() => {
            return <Icon name="angle-left" size={28} />;
          }}
          onPressLeft={() => navigation.goBack()}
          blackTheme
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView>
            <Text title1 semibold primaryColor style={styles.headerTitle}>
              {t('new_password')}
            </Text>
            <View style={{padding: 20}}>
              {[
                ['current_password', 'password', setPassword, password],
                ['new_password', 'newPassword', setNewPassword, newPassword],
                [
                  'repeat_new_password',
                  'reNewPassword',
                  setReNewPassword,
                  reNewPassword,
                ],
              ].map(input => {
                return (
                  <React.Fragment key={input[0]}>
                    <Text style={{marginTop: 20}} semibold body2>
                      {t(input[0])}
                    </Text>
                    <TextInput
                      onChangeText={text => input[2](text)}
                      secureTextEntry
                      value={input[3]}
                      maxLength={30}
                      style={{marginTop: 12}}
                      grayStyle
                    />
                  </React.Fragment>
                );
              })}
              <Button upperFont full onPress={sendData} style={{marginTop: 40}}>
                {t('confirm')}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </>
  );
}

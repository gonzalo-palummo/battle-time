import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, BaseColor, useTheme, Images} from '@config';
import {Header, SafeAreaView, Button, Icon} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import jwtDecode from 'jwt-decode';

const authRepository = RepositoryFactory.get('auth');

export default function PreSignIn({navigation}) {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signInWithGoogle = async () => {
    let tokens;
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      tokens = await GoogleSignin.getTokens();
    } catch (error) {
      console.log('ERROR GOOGLE LOGIN: ', error);
    }
    const accessToken = tokens.accessToken;
    const apiToken = await authRepository.getTokenWithGoogle(accessToken);
    auth(apiToken);
  };

  const signInWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(async data => {
            const accessToken = data.accessToken.toString();
            // GET TOKEN INFO: https://graph.facebook.com/me/?access_token=
            const apiToken = await authRepository.getTokenWithFacebook(accessToken);
            auth(apiToken);
          });
        }
      },
      function(error) {
        console.log('ERROR FACEBOOK LOGIN: ', error);
      },
    );
  };

  const auth = token => {
    const profileConfigured = !!jwtDecode(token).profile;
    dispatch(
      AuthActions.login({
        token: token,
        id: jwtDecode(token).id,
        profileConfigured: profileConfigured,
      }),
    );
  };

  return (
    <ImageBackground source={Images.backgroundLogin} style={BaseStyle.backgroundImage}>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <ScrollView contentContainerStyle={styles.contain}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Images.appLogo} />
          </View>
          <Button
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            full
            style={{marginVertical: 10}}
            upperFont>
            Regístrate
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            styleText={{color: colors.primary}}
            full
            outline
            style={{marginVertical: 10}}
            upperFont>
            Ingresar
          </Button>
          <View style={styles.imageButtons}>
            <TouchableOpacity
              onPress={signInWithFacebook}
              style={[
                styles.containerImageButton,
                {backgroundColor: BaseColor.facebookBlue},
              ]}>
              <Icon name="facebook-f" size={50} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithGoogle}
              style={styles.containerImageButton}>
              <Image
                source={require('@assets/images/google-logo.png')}
                style={styles.imageButton}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

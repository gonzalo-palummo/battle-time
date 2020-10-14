import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Image,
  Loading,
} from '@components';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkAuth} from '@repositories/Repository';
const usersRepository = RepositoryFactory.get('users');

export default function ConfigProfile({navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [nickname, setNickname] = useState('');
  const [profileSelected, setProfileSelected] = useState(null);

  const [profiles] = useState([
    {
      id: 1,
      name: 'Freestyler',
      image: Images.rapper1,
    },
    {
      id: 2,
      name: 'Competidor',
      image: Images.rapper2,
    },
    {
      id: 3,
      name: 'Jurado',
      image: Images.rapper3,
    },
    {
      id: 4,
      name: 'Organizador',
      image: Images.rapper4,
    },
    {
      id: 5,
      name: 'Social',
      image: Images.rapper5,
    },
    {
      id: 6,
      name: 'Todos',
      image: Images.rapper7,
    },
  ]);

  const onSubmit = async () => {
    if (nickname === '') {
      Alert.alert('Ups!', 'No has ingresado tu nickname');
    } else if (profileSelected === null) {
      Alert.alert('Ups!', 'No has seleccionado un rol');
    } else {
      const DTO = {
        nickname,
        profile_id: profileSelected,
      };
      await usersRepository.edit(DTO);
      dispatch(AuthActions.configProfile());
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <ImageBackground source={Images.backgroundLogin} style={BaseStyle.backgroundImage}>
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
          <Header title="Configurar perfil" />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            keyboardVerticalOffset={offsetKeyboard}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.contain}>
              <Text semibold primaryColor title2 style={{marginVertical: 20}}>
                Ingresa tu nickname
              </Text>
              <TextInput
                onChangeText={text => setNickname(text)}
                placeholder="Nickname"
                value={nickname}
              />
              <Text semibold primaryColor title2 style={{marginVertical: 20}}>
                Elige tu rol
              </Text>
              {profiles.map(profile => {
                return (
                  <TouchableOpacity
                    key={profile.id}
                    style={[
                      styles.profile,
                      profileSelected === profile.id && styles.profileSelected,
                    ]}
                    onPress={() => setProfileSelected(profile.id)}>
                    <Text semibold headline style={styles.profileText}>
                      {profile.name}
                    </Text>
                    <Image source={profile.image} style={styles.profileImage} />
                  </TouchableOpacity>
                );
              })}
              <Button
                style={{marginTop: 20}}
                full
                onPress={() => {
                  onSubmit();
                }}
                upperFont>
                Enviar
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
      <Loading />
    </>
  );
}

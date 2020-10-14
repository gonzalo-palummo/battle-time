import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Text, Button, TextInput, Icon, Loading} from '@components';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import ImagePicker from 'react-native-image-picker';
import {AuthActions} from '@actions';
const usersRepository = RepositoryFactory.get('users');

export default function EditProfile({navigation}) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const userData = useSelector(state => state.auth.userData);
  const [name, setName] = useState(userData.name);
  const [lastName, setLastName] = useState(userData.lastName);
  const [nickname, setNickname] = useState(userData.nickname);
  const [biography, setBiography] = useState(userData.biography);
  const [profileSelected, setProfileSelected] = useState(userData.profile.id);
  const [profileList, setProfileList] = useState([
    {
      id: 1,
      name: 'Freestyler',
    },
    {
      id: 2,
      name: 'Competidor',
    },
    {
      id: 3,
      name: 'Jurado',
    },
    {
      id: 4,
      name: 'Organizador',
    },
    {
      id: 5,
      name: 'Social',
    },
    {
      id: 6,
      name: 'Todos',
    },
  ]);
  const [currentImage, setCurrentImage] = useState(userData.avatar);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = async () => {
    const DTO = {
      name,
      lastname: lastName,
      nickname,
      biography,
      profile_id: profileSelected,
    };

    const updatedUserData = await usersRepository.edit(DTO);
    dispatch(AuthActions.setUserData(updatedUserData));
  };

  const options = {
    title: 'Seleccionar foto',
    takePhotoButtonTitle: 'Toma una foto',
    chooseFromLibraryButtonTitle: 'Selecciona de la galería',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleChangeImage = () => {
    ImagePicker.showImagePicker(options, async response => {
      if (!response.didCancel && !response.error) {
        const source = response.uri;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const urlAvatar = await usersRepository.editAvatar(source, response.type);
        const userDataCopy = JSON.parse(JSON.stringify(userData));
        userDataCopy.avatar = urlAvatar;
        dispatch(AuthActions.setUserData(userDataCopy));
        setCurrentImage(source);
      }
    });
  };

  return (
    <>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderLeft={() => {
            return <Icon name="bars" size={28} />;
          }}
          onPressLeft={() => navigation.openDrawer()}
          blackTheme
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView>
            <Text title1 semibold primaryColor style={styles.headerTitle}>
              {t('edit_profile')}
            </Text>
            <View style={{padding: 20}}>
              {userData.id === null ? (
                <View style={{alignItems: 'center'}}>
                  <Text>{t('the_information_could_not_be_obtained')}</Text>
                </View>
              ) : (
                <>
                  <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: currentImage}} />
                    <TouchableOpacity onPress={handleChangeImage}>
                      <Text body2 semibold>
                        {t('change_profile_image')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {[
                    ['first_name', 'name', setName, name],
                    ['last_name', 'lastName', setLastName, lastName],
                    ['biography', 'biography', setBiography, biography],
                    ['nickname', 'nickname', setNickname, nickname],
                  ].map(input => {
                    return (
                      <React.Fragment key={input[0]}>
                        <Text style={{marginTop: 20}} semibold body2>
                          {t(input[0])}
                        </Text>
                        <TextInput
                          placeholder={t(input[0])}
                          onChangeText={text => input[2](text)}
                          value={input[3]}
                          style={styles.input}
                          multiline={input[0] === 'biography'}
                          grayStyle
                        />
                      </React.Fragment>
                    );
                  })}
                  <Text style={{marginTop: 20}} semibold body2>
                    {t('role')}
                  </Text>
                  <Picker
                    selectedValue={profileSelected}
                    onValueChange={profileId => setProfileSelected(profileId)}>
                    {profileList.map(profile => (
                      <Picker.Item
                        label={profile.name}
                        value={profile.id}
                        key={profile.id}
                      />
                    ))}
                  </Picker>
                  <Button upperFont full onPress={sendData} style={{marginTop: 40}}>
                    {t('confirm')}
                  </Button>
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </>
  );
}

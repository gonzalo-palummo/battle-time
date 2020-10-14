import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Text, Button, Icon, Loading} from '@components';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {AuthActions} from '@actions';

const usersRepository = RepositoryFactory.get('users');

export default function MyAccount({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [countrySelected, setCountrySelected] = useState(userData.country.id);
  const [countryList, setCountryList] = useState([]);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = async () => {
    const DTO = {
      country_id: countrySelected,
    };

    const updatedUserData = await usersRepository.edit(DTO);
    dispatch(AuthActions.setUserData(updatedUserData));
  };

  useEffect(() => {
    async function fetchCountries() {
      //setCountryList(await countriesRepository.getProfiles());
      setCountryList([
        {id: 999, name: 'N/N'},
        {id: 1, name: 'Argentina'},
        {id: 2, name: 'Chile'},
      ]);
    }
    fetchCountries();
  }, []);

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
              {t('my_account')}
            </Text>
            <View style={{padding: 20}}>
              {userData.id === null ? (
                <View style={{alignItems: 'center'}}>
                  <Text>{t('the_information_could_not_be_obtained')}</Text>
                </View>
              ) : (
                <>
                  <Text style={{marginTop: 20}} semibold body2>
                    {t('country')}
                  </Text>
                  <Picker
                    selectedValue={countrySelected}
                    onValueChange={countryId => setCountrySelected(countryId)}>
                    {countryList.map(country => (
                      <Picker.Item
                        label={country.name}
                        value={country.id}
                        key={country.id}
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

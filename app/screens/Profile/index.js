import React, {useState, useEffect} from 'react';
import {View, ScrollView, ImageBackground, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AuthActions, ApplicationActions} from '@actions';
import {BaseStyle, useTheme, Images} from '@config';
import {SafeAreaView, Text, Loading, Icon, Header} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {getCategoryColor} from '@utils';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
const usersRepository = RepositoryFactory.get('users');

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  console.log('userData: ', userData);

  useEffect(() => {
    dispatch(ApplicationActions.resetLoading());
  }, []);

  return (
    <>
      <ImageBackground source={{uri: userData.avatar}} style={styles.backgroundImage}>
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
          <Header
            title=""
            renderLeft={() => {
              return <Icon name="bars" size={28} />;
            }}
            onPressLeft={() => navigation.openDrawer()}
            blackTheme
          />
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
            <View style={styles.profileMain}>
              {userData.id === null ? (
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginVertical: 20}}>
                    {t('the_information_could_not_be_obtained')}
                  </Text>
                </View>
              ) : (
                <>
                  <View style={styles.profileMainTop}>
                    <View style={styles.profileMainTopLeft}>
                      <Text title3 semibold>
                        {userData.nickname}
                      </Text>
                      <Text body2 semibold primaryColor>
                        {userData.profile.name}
                      </Text>
                      <Text body2 semibold grayColor style={{marginTop: 5}}>
                        {userData.biography}
                      </Text>
                    </View>
                    <View style={styles.profileMainTopRight}>
                      <View style={{alignItems: 'center'}}>
                        <Icon
                          name="fire"
                          size={50}
                          color={getCategoryColor(userData.points)}
                        />
                        <Text
                          style={[
                            styles.levelName,
                            {backgroundColor: getCategoryColor(userData.points)},
                          ]}
                          semibold>
                          {userData.level.name}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.statistics}>
                    <View style={{alignItems: 'center'}}>
                      <Text bold>{userData.battleViews}</Text>
                      <Text>{t('views')}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text bold>{userData.won}</Text>
                      <Text>{t('won')}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text bold>{userData.losses}</Text>
                      <Text>{t('losses')}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text bold>{userData.trophies.length}</Text>
                      <Text>{t('trophies')}</Text>
                    </View>
                  </View>
                  {userData.trophies.length ? (
                    <>
                      <Text semibold body1>
                        {t('trophies')}
                      </Text>
                      <View style={styles.trophies}>
                        {userData.trophies.map(trophy => (
                          <Image
                            style={styles.trophy}
                            key={trophy.id}
                            source={{uri: trophy.image}}
                          />
                        ))}
                      </View>
                    </>
                  ) : null}
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      <Loading />
    </>
  );
}

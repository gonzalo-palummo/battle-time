import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Header,
  Loading,
  RecentTournaments,
  AvailableTournaments,
  Text,
} from '@components';
import {BaseStyle, Images} from '@config';
import styles from './styles';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {ScrollView, RefreshControl, Image, View} from 'react-native';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const tournamentsRepository = RepositoryFactory.get('tournaments');

export default function Tournaments({navigation}) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [recentTournaments, setRecentTournaments] = useState(null);
  const [availableTournaments, setAvailableTournaments] = useState(null);

  const fetchRecentTournaments = async () => {
    setRecentTournaments(await tournamentsRepository.getRecent());
  };

  const fetchAvailableTournaments = async () => {
    setAvailableTournaments(await tournamentsRepository.getAvailable());
  };

  useEffect(() => {
    dispatch(ApplicationActions.resetLoading());
    fetchRecentTournaments();

    navigation.addListener('focus', () => {
      fetchAvailableTournaments();
    });
  }, []);

  return (
    <>
      {/*<Header title={t('tournaments')} />
      <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{top: 'always'}}>
        <ScrollView
          contentContainerStyle={{padding: 20}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                fetchRecentTournaments();
                fetchAvailableTournaments();
              }}
            />
          }>
          <RecentTournaments
            title={t('recent_tournaments')}
            tournaments={recentTournaments}
            goToPage={(page, data) => navigation.navigate(page, data)}
          />
          <AvailableTournaments
            tournaments={availableTournaments}
            onNavigate={(screen, params) => navigation.navigate(screen, params)}
            title="Torneos destacados"
            searchBar={true}
          />
        </ScrollView>
      </SafeAreaView>

      <Loading />
      */}
      <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{top: 'always'}}>
        <View style={{alignItems: 'center', paddingTop: 100}}>
          <Image source={Images.develop} style={styles.imageError} />
          <Text title3 semibold style={{paddingTop: 25}}>
            Próximamente
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

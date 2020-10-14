import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StartGame,
  RecentBattles,
  Header,
  UsersRanking,
  Loading,
  AvailableTournaments,
} from '@components';
import {BaseStyle} from '@config';
import styles from './styles';
import * as Utils from '@utils';
import {checkAuth} from '@repositories/Repository';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {ScrollView, RefreshControl} from 'react-native';
import {AuthActions, ApplicationActions} from '@actions';
import {useDispatch, useSelector} from 'react-redux';

const battlesRepository = RepositoryFactory.get('battles');
const usersRepository = RepositoryFactory.get('users');
const tournamentsRepository = RepositoryFactory.get('tournaments');

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [recentBattles, setRecentBattles] = useState(null);
  const [usersRanking, setUsersRanking] = useState(null);
  const [userTournaments, setUserTournaments] = useState(null);

  const fetchRecentBattles = async () => {
    setRecentBattles(await battlesRepository.getRecent());
  };

  const fetchUsersRanking = async () => {
    const users = await usersRepository.getRanking();
    setUsersRanking(users.splice(0, 3));
  };

  const fetchUserTournaments = async () => {
    setUserTournaments(await tournamentsRepository.getUserTournaments());
  };

  const fetchUserData = async () => {
    const data = await usersRepository.get();
    dispatch(AuthActions.setUserData(data));
  };

  useEffect(() => {
    Utils.getNotificationsPermission();
    const notificationListener = Utils.subscribeNotificationsInApp;
    checkAuth();

    dispatch(ApplicationActions.resetLoading());
    fetchRecentBattles();
    fetchUsersRanking();
    fetchUserData();
    //fetchUserTournaments();

    return () => {
      notificationListener();
    };
  }, []);

  return (
    <>
      <Header title="Battle League" shells={userData.shells} />
      <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{top: 'always'}}>
        <StartGame goToPage={(page, data) => navigation.navigate(page, data)} />
        <ScrollView
          contentContainerStyle={{padding: 20}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                fetchRecentBattles();
                fetchUsersRanking();
                fetchUserData();
                //fetchUserTournaments();
              }}
            />
          }>
          <RecentBattles
            title="Batallas recientes"
            battles={recentBattles}
            goToPage={(page, data) => navigation.navigate(page, data)}
          />
          <UsersRanking users={usersRanking} />

          {/*<AvailableTournaments
            tournaments={userTournaments}
            searchBar={false}
            onPressDetail={tournament =>
              navigation.navigate('TournamentProfile', {data: tournament})
            }
            title="Mis Torneos"
          />*/}
        </ScrollView>
      </SafeAreaView>

      <Loading />
    </>
  );
}

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Image, FlatList} from 'react-native';
import {Text, Icon, Button, TextInput} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@config';
import {useSelector} from 'react-redux';
import {checkAvailabilityToJoinInTournament} from '@utils';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
const tournamentsRepository = RepositoryFactory.get('tournaments');
import {Images} from '@config';

export default function AvailableTournaments({
  tournaments,
  onNavigate,
  searchBar,
  title,
}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [tournamentsFiltered, setTournamentsFiltered] = useState(null);
  const userData = useSelector(state => state.auth.userData);

  const checkHasJoined = tournament => {
    return tournament.users.find(user => user.id === userData.id);
  };

  const calculateSecondsRemaining = tournamentData => {
    const currentDate = new Date().getTime();
    const tournamentDate = new Date(
      `${tournamentData.date} ${tournamentData.time}`,
    ).getTime();
    const milisecondsRemaining = tournamentDate - currentDate;
    return milisecondsRemaining / 1000;
  };

  const checkIsInCurrentPhase = tournamentData => {
    //return tournamentData.phases[0].users.find(user => user.id === userData.id); TODO: UNCOMMENT
    return true;
  };

  const joinTournament = async tournamentId => {
    await tournamentsRepository.join(tournamentId);
    // TODO: UPDATE DATA
  };

  const unjoinTournament = async tournamentId => {
    await tournamentsRepository.unjoin(tournamentId);
    // TODO: UPDATE DATA
  };

  useEffect(() => {
    if (tournaments !== null) {
      const tournamentsToShow = tournaments.filter(tournament =>
        tournament.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
      );
      setTournamentsFiltered(tournamentsToShow);
    }
  }, [searchText, tournaments]);

  return (
    <>
      <Text style={{marginTop: 25, marginBottom: 15}} title3 semibold>
        {title}
      </Text>
      <View>
        {searchBar && (
          <TextInput
            placeholder="Buscar torneo"
            onChangeText={text => setSearchText(text)}
            value={searchText}
            grayStyle
            inputStyle={styles.inputSearch}
            style={{marginBottom: 15}}
          />
        )}
        {tournamentsFiltered ? (
          tournamentsFiltered.length ? (
            <FlatList
              data={tournamentsFiltered}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    onNavigate('TournamentProfile', {data: item});
                  }}>
                  <View style={styles.tournamentItem}>
                    <View style={styles.topItem}>
                      <Image source={{uri: item.image}} style={styles.image} />
                      <View style={styles.mainTournamentItem}>
                        <Text bold body1>
                          {item.name}
                        </Text>
                        <Text grayColor>{item.description}</Text>
                        <View style={styles.bottomMainItem}>
                          <View style={styles.iconWithText}>
                            <Text style={{marginRight: 10}}>
                              {item.users.length > 1 ? (
                                <Text style={{marginRight: 10}}>
                                  + {item.users.length - 1}
                                </Text>
                              ) : (
                                <Text style={{marginRight: 10}}>
                                  {item.users.length}
                                </Text>
                              )}
                            </Text>
                            <Icon color={colors.primary} name="user-friends" size={18} />
                          </View>

                          <View style={styles.iconWithText}>
                            <Text style={{marginRight: 5}}>{item.entryShells}</Text>
                            <Image source={Images.shell} style={styles.shell} />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.bottomItem}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          color={colors.primary}
                          name="fire"
                          size={26}
                          style={{marginRight: 10}}
                        />
                        <Text grayColor body2 semibold>
                          WIN {item.prize}
                        </Text>
                      </View>

                      {calculateSecondsRemaining(item) > 0 ? (
                        checkHasJoined(item) ? (
                          <Button
                            upperFont
                            outline
                            style={{height: 44}}
                            styleText={{fontSize: 14}}
                            onPress={() => {
                              unjoinTournament(item.id);
                            }}>
                            {t('leave')}
                          </Button>
                        ) : (
                          <Button
                            upperFont
                            style={{height: 44}}
                            styleText={{fontSize: 14}}
                            onPress={() => {
                              joinTournament(item.id);
                            }}
                            disabled={
                              !checkAvailabilityToJoinInTournament(item, userData)
                            }>
                            {t('join_tournament')}
                          </Button>
                        )
                      ) : (
                        checkIsInCurrentPhase(item) && (
                          <Button
                            upperFont
                            style={{height: 44}}
                            styleText={{fontSize: 14}}
                            onPress={() => {
                              onNavigate('TournamentHall', {tournamentData: item});
                            }}>
                            {t('go_to_hall')}
                          </Button>
                        )
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No hay torneos</Text>
          )
        ) : (
          <Text>No se ha podido traer la información</Text>
        )}
      </View>
    </>
  );
}

AvailableTournaments.propTypes = {
  tournaments: PropTypes.arrayOf(PropTypes.object),
  onNavigate: PropTypes.func.isRequired,
  searchBar: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

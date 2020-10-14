import React, {useState} from 'react';
import {Images} from '@config';
import {TouchableOpacity, View, ImageBackground, ScrollView} from 'react-native';
import {Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@config';

export default function RecentTournaments({title, tournaments, goToPage}) {
  const {colors} = useTheme();
  return (
    <>
      <Text style={styles.title} title3 semibold>
        {title}
      </Text>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}>
          {tournaments ? (
            tournaments.length ? (
              tournaments.map(tournament => (
                <TouchableOpacity
                  key={tournament.id}
                  onPress={() => {
                    goToPage('TournamentProfile', {data: tournament});
                  }}>
                  <ImageBackground source={{uri: tournament.image}} style={styles.image}>
                    <View style={styles.liveTextContainer}>
                      <Text
                        bold
                        style={[
                          styles.liveText,
                          {
                            backgroundColor: colors.primary,
                          },
                        ]}>
                        Live
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay batallas recientes</Text>
            )
          ) : (
            <Text>No se ha podido traer la información</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}

RecentTournaments.propTypes = {
  title: PropTypes.string,
  tournaments: PropTypes.arrayOf(PropTypes.object),
  goToPage: PropTypes.func.isRequired,
};

import React from 'react';
import {Images} from '@config';
import {TouchableOpacity, View, ImageBackground, ScrollView} from 'react-native';
import {Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@config';

export default function RecentBattles({title, battles, goToPage}) {
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
          {battles ? (
            battles.length ? (
              battles.map(battle => (
                <TouchableOpacity
                  key={battle.id}
                  onPress={() => {
                    goToPage('VideoRecorded', {
                      battle,
                    });
                  }}>
                  <ImageBackground
                    source={{uri: battle.users[0].avatar}}
                    style={styles.image}>
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

RecentBattles.propTypes = {
  title: PropTypes.string,
  battles: PropTypes.arrayOf(PropTypes.object),
  goToPage: PropTypes.func.isRequired,
};

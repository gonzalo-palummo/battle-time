import React, {useState, useEffect} from 'react';
import {Images} from '@config';
import {TouchableOpacity, View, Image} from 'react-native';
import {Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';

export default function UserRanking({users}) {
  return (
    <>
      <Text style={{marginTop: 25, marginBottom: 15}}>
        <Text title3 semibold>
          Battle
        </Text>
        <Text title3>Time </Text>
        <Text title3 semibold>
          Ranking
        </Text>
      </Text>
      <View>
        {users ? (
          users.length ? (
            users.map(user => (
              /*<TouchableOpacity*/
              <View
                key={user.id}
                onPress={() => {
                  //goToPage('Profile', {id: user.id});
                }}>
                <View style={styles.userItem}>
                  <Image source={{uri: user.avatar}} style={styles.avatar} />
                  <View style={styles.mainUserItem}>
                    <Text bold body1>
                      {user.nickname}
                    </Text>
                    <Text grayColor>{user.country.name}</Text>
                  </View>
                  <Text bold headline>
                    {user.points} P.
                  </Text>
                </View>
                {/*</TouchableOpacity>*/}
              </View>
            ))
          ) : (
            <Text>No hay usuarios en el ranking</Text>
          )
        ) : (
          <Text>No se ha podido traer la información</Text>
        )}
      </View>
    </>
  );
}

UserRanking.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  //goToPage: PropTypes.func.isRequired,
};

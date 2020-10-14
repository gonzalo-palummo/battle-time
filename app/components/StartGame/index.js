import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Images, useTheme} from '@config';
import {TouchableOpacity, Image, View} from 'react-native';
import {Text} from '@components';
import styles from './styles';

export default function StartGame({goToPage}) {
  const {colors} = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const handleButtonPressed = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {backgroundColor: colors.primary},
          modalOpen ? {padding: 20} : {padding: 10},
        ]}
        onPress={handleButtonPressed}>
        {modalOpen ? (
          <Image source={Images.timesIcon} style={styles.timesIcon} />
        ) : (
          <Image source={Images.battleIcon} style={styles.battleIcon} />
        )}
      </TouchableOpacity>
      {modalOpen && (
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.gameType}
            onPress={() => goToPage('PreBattle')}>
            <Image source={Images.game} style={{marginBottom: 30}} />
            <Text primaryColor headline semibold>
              Batalla
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gameType}
            onPress={() => {
              goToPage('TrainingConfig');
              setModalOpen(false);
            }}>
            <Image source={Images.game} style={{marginBottom: 30}} />
            <Text primaryColor headline semibold>
              Entrena
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

StartGame.propTypes = {
  goToPage: PropTypes.func.isRequired,
};

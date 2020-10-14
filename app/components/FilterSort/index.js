import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon, Text, Button} from '@components';
import PropTypes from 'prop-types';
import {BaseColor, useTheme} from '@config';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';

export default function FilterSort(props) {
  const {style, openFilter, onSort, sortOptions, sortSelectedValue} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const getCurrentSort = () => {
    return sortOptions.find(option => option.value === sortSelectedValue);
  };

  return (
    <View style={[styles.contain, colors.background, style]}>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          {sortOptions.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.contentActionModalBottom,
                {borderBottomColor: colors.border},
              ]}
              key={item.value}
              onPress={() => {
                onSort(item.value);
                setModalVisible(false);
              }}>
              <Text body2 semibold primaryColor={item.checked}>
                {t(item.text)}
              </Text>
              {item.value === sortSelectedValue && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          <Button
            full
            style={{marginVertical: 10}}
            onPress={() => setModalVisible(false)}>
            {t('close')}
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => setModalVisible(true)}>
        <Icon name={getCurrentSort().icon} size={16} color={BaseColor.grayColor} solid />
        <Text headline grayColor style={{marginLeft: 5}}>
          {t(getCurrentSort().text)}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.line} />
        <TouchableOpacity onPress={openFilter} style={styles.contentFilter}>
          <Icon name="filter" size={16} color={BaseColor.grayColor} solid />
          <Text headline grayColor style={{marginLeft: 5}}>
            {t('filter')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

FilterSort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortOptions: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  openFilter: PropTypes.func.isRequired,
};

FilterSort.defaultProps = {
  style: {},
};

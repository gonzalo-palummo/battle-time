import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Button, Icon} from '@components';
import styles from './styles';
import Modal from 'react-native-modal';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function FormOption(props) {
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState(props.options);
  const [values, setValues] = useState(props.values);
  const {colors} = useTheme();
  const {style, label, multiple, onCancel, onChange} = props;

  useEffect(() => {
    setOptions(
      options.map(item => {
        return {
          ...item,
          checked: values.indexOf(item.value) !== -1,
        };
      }),
    );
  }, []);

  const openModal = () => {
    setModalVisible(true);
    setOptions(
      options.map(item => {
        return {
          ...item,
          checked: values.indexOf(item.value) !== -1,
        };
      }),
    );
  };

  const onSelect = select => {
    setOptions(
      options.map(item => {
        const selected = options.filter(item => item.checked);
        return {
          ...item,
          checked: !multiple
            ? item.value === select.value
            : item.value === select.value
            ? selected.length == 1 && selected[0].value == item.value
              ? item.checked
              : !item.checked
            : item.checked,
        };
      }),
    );
  };

  const onApply = () => {
    const optionsSelected = options.filter(item => item.checked);
    if (optionsSelected.length > 0) {
      const valuesSelected = optionsSelected.map(option => option.value);
      onChange(valuesSelected);
      setValues(valuesSelected);
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setOptions(props.options);
          onCancel();
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          {options.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.contentActionModalBottom,
                {borderBottomColor: colors.border},
              ]}
              key={item.value}
              onPress={() => onSelect(item)}>
              <Text body2 semibold primaryColor={item.checked}>
                {item.text}
              </Text>
              {item.checked && <Icon name="check" size={14} color={colors.primary} />}
            </TouchableOpacity>
          ))}
          <Button
            full
            style={{marginTop: 10, marginBottom: 20}}
            onPress={() => onApply()}>
            {t('apply')}
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.contentForm, {backgroundColor: colors.card}, style]}
        onPress={() => openModal()}>
        <Text caption2 light style={{marginBottom: 5}}>
          {label}
        </Text>
        <Text body1 semibold>
          {values.map((itemSelected, index) => (
            <Text key={index}>
              {index !== 0 ? ', ' : ''}
              {options.filter(option => option.value === itemSelected)[0].text}
            </Text>
          ))}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

FormOption.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

FormOption.defaultProps = {
  style: {},
  label: 'Seat Class',
  multiple: false,
  values: [],
  options: [
    {
      value: 1,
      text: 'Economy Class',
    },
    {
      value: 2,
      text: 'Business Class',
    },
    {
      value: 3,
      text: 'First Class',
    },
    {
      value: 4,
      text: 'Normal Class',
    },
  ],
  onCancel: () => {},
  onChange: () => {},
};

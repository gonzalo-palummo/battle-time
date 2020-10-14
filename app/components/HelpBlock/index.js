import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@config';
import {Text, Icon} from '@components';
import styles from './styles';
export default function HelpBlock(props) {
  const {colors} = useTheme();
  const {style, title, description, onPress, phone, email} = props;
  const makeCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={[styles.content, style]}>
      <Text headline semibold>
        {title}
      </Text>
      <Text body2 grayColor>
        {description}
      </Text>
      <TouchableOpacity
        style={styles.contentBlockCall}
        onPress={onPress}
        activeOpacity={0.9}>
        <Icon name="phone" size={18} color={colors.primary} />
        <View
          style={{
            marginHorizontal: 8,
          }}>
          <TouchableOpacity onPress={() => makeCall(phone)}>
            <Text title3 accentColor>
              {phone}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

HelpBlock.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

HelpBlock.defaultProps = {
  style: {},
  onPress: () => {},
  title: '',
  description: '',
  phone: '',
  email: '',
};

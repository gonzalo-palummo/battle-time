import React from 'react';
import {TextInput, View, I18nManager} from 'react-native';
import PropTypes from 'prop-types';
import {BaseStyle, BaseColor, useTheme} from '@config';

export default function Index(props) {
  const {colors} = useTheme();
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    grayStyle,
    maxLength,
    inputStyle,
  } = props;
  return (
    <View style={[BaseStyle.textInput, style]}>
      <TextInput
        style={[
          {
            fontFamily: 'Raleway',
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            color: grayStyle ? 'black' : BaseColor.whiteColor,
            paddingTop: 5,
            paddingBottom: 5,
            borderColor: grayStyle ? BaseColor.grayColor : BaseColor.whiteColor,
            borderBottomWidth: 1,
          },
          inputStyle,
        ]}
        onChangeText={text => onChangeText(text)}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={
          success
            ? grayStyle
              ? BaseColor.grayColor
              : BaseColor.whiteColor
            : colors.primary
        }
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={multiline ? 12 : undefined}
        maxLength={maxLength}
      />
      {icon}
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  grayStyle: PropTypes.bool,
  maxLength: PropTypes.number,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Index.defaultProps = {
  style: {},
  onChangeText: text => {},
  onFocus: () => {},
  placeholder: '',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  onSubmitEditing: () => {},
  grayStyle: false,
  maxLength: 50,
  inputStyle: {},
};

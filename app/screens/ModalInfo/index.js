import React from 'react';
import {Text, Button, Icon} from '@components';
import {Image, View, Linking, ScrollView} from 'react-native';

import styles from './styles';
import {useTheme} from '@config';

export default function ModalInfo({navigation, route}) {
  const {colors} = useTheme();
  const buttonTop = route.params.buttonTop;
  const buttonBottom = route.params.buttonBottom;
  const icon = route.params.icon;
  const image = route.params.image;
  const message = route.params.message;
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modal}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 40,
          }}>
          {icon && <Icon name={icon} size={130} color={colors.primary} />}
          {image && <Image source={image} style={styles.image} />}
          <Text title1 bold style={{margin: 40, textAlign: 'center'}}>
            {message}
          </Text>

          {buttonTop && (
            <Button
              style={{width: '65%'}}
              onPress={async () => {
                buttonTop.screen && navigation.navigate(buttonTop.screen);
                buttonTop.web && (await Linking.openURL(buttonTop.web));
              }}>
              {buttonTop.text}
            </Button>
          )}

          {buttonBottom && (
            <Button
              style={{width: '65%', marginTop: 20}}
              onPress={async () => {
                buttonBottom.screen && navigation.navigate(buttonBottom.screen);
                buttonBottom.web && (await Linking.openURL(buttonBottom.web));
              }}
              outline>
              {buttonBottom.text}
            </Button>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

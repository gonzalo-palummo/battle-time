import React, {useState} from 'react';
import {View, ActivityIndicator, FlatList, ScrollView, Image} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {SafeAreaView, Text, Button} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Errors({navigation, route}) {
  const errorCode = route.params.errorCode;
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', paddingTop: 100}}>
        {errorCode === 404 ? (
          <>
            <Image source={Images.error404} style={styles.imageError} />
            <Text title3 semibold style={{textAlign: 'center', paddingTop: 25}}>
              {t('connection_error_has_occurred')}
            </Text>
            <Text body1 style={{textAlign: 'center', paddingTop: 15}}>
              {t('try_again')}
            </Text>
          </>
        ) : errorCode === 500 ? (
          <>
            <Image source={Images.error500} style={styles.imageError} />
            <Text title3 semibold style={{textAlign: 'center', paddingTop: 25}}>
              Ha ocurrido un error en los servidores
            </Text>
            <Text body1 style={{textAlign: 'center', paddingTop: 15}}>
              {t('try_again')}
            </Text>
          </>
        ) : errorCode === 401 ? (
          <>
            <Image source={Images.error401} style={styles.imageError} />
            <Text title3 semibold style={{textAlign: 'center', paddingTop: 25}}>
              No tienes permiso a esta sección
            </Text>
          </>
        ) : null}

        <Button
          style={{marginTop: 35, width: '60%'}}
          onPress={() => navigation.goBack()}>
          {t('back')}
        </Button>
      </View>
    </SafeAreaView>
  );
}

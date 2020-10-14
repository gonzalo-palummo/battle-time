import React from 'react';
import {TouchableOpacity, View, SafeAreaView, ScrollView, Linking} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, Text, Icon} from '@components';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from './styles';

export default function Settings({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const hasPassword = useSelector(
    state => !state.auth.userData.googleId && !state.auth.userData.facebookId,
  );
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: '#F4F4F4'}]}
      forceInset={{top: 'always'}}>
      <Header
        title=""
        renderLeft={() => {
          return <Icon name="bars" size={28} />;
        }}
        onPressLeft={() => navigation.openDrawer()}
        blackTheme
      />
      <ScrollView>
        <Text title1 semibold primaryColor style={styles.headerTitle}>
          {t('settings')}
        </Text>
        <View style={styles.items}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('MyAccount')}>
            <View style={[{backgroundColor: colors.primary}, styles.iconContainer]}>
              <Icon name="user-alt" size={22} color="black" />
            </View>
            <Text bold body1 textAlign="center">
              {t('my_account')}
            </Text>
          </TouchableOpacity>

          {hasPassword && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('NewPassword')}>
              <View style={[{backgroundColor: colors.primary}, styles.iconContainer]}>
                <Icon name="lock" size={22} color="black" />
              </View>
              <Text bold body1 textAlign="center">
                {t('password')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.items}>
          <TouchableOpacity
            style={styles.item}
            onPress={async () => await Linking.openURL('https://google.com')}>
            <View style={[{backgroundColor: colors.primary}, styles.iconContainer]}>
              <Icon name="shield-alt" size={22} color="black" />
            </View>
            <Text bold body1 textAlign="center">
              {t('privacy_policy')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={async () => await Linking.openURL('https://google.com')}>
            <View style={[{backgroundColor: colors.primary}, styles.iconContainer]}>
              <Icon name="question" size={22} color="black" />
            </View>
            <Text bold body1 textAlign="center">
              {t('term_of_use')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

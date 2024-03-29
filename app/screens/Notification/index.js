import React, {useState} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, ListThumbCircle} from '@components';
import styles from './styles';

export default function Notification({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [notification] = useState([]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('notification')}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={colors.primary} enableRTL={true} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={notification}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => (
          <ListThumbCircle
            image={item.image}
            txtLeftTitle={item.title}
            txtContent={item.description}
            txtRight={item.date}
            style={{marginBottom: 5}}
          />
        )}
      />
    </SafeAreaView>
  );
}
